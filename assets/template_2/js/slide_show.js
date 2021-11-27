var okb_slideshow_preview = ".lay_598_14";
var okb_slideshow = ".lay_598_15";

function okb_slideshow_resize() {
	// console.log('Slideshow Resize Calculate');
	var target_slideshow_preview = $(okb_slideshow_preview);
	var target_slideshow_preview_height = target_slideshow_preview.height();
	if (target_slideshow_preview_height < 100) {
		setTimeout(okb_slideshow_resize, 250);
	} else {
		$(okb_slideshow).height(target_slideshow_preview_height);
		$(okb_slideshow + " > div.no_global_anim").height(target_slideshow_preview_height);
	}
}
$(document).ready(okb_slideshow_resize);
$(window).resize(okb_slideshow_resize);
