var parent_class = "lay_2494b_295 ";
var menu_parent = document.getElementsByClassName(parent_class)[0];
var menu_button = menu_parent.children[0];
var menu_popup = menu_parent.children[menu_parent.children.length - 2];
menu_popup.className += " mobile_menu";
var menu_popup_ori_class = menu_popup.className;
// menu_button.onmousedown = function () {
// 	menu_toggle();
// }

function menu_toggle() {
	if (menu_popup.className.indexOf("opened") >= 0) {
		menu_popup.className = menu_popup_ori_class;
		console.log('test 0');
	} else {
		console.log('test 1');
		menu_popup.className = menu_popup_ori_class + " opened";
	}
}



var parent_class2 = "lay_2494b_296 ";
var menu_parent2 = document.getElementsByClassName(parent_class2)[0];
var menu_button2 = menu_parent2.children[0];
var menu_popup2 = menu_parent2.children[menu_parent2.children.length - 2];
menu_popup2.className += " mobile_menu2";
var menu_popup2_ori_class = menu_popup2.className;
menu_button2.onmousedown = function () {
	menu_toggle2();
}

function menu_toggle2() {
	if (menu_popup2.className.indexOf("opened2") >= 0) {
		alert("ossk");
		menu_popup2.className = menu_popup2_ori_class;
	} else {
		alert("ok");
		menu_popup2.className = menu_popup2_ori_class + " opened2";
	}
}
