<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ContactUsController extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->helper('url');
		$this->load->helper('form');
		
	}
	public function index()
	{
		$params['menu']="contact";
		$this->load->view('template_2/nav/header',$params);
		$this->load->view('template_2/contactus');
		$this->load->view('template_2/nav/footer');
	}
}
