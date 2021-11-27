<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductController extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('CategoryModels');
		$this->load->model('ProductModels');
		$this->load->helper('form');
		
	}
	public function index()
	{	
		$params['menu']="product";
		$params['category']=$this->CategoryModels->getAll();	
		$params['product'] = $this->ProductModels->getProductInnerJoinByIdCategory($params['category'][0]->id) ? $this->ProductModels->getProductInnerJoinByIdCategory($params['category'][0]->id) : [];
		$this->load->view('template_2/nav/header',$params);
		$this->load->view('template_2/product',$params);
		$this->load->view('template_2/nav/footer');
	}

	public function get_product_by_category($id){
		if (!isset($id)) show_404();
		$product = $this->ProductModels->getProductInnerJoinByIdCategory($id);
		echo json_encode($product);
	}

}
