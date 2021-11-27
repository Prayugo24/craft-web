<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CraftsMenController extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('form');
		
	}
	public function index()
	{
		$params['menu']="craftsmen";
		$this->load->view('template_2/nav/header',$params);
		$this->load->view('template_2/craftsmen');
		$this->load->view('template_2/nav/footer');
	}
}
