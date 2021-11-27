<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardController extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('authmodels');
		$this->load->helper('url');
		if(!$this->authmodels->current_user()){
			redirect('super-power');
		}
	}
	public function index()
	{
		$params['active_analytics']='mm-active';
		$this->load->view('admin/nav/header',$params);
		$this->load->view('admin/dashboard');
		$this->load->view('admin/nav/footer');
	}
}
