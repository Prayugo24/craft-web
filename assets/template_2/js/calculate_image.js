//Nama IMAGE yg kita akan detect WIDTH / HEIGHT-nya
var home_about_kotak_target = "img.data_2494b_1060";
//Nama DIV yg kita akan ubah WIDTH / HEIGHT-nya sesuai dgn IMAGE diatas
var home_about_kotak_ikutan = "img.data_3591_927";
//Ini adalah function yg akan di panggil setiap kali ada resize / pada saat pertama kali document ready / pada saat IMAGE sudah terload dgn baik
function home_about_kotak_resize() {
	// console.log('Home About Kotak Resize Calculate');
	//Simple, kita hanya mau ambil WIDTH dan HEIGHT dari TARGET IMAGE
	var target = $(home_about_kotak_target);
	var target_height = target.height();
	var target_width = target.width();
	if (target_height < 100) {
		//Tapi kalau Image belum terload, artinya heightnya dibawah 100, maka kita harus panggil ulang function ini lagi 0.25 detik
		setTimeout(home_about_kotak_resize, 250);
	} else {
		//Kalau sudah terload ( artinya height > 100 ) , maka set kotak kita sesuai dgn height / width dari image
		$(home_about_kotak_ikutan).height(target_height * 0);
		$(home_about_kotak_ikutan).width(target_width);
	}
}
$(document).ready(home_about_kotak_resize);
$(window).resize(home_about_kotak_resize);
