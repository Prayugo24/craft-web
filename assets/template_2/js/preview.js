document.querySelector("#nav-toggle").addEventListener("click", function () {
	this.classList.toggle("active");
	alert("test");
});
//Prepare the necessary Preview Variable
var preview_delay_1 = 6;
var preview_max_1 = 2;
var preview_state_1 = '';
var preview_timeout_1;
var preview_hovered_1 = false;
var link_preview_1 = document.getElementsByClassName('link_preview_1');
var link_container_1 = document.getElementsByClassName('link_container_1');
var link_container_target_1 = document.getElementById('link_container_target_1');
if (link_preview_1 && link_preview_1.length > 0) {
	link_preview_1 = link_preview_1[0];
}
if (link_container_1 && link_container_1.length > 0) {
	link_container_1 = link_container_1[0];
}
//Prepare the listener for our Link Slide Changes
var link_radios_1 = document.getElementsByClassName('slide_1');
for (var i = 0; i < link_radios_1.length; i++) {
	link_radios_1[i].onclick = function () {
		preview_current_1(0);
	};
}
//On mouse Hover, reveal the navigational button (only if it is available)
var navigation_buttons_1 = document.getElementsByClassName('nav_1');
if (link_container_1 && navigation_buttons_1) {
	link_container_1.addEventListener('mouseover', link_over_1);
	link_container_1.addEventListener('mouseout', link_out_1);
}

function link_over_1() {
	for (var i = 0; i < navigation_buttons_1.length; i++) {
		var nav_button = navigation_buttons_1[i];
		nav_button.style.opacity = '1.0';
	}
}

function link_out_1() {
	for (var i = 0; i < navigation_buttons_1.length; i++) {
		var nav_button = navigation_buttons_1[i];
		nav_button.style.opacity = '0.0';
	}
}
//Changes the state of our PREVIEW
function preview_change_state_1(var_name, var_state) {
	var elements = document.getElementsByClassName('preview_' + var_name + '_1');
	var i;
	for (i = 0; i < elements.length; i++) {
		element_classname = elements[i].className;
		if (var_state == 'hide') {
			if (element_classname.indexOf('hidden') == -1) {
				element_classname += ' hidden';
				elements[i].className = element_classname;
			}
		} else {
			if (element_classname.indexOf('hidden') > -1) {
				element_classname = element_classname.replace(' hidden', '');
				elements[i].className = element_classname;
			}
		}
	}
}

function preview_play_1() {
	preview_state_1 = 'play';
	preview_slideshow_1();
	//Disable the Play Button
	preview_change_state_1('play', 'hide');
	//Enable the Pause Button
	preview_change_state_1('pause', 'show');
}

function preview_pause_1() {
	preview_state_1 = 'pause';
	//Disable the Pause Button
	preview_change_state_1('pause', 'hide');
	//Enable the Play Button
	preview_change_state_1('play', 'show');
}

function preview_next_1() {
	preview_move_1(1);
}

function preview_previous_1() {
	preview_move_1(-1);
}
//We can actually jump to anywhere, and these setTimeout is actually our Slideshow Engine :|
function preview_move_1(var_move) {
	var current = preview_current_1(var_move);
	if (slide_1_id.length > 0) {
		element = document.getElementById('slide_1_' + (slide_1_id[current - 1]));
	} else {
		element = document.getElementById('slide_1_' + current);
	}
	element.checked = true;
	if (preview_timeout_1) {
		clearTimeout(preview_timeout_1);
		if (preview_state_1 == 'play') {
			preview_timeout_1 = setTimeout(preview_slideshow_1, preview_delay_1 * 1000);
		}
	}
}
//This handle the Scroll of our Slideshow Link Collection :|
var total_width_1 = 0;
var total_height_1 = 0;
var x_pos_1 = [0];
var y_pos_1 = [0];
var slide_1_id = [];

