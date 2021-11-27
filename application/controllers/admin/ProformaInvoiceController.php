<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProformaInvoiceController extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->model('AuthModels');
		$this->load->library('pdfgenerator');
		$this->load->library('html2pdf');
		if(!$this->AuthModels->current_user()){
			redirect('super-power');
		}
	}

	public function laporan_pdfs(){
		$data = [
			"heloo"=>"hello"
		];
		$html = $this->load->view('admin/laporan/laporan_pdf',$data,true);
	    // $this->load->view('admin/laporan/laporan_pdf');
	    // $this->pdfgenerator->generate($html,'contoh');

		
	}
	public function laporan_pdfsa(){
		
		$mpdf = new \Mpdf\Mpdf();
		$html = $this->load->view('admin/laporan/laporan_pdf', [], TRUE);
		// $html = $this->output->get_output();
		$mpdf->WriteHTML($html);
		$mpdf->Output();

	}
	public function laporan_pdf(){
		
		$this->load->view('admin/laporan/laporan_pdf');

	}

}
