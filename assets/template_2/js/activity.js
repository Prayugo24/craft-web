var deferred_js = [];
var last_deferred_js = [];
var defer_on_load = false;
var defer_on_activity = false;
var defer_start = false;
var defer_finish = false;

function downloadJSAtOnload() {
	defer_on_load = true;
	//start_defer();
}

function downloadJSAtOnActivity() {
	defer_on_activity = true;
	start_defer();
}

function start_defer() {
	var ua = navigator.userAgent;
	if (defer_on_load && (defer_on_activity || ((/iPad/i.test(ua) || /iPhone OS/i.test(ua)) || "ontouchstart" in
			window || "onmsgesturechange" in window)) && defer_start == false) {
		defer_start = true;
		if (window.removeEventListener) {
			window.removeEventListener("load", downloadJSAtOnload, false);
			window.removeEventListener("mousemove", downloadJSAtOnActivity, false);
			window.removeEventListener("scroll", downloadJSAtOnActivity, false);
		} else if (window.detachEvent) {
			window.detachEvent("onload", downloadJSAtOnload);
			window.detachEvent("onmousemove", downloadJSAtOnActivity);
			window.detachEvent("onscroll", downloadJSAtOnActivity);
		} else {
			window.onload = null;
			window.onmousemove = null;
			window.onscroll = null;
		}
		for (var d = 0; d < deferred_js.length; d++) {
			var element = document.createElement("script");
			element.async = false;
			element.charset = "UTF-8";
			//element.setAttribute("crossorigin","*");
			element.src = deferred_js[d];
			document.body.appendChild(element);
		}
		for (var d = 0; d < last_deferred_js.length; d++) {
			var element = document.createElement("script");
			element.async = false;
			element.charset = "UTF-8";
			//element.setAttribute("crossorigin","*");
			element.src = last_deferred_js[d];
			document.body.appendChild(element);
		}
	}
}
if (window.addEventListener) {
	window.addEventListener("load", downloadJSAtOnload, false);
	window.addEventListener("mousemove", downloadJSAtOnActivity, false);
	window.addEventListener("scroll", downloadJSAtOnActivity, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", downloadJSAtOnload);
	window.attachEvent("onmousemove", downloadJSAtOnActivity);
	window.attachEvent("onscroll", downloadJSAtOnActivity);
} else {
	window.onload = downloadJSAtOnload;
	window.onmousemove = downloadJSAtOnActivity;
	window.onscroll = downloadJSAtOnActivity;
}

//Dropdown Link!
function ikt_dropdown_link(target) {
	var target_selected_value = target.options[target.selectedIndex].value;
	if (target_selected_value.length > 0) {
		window.location = target_selected_value;
	}
}
//We always set the cookie at server level and read it at client level
function ikt_get_cookie(cookie_name) {
	var name = cookie_name + '=';
	var cookie_arr = document.cookie.split(';');
	for (var i = 0; i < cookie_arr.length; i++) {
		var cookie = cookie_arr[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
		if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
	}
	return '';
}
//First used to reset the FBQ Purchase Flag
function ikt_set_cookie(cookie_name, cookie_value, expires) {
	var d = new Date();
	d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
	expires = 'expires=' + d.toUTCString();
	document.cookie = cookie_name + '=' + cookie_value + '; ' + expires + ';domain=.' + host + ';path=/';
}

function ikt_get_query(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return ('');
}