function preview_current_1(var_move) {
	var_move = var_move || 0;
	var current = 0;
	var total_width = 0;
	var total_height = 0;
	var y_pos = [0];
	var x_pos = [0];
	var parent_width = link_container_1.offsetWidth;
	var parent_height = link_container_1.offsetHeight;
	var parent_middle_width = parent_width / 2;
	var parent_middle_height = parent_height / 2;
	var single_width = 0;
	var single_height = 0;
	var calculate = ('vertical' == 'horizontal' && total_width_1 == 0) || ('vertical' == 'vertical' &&
		total_height_1 == 0);
	//Always Calculate because the img might still loading :|
	calculate = true;
	for (i = 1; i <= preview_max_1; i++) {
		var target_i = i;
		if (slide_1_id.length > 0) {
			//Special ID
			target_i = slide_1_id[i - 1];
		}
		select_element = document.getElementById('slide_1_' + target_i);
		if (select_element.checked) {
			current = i;
		}
		if (calculate) {
			label_element = document.getElementById('label_slide_1_' + target_i);
			var label_element_style = label_element.currentStyle || window.getComputedStyle(label_element);
			single_width = label_element.offsetWidth + parseFloat(label_element_style.marginLeft) + parseFloat(
				label_element_style.marginRight);
			single_height = label_element.offsetHeight + parseFloat(label_element_style.marginTop) + parseFloat(
				label_element_style.marginBottom);
			if ('vertical' == 'horizontal') {
				total_width += single_width;
				//var jump_x = (single_width * i) - (single_width / 2);
				var jump_x = total_width - (single_width / 2);
				if (jump_x > parent_middle_width) {
					x_pos[i] = parent_middle_width - jump_x;
				} else {
					x_pos[i] = 0;
				}
			} else {
				total_height += single_height;
				//var jump_y = (single_height * i) - (single_height / 2);
				var jump_y = total_height - (single_height / 2);
				if (jump_y > parent_middle_height) {
					y_pos[i] = parent_middle_height - jump_y;
				} else {
					y_pos[i] = 0;
				}
			}
		}
	}
	if (calculate) {
		if ('vertical' == 'horizontal') {
			//total_width += single_width;
			total_width_1 = total_width;
			x_pos_1 = x_pos;
		} else {
			//total_height += single_height;
			total_height_1 = total_height;
			y_pos_1 = y_pos;
		}
	}
	current += var_move;
	if (current > preview_max_1) {
		current = 1;
	} else if (current < 1) {
		current = preview_max_1;
	}
	var max_scroll_x = parent_width - total_width_1;
	var max_scroll_y = parent_height - total_height_1;
	if (link_container_target_1 && link_container_target_1.style) {
		if (total_width_1 > 0) {
			if (total_width_1 > parent_width) {
				link_container_target_1.style.width = total_width_1 + 'px';
				if (x_pos_1[current] < 0) {
					if (max_scroll_x < x_pos_1[current]) {
						link_container_target_1.style.marginLeft = x_pos_1[current] + 'px';
					} else {
						link_container_target_1.style.marginLeft = max_scroll_x + 'px';
					}
				} else {
					link_container_target_1.style.marginLeft = '0px';
				}
			}
		} else if (total_height_1 > 0) {
			if (total_height_1 > parent_height) {
				link_container_target_1.style.height = total_height_1 + 'px';
				if (y_pos_1[current] < 0) {
					if (max_scroll_y < y_pos_1[current]) {
						link_container_target_1.style.marginTop = y_pos_1[current] + 'px';
					} else {
						link_container_target_1.style.marginTop = max_scroll_y + 'px';
					}
				} else {
					link_container_target_1.style.marginTop = '0px';
				}
			}
		}
	}
	return current;
}
//Slideshow Engine
function preview_slideshow_1() {
	if (preview_state_1 == 'play') {
		if (preview_hovered_1 == false) {
			preview_move_1(1);
		}
		preview_timeout_1 = setTimeout(preview_slideshow_1, preview_delay_1 * 1000);
	}
}
//These handles the pause slideshow IF we are hovering over with our mouse!
function preview_hover_in_1() {
	preview_hovered_1 = true;
}

