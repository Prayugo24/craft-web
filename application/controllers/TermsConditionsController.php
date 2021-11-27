<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TermsConditionsController extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('form');
		
	}
	public function index()
	{
		$params['menu']="terms_conditions";
		$this->load->view('template_2/nav/header',$params);
		$this->load->view('template_2/terms_conditions');
		$this->load->view('template_2/nav/footer');
	}
}
