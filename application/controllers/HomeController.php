<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeController extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('categorymodels');
		$this->load->helper('form');
		
	}
	public function index()
	{
		$params['menu']="home";
		$params['category']=$this->categorymodels->getAll();	
		$this->load->view('template_2/nav/header',$params);
		$this->load->view('template_2/home',$params);
		$this->load->view('template_2/nav/footer');
	}
}
