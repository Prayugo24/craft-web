<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvoiceController extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('invoiceModels');
		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->model('authmodels');
		if(!$this->authmodels->current_user()){
			redirect('super-power');
		}
	}
	public function index()
	{
		$params['active_invoice']='mm-active';
		$this->load->view('admin/nav/header',$params);
		$this->load->view('admin/dashboard_invoice',$params);
		$this->load->view('admin/nav/footer');
		$this->load->view('admin/modal/add_modal_invoice');
		$this->load->view('admin/modal/edit_modal_invoice');
	}

	public function add_invoice()
	{
		if ($this->input->method() === 'post') {
			$post = $this->input->post();
			//? Bill To & Ship To
			$params_buyer['name'] = $post['name_receiver'];
			$params_buyer['name_company'] = $post['name_company'];
			$params_buyer['email'] = $post['email'];
			$params_buyer['website'] = $post['website'];
			
			$params_buyer['city'] = $post['city'];
			$params_buyer['zip_code'] = $post['zip_code'];
			$params_buyer['address'] = 	$post['address'];
			
			$Invoice = $this->invoiceModels;
			$validation = $this->form_validation;
			$validation = $validation->set_rules($Invoice->rulesBuyer());

			if ($validation->run()) {
				$id_buyers = $Invoice->saveBuyer($params_buyer);
				//? Ship Information
				$params_ship['id_buyer'] = $id_buyers;
				$params_ship['pre_order'] = $post['pre_order'];
				$params_ship['date'] = $post['pre_order_date'];
				$params_ship['lc_or_credit'] = $post['lc_or_credit'];
				$params_ship['currency'] = $post['currency'];
				$params_ship['payment_terms'] = $post['payment_terms'];
				$params_ship['est_ship_date'] = $post['est_ship_date'];
				$params_ship['mode_of_transport'] = $post['mode_transportation'];
				$params_ship['num_of_package'] = $post['number_package'];
				$params_ship['gross_weight'] = $post['gross_weight'];
				$params_ship['net_weight'] = $post['net_weight'];
				$params_ship['invoice'] = 'INV'.rand();
				$params_ship['status'] = 0;
				$params_ship['carrier'] = '';
				$params_ship['container_total'] = $post['container_tot'];
				$params_ship['reason_for_exp'] = $post['reason_export'];
				$params_ship['port_of_embarkation'] = $post['port_embarkation'];
				$params_ship['country_of_orgn'] = $post['country_origin'];
				$params_ship['port_of_discharge'] = $post['port_discharge'];
				$params_ship['awb_or_bl'] = $post['awb_bl'];
				
				$validation = $this->form_validation;
				$validation = $validation->set_rules($Invoice->rulesShipment());
				if ($validation->run() && !empty($params_ship['id_buyer'])) {
					$id_shipment = $Invoice->saveShipment($params_ship);
					//? Item
					$file_name =  rand();
					$config['upload_path']          = FCPATH.'/assets/img/order';
					$config['allowed_types']        = 'gif|jpg|jpeg|png';
					$config['file_name']            = $file_name;
					$config['overwrite']            = true;
						
					$this->load->library('upload', $config);
					$count_item = $post['count_item'];
					for ($i=0; $i < $count_item; $i++) { 
						if (!$this->upload->do_upload('image_product_'.$i)) {
							$data['error'] = $this->upload->display_errors();
							$this->session->set_flashdata('delete', 'File gagal disimpan cek kembali form inputan Item !!');
							redirect('dashboard-invoice');
						} else {
							$uploaded_data = $this->upload->data();
							$params_order['id_shipment'] = $id_shipment;
							$params_order['id_buyer'] = $id_buyers;
							$params_order['name_or_descrip'] = $post['name_product_'.$i];
							$params_order['image'] = $uploaded_data['file_name'];
							$params_order['date'] = $params_ship['date'];
							$params_order['qty'] = $post['qty_'.$i];
							$params_order['uom'] = 'Unit'; 
							$params_order['price_normal'] = $post['price_normal_'.$i];
							$params_order['price_sell'] = $post['price_sell_'.$i];
							$params_order['price_total'] = $post['price_sell_'.$i]*$post['qty_'.$i];
							$save_order = $Invoice->saveOrder($params_order);
							
						}
					}
					$this->session->set_flashdata('success', 'Berhasil disimpan');
					redirect('dashboard-invoice');
				}else{
					$this->session->set_flashdata('delete', 'File gagal disimpan Id Buyer tidak ditemukan');
					redirect('dashboard-invoice');
				}
				
			}else{
				$this->session->set_flashdata('delete', 'File gagal disimpan cek kembali form inputan Bill To & Ship To !!');
				redirect('dashboard-invoice');

			}			
		}
	}

	public function edit_invoice()
	{

		if ($this->input->method() === 'post') {
			$post = $this->input->post();
			//? Bill To & Ship To
			$params_buyer['id_buyer'] = $post['id_buyer'];
			$params_buyer['name'] = $post['name_receiver'];
			$params_buyer['name_company'] = $post['name_company'];
			$params_buyer['email'] = $post['email'];
			$params_buyer['website'] = $post['website'];
			
			$params_buyer['city'] = $post['city'];
			$params_buyer['zip_code'] = $post['zip_code'];
			$params_buyer['address'] = 	$post['address'];
			$Invoice = $this->invoiceModels;
			$validation = $this->form_validation;
			$validation = $validation->set_rules($Invoice->rulesBuyer());
			if ($validation->run()) {
				$id_product = $Invoice->updateBuyer($params);
			}
		}
		$post = $this->input->post();
		
		$file_name =  rand();
		$config['upload_path']          = FCPATH.'/assets/img/product';
		$config['allowed_types']        = 'gif|jpg|jpeg|png';
		$config['file_name']            = $file_name;
		$config['overwrite']            = true;
		
		$this->load->library('upload', $config);
		$productJoin = $this->invoiceModels->getProductInnerJoinById($post['id_product']);
		$productJoin = json_encode($productJoin[0]);
		$productJoin = json_decode($productJoin,true);
		if (!$this->upload->do_upload('image_product')) {
			$name_image = $productJoin['name_image'];
		}else{
			$path_to_file =FCPATH.'/assets/img/product/';
			unlink($path_to_file.$productJoin['name_image']);
			$uploaded_data = $this->upload->data();
			$name_image = $uploaded_data['file_name'];
		}
		
		$product = $this->invoiceModels;
		$validation = $this->form_validation;
		$validation = $validation->set_rules($product->rules());
		if ($validation->run()) {
			
			$params = [
				'id' => $post['id_product'],
				'id_category' => $post['id_category'],
				'name_product' => $post['name_product'],
				'status' => 1,
				'link' => $post['link'],
				'id_supplier' => $post['id_supplier'],
				'description' => $post['description'],
				'panjang' => $post['panjang'],
				'lebar' => $post['lebar'],
				'tinggi' => $post['tinggi'],
				
			];
			$id_product = $product->update($params);
			
			
			$params_image = [
				'id'=> $productJoin['id_image'],
				'id_product' => $post['id_product'],
				'name_image' => $name_image,
			];
			
			$image = $this->imagemodels;
			$save_image = $image->update($params_image);
			
			$this->session->set_flashdata('success', 'Berhasil disimpan');
			redirect('dashboard-product');
		}else{
			$this->session->set_flashdata('delete', $validation);
			redirect('dashboard-product');
		} 
		
	}

	public function delete_invoice($id=null)
	{
		if (!isset($id)) show_404();
		$path_to_file =FCPATH.'/assets/img/order/';
		$invoiceJoin = $this->invoiceModels->getInvoiceInnerJoinOrderbyBuyer($id);
		$invoiceJoin = json_encode($invoiceJoin[0]);
		$invoiceJoin = json_decode($invoiceJoin,true);
		if (!empty($invoiceJoin)) {
			$order = $this->invoiceModels->getOrderByBuyer($invoiceJoin['id_buyer']);
			foreach ($order as $key => $value) {
				if(unlink($path_to_file.$value->image)) {
					$this->invoiceModels->deleteOrder($value->id_order);
				}
			}
			$this->invoiceModels->deleteBuyer($invoiceJoin['id_buyer']);
			$this->invoiceModels->deleteShipment($invoiceJoin['id_shipment']);
			$this->session->set_flashdata('delete', 'Berhasil Di Hapus');
			redirect('dashboard-invoice');
		}else {
			$this->session->set_flashdata('delete', 'Gagal Di Hapus');
			redirect('dashboard-invoice');
		}
	}


   public function invoice_json(){
    $search = isset($_POST['search']['value']) ? $_POST['search']['value'] : '';
    $limit = isset($_POST['length']) ? $_POST['length'] : 10;
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $order_index = isset($_POST['order'][0]['column']) ? $_POST['order'][0]['column'] : 0;
    $order_field = isset($_POST['columns'][$order_index]['data']) ? $_POST['columns'][$order_index]['data'] : 'id_buyer';
    $order_ascdesc = isset($_POST['order'][0]['dir']) ? $_POST['order'][0]['dir'] : 'desc';
	$params = [
		'search' => $search,
		'limit' => $limit,
		'start' => $start,
		'order_field' => $order_field,
		'order_ascdesc' => $order_ascdesc
	];
	$sql_total = $this->invoiceModels->count_all(); // Panggil fungsi count_all pada SiswaModel
    $sql_data = $this->invoiceModels->getInvoiceInnerJoin($params); // Panggil fungsi filter pada SiswaModel
    $sql_filter = $this->invoiceModels->count_filter(); // Panggil fungsi count_filter pada SiswaModel
    $callback = array(
        'draw'=>$_POST['draw'], // Ini dari datatablenya
        'recordsTotal'=>$sql_total,
        'recordsFiltered'=>$sql_filter,
        'data'=>$sql_data
    );
    header('Content-Type: application/json');
    echo json_encode($callback); // Convert array $callback ke json
  }

	public function get_invoice_by_id($id=null)
	{
		if (!isset($id)) show_404();
		$invoiceJoin = $this->invoiceModels->getInvoiceInnerJoinOrderbyBuyer($id);
		$getOrderByIdBuyer = $this->invoiceModels->getOrderByBuyer($id);
		$invoiceJoin = json_encode($invoiceJoin[0]);
		$result = [
			'Shipment' => json_decode($invoiceJoin,true),
			'ItemOrder' => $getOrderByIdBuyer
		];
		
		echo json_encode($result);
	}
}


