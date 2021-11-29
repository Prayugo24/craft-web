<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvoiceViewController extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->model('InvoiceModels');
		$this->load->helper('url');
		$this->load->model('AuthModels');
		if(!$this->AuthModels->current_user()){
			redirect('super-power');
		}
	}

	
	public function proforma_invoice($id){
		$invoiceJoin = $this->InvoiceModels->getInvoiceInnerJoinOrderbyBuyer($id);
		$getOrderByIdBuyer = $this->InvoiceModels->getOrderByBuyer($id);
		$invoiceJoin = json_encode($invoiceJoin[0]);
		$params = [
			'Shipment' => json_decode($invoiceJoin,true),
			'ItemOrder' => $getOrderByIdBuyer
		];
		$this->load->view('admin/laporan/proforma_invoice',$params);
	}

}