function preview_hover_out_1() {
	preview_hovered_1 = false;
}
link_preview_1.onmouseover = preview_hover_in_1;
link_preview_1.onmouseout = preview_hover_out_1;
link_container_1.onmouseover = preview_hover_in_1;
link_container_1.onmouseout = preview_hover_out_1;
//START!
preview_play_1();
//Prepare the necessary Preview Variable
var preview_delay_2 = 5;
var preview_max_2 = 2;
var preview_state_2 = '';
var preview_timeout_2;
var preview_hovered_2 = false;
var link_preview_2 = document.getElementsByClassName('link_preview_2');
var link_container_2 = document.getElementsByClassName('link_container_2');
var link_container_target_2 = document.getElementById('link_container_target_2');
if (link_preview_2 && link_preview_2.length > 0) {
	link_preview_2 = link_preview_2[0];
}
if (link_container_2 && link_container_2.length > 0) {
	link_container_2 = link_container_2[0];
}
//Prepare the listener for our Link Slide Changes
var link_radios_2 = document.getElementsByClassName('slide_2');
for (var i = 0; i < link_radios_2.length; i++) {
	link_radios_2[i].onclick = function () {
		preview_current_2(0);
	};
}
//On mouse Hover, reveal the navigational button (only if it is available)
var navigation_buttons_2 = document.getElementsByClassName('nav_2');
if (link_container_2 && navigation_buttons_2) {
	link_container_2.addEventListener('mouseover', link_over_2);
	link_container_2.addEventListener('mouseout', link_out_2);
}

function link_over_2() {
	for (var i = 0; i < navigation_buttons_2.length; i++) {
		var nav_button = navigation_buttons_2[i];
		nav_button.style.opacity = '1.0';
	}
}

function link_out_2() {
	for (var i = 0; i < navigation_buttons_2.length; i++) {
		var nav_button = navigation_buttons_2[i];
		nav_button.style.opacity = '0.0';
	}
}
//Changes the state of our PREVIEW
function preview_change_state_2(var_name, var_state) {
	var elements = document.getElementsByClassName('preview_' + var_name + '_2');
	var i;
	for (i = 0; i < elements.length; i++) {
		element_classname = elements[i].className;
		if (var_state == 'hide') {
			if (element_classname.indexOf('hidden') == -1) {
				element_classname += ' hidden';
				elements[i].className = element_classname;
			}
		} else {
			if (element_classname.indexOf('hidden') > -1) {
				element_classname = element_classname.replace(' hidden', '');
				elements[i].className = element_classname;
			}
		}
	}
}

function preview_play_2() {
	preview_state_2 = 'play';
	preview_slideshow_2();
	//Disable the Play Button
	preview_change_state_2('play', 'hide');
	//Enable the Pause Button
	preview_change_state_2('pause', 'show');
}

function preview_pause_2() {
	preview_state_2 = 'pause';
	//Disable the Pause Button
	preview_change_state_2('pause', 'hide');
	//Enable the Play Button
	preview_change_state_2('play', 'show');
}

function preview_next_2() {
	preview_move_2(1);
}

function preview_previous_2() {
	preview_move_2(-1);
}
//We can actually jump to anywhere, and these setTimeout is actually our Slideshow Engine :|
function preview_move_2(var_move) {
	var current = preview_current_2(var_move);
	if (slide_2_id.length > 0) {
		element = document.getElementById('slide_2_' + (slide_2_id[current - 1]));
	} else {
		element = document.getElementById('slide_2_' + current);
	}
	element.checked = true;
	if (preview_timeout_2) {
		clearTimeout(preview_timeout_2);
		if (preview_state_2 == 'play') {
			preview_timeout_2 = setTimeout(preview_slideshow_2, preview_delay_2 * 1000);
		}
	}
}
//This handle the Scroll of our Slideshow Link Collection :|
var total_width_2 = 0;
var total_height_2 = 0;
var x_pos_2 = [0];
var y_pos_2 = [0];
var slide_2_id = ['2494_q212', '2494_q209'];

function preview_current_2(var_move) {
	var_move = var_move || 0;
	var current = 0;
	var total_width = 0;
	var total_height = 0;
	var y_pos = [0];
	var x_pos = [0];
	var parent_width = link_container_2.offsetWidth;
	var parent_height = link_container_2.offsetHeight;
	var parent_middle_width = parent_width / 2;
	var parent_middle_height = parent_height / 2;
	var single_width = 0;
	var single_height = 0;
	var calculate = ('horizontal' == 'horizontal' && total_width_2 == 0) || ('horizontal' == 'vertical' &&
		total_height_2 == 0);
	//Always Calculate because the img might still loading :|
	calculate = true;
	for (i = 1; i <= preview_max_2; i++) {
		var target_i = i;
		if (slide_2_id.length > 0) {
			//Special ID
			target_i = slide_2_id[i - 1];
		}
		select_element = document.getElementById('slide_2_' + target_i);
		if (select_element.checked) {
			current = i;
		}
		if (calculate) {
			label_element = document.getElementById('label_slide_2_' + target_i);
			var label_element_style = label_element.currentStyle || window.getComputedStyle(label_element);
			single_width = label_element.offsetWidth + parseFloat(label_element_style.marginLeft) + parseFloat(
				label_element_style.marginRight);
			single_height = label_element.offsetHeight + parseFloat(label_element_style.marginTop) + parseFloat(
				label_element_style.marginBottom);
			if ('horizontal' == 'horizontal') {
				total_width += single_width;
				//var jump_x = (single_width * i) - (single_width / 2);
				var jump_x = total_width - (single_width / 2);
				if (jump_x > parent_middle_width) {
					x_pos[i] = parent_middle_width - jump_x;
				} else {
					x_pos[i] = 0;
				}
			} else {
				total_height += single_height;
				//var jump_y = (single_height * i) - (single_height / 2);
				var jump_y = total_height - (single_height / 2);
				if (jump_y > parent_middle_height) {
					y_pos[i] = parent_middle_height - jump_y;
				} else {
					y_pos[i] = 0;
				}
			}
		}
	}
	if (calculate) {
		if ('horizontal' == 'horizontal') {
			//total_width += single_width;
			total_width_2 = total_width;
			x_pos_2 = x_pos;
		} else {
			//total_height += single_height;
			total_height_2 = total_height;
			y_pos_2 = y_pos;
		}
	}
	current += var_move;
	if (current > preview_max_2) {
		current = 1;
	} else if (current < 1) {
		current = preview_max_2;
	}
	var max_scroll_x = parent_width - total_width_2;
	var max_scroll_y = parent_height - total_height_2;
	if (link_container_target_2 && link_container_target_2.style) {
		if (total_width_2 > 0) {
			if (total_width_2 > parent_width) {
				link_container_target_2.style.width = total_width_2 + 'px';
				if (x_pos_2[current] < 0) {
					if (max_scroll_x < x_pos_2[current]) {
						link_container_target_2.style.marginLeft = x_pos_2[current] + 'px';
					} else {
						link_container_target_2.style.marginLeft = max_scroll_x + 'px';
					}
				} else {
					link_container_target_2.style.marginLeft = '0px';
				}
			}
		} else if (total_height_2 > 0) {
			if (total_height_2 > parent_height) {
				link_container_target_2.style.height = total_height_2 + 'px';
				if (y_pos_2[current] < 0) {
					if (max_scroll_y < y_pos_2[current]) {
						link_container_target_2.style.marginTop = y_pos_2[current] + 'px';
					} else {
						link_container_target_2.style.marginTop = max_scroll_y + 'px';
					}
				} else {
					link_container_target_2.style.marginTop = '0px';
				}
			}
		}
	}
	return current;
}
//Slideshow Engine
function preview_slideshow_2() {
	if (preview_state_2 == 'play') {
		if (preview_hovered_2 == false) {
			preview_move_2(1);
		}
		preview_timeout_2 = setTimeout(preview_slideshow_2, preview_delay_2 * 1000);
	}
}
//These handles the pause slideshow IF we are hovering over with our mouse!
function preview_hover_in_2() {
	preview_hovered_2 = true;
}

function preview_hover_out_2() {
	preview_hovered_2 = false;
}
link_preview_2.onmouseover = preview_hover_in_2;
link_preview_2.onmouseout = preview_hover_out_2;
link_container_2.onmouseover = preview_hover_in_2;
link_container_2.onmouseout = preview_hover_out_2;
//START!
preview_play_2();
