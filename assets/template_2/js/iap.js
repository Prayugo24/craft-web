/**
 * IKT Animation Platform ( IAP )
 * 
 * @version : 0.1
 * @Author  : Taufik Chowi
 * @Email   : info@ikt.co.id
 */


 /**
  * Load the necessary library which is initted on our iap_src ( iap-config.js )
  */
  var iap_all_loaded = 0;
  $(document).ready( function(){
	  if( typeof iap_src === "object" ){
		  iap_all_loaded = 1 - iap_src.length;
		  $.each( iap_src, function( _i, _val ){
			  $.getScript( _val, iap_loaded );
		  });
	  }else{
		  //Call iap directly!
		  iap_init();
	  }
  });
  
  function iap_loaded( _data, _text_status, _jqxhr ){
	  if( ++iap_all_loaded > 0 ){
		  //Execute all module
		  iap_init();
	  }
  }
  
  /**
   * iap_init is called by iap_loaded, after all iap_src has been loaded
   * It will first check
   */
  function iap_init(){
	  if( typeof iap_custom_init_start === "function" ){
		  iap_custom_init_start();
	  }
	  iap_init_utility();
	  iap_init_scroll();
	  iap_init_animation();
	  if( typeof iap_custom_init_end === "function" ){
		  iap_custom_init_end();
	  }
  }
  
  /**
   * Search for every single element that contains data-iap-utility
   * This is the place where we enable IAP-Utility [ Background, Gradient, Scroll ]
   * eg : 
   * <TARGET data-iap-utility="background,gradient,scroll"></TARGET>
   * 
   * - IAP Background Utility :
   *  It will remove the first IMG it found and then take the src and apply it to the TARGET
   *  data-iap-background=["first-image"] ( We only have 1 type for now, so ignore this )
   * 
   * - IAP Gradient Utility :
   *  It will add a gradient style be it horizontal or vertical
   *  data-iap-gradient=[ "linear", "radial", "conic", "repeating-linear", "repeating-radial", "repeating-conic" ]
   *  data-iap-gradient-color="All kind of setup"
   * 
   * - IAP Scroll Utility :
   *  It will 
   */
  function iap_init_utility(){
	  var utilities = $("[data-iap-utility]");
	  $.each( utilities, function( _i, _target_util ){
		  var target_util = $( _target_util );
		  var target_util_arr = target_util.data( "iapUtility" ).split(",");
		  $.each( target_util_arr, function( _j, _single_util ){
			  if( _single_util == "background" ){
				  //20200424 :: Perform a simple Background generation from our FIRST IMG Child :|
				  var target_img = target_util.find("img")[0];
				  var target_img_src = $(target_img).attr("src");
				  target_util.css( "background-image", "url('" + target_img_src + "')" );
				  target_img.remove();
			  }else if( _single_util == "gradient" ){
				  //20200424 :: Perform a quick gradient generation
				  var target_gradient_type = target_util.data( "iapGradient" );
				  var target_gradient_color = target_util.data( "iapGradientColor" );
				  var target_gradient = $("<div class='iap_gradient'></div>");
				  target_util.prepend( target_gradient );
				  target_gradient.css( "display", "block" );
				  target_gradient.css( "position", "absolute" );
				  target_gradient.css( "top", "0px" );
				  target_gradient.css( "left", "0px" );
				  target_gradient.css( "height", "100%" );
				  target_gradient.css( "width", "100%" );
				  target_gradient.css( "background-image", target_gradient_type + "-gradient(" + target_gradient_color + ")" );
				  target_gradient.css( "background-image", "-webkit-" + target_gradient_type + "-gradient(" + target_gradient_color + ")" );
				  target_gradient.css( "background-image", "-moz-" + target_gradient_type + "-gradient(" + target_gradient_color + ")" );
				  target_gradient.css( "background-image", "-o-" + target_gradient_type + "-gradient(" + target_gradient_color + ")" );
				  target_gradient.css( "background-image", "-ms-" + target_gradient_type + "-gradient(" + target_gradient_color + ")" );
			  }else if( _single_util == "scroll" ){
				  //20200426 :: Save the scroll data into iap_scroll_target, in which we will save to our iap_scroll_target and later iap_init_scroll_target() them 
				  var target_scroll_label = target_util.data( "iapScrollLabel" );
				  var target_scroll_offset = target_util.data( "iapScrollOffset" );
				  var target_scroll_duration = target_util.data( "iapScrollDuration" );
				  var target_scroll_ease = target_util.data( "iapScrollEase" );
				  if( typeof target_scroll_label == "undefined" ){
					  target_scroll_label = "";
				  }
				  target_scroll_label = target_scroll_label.toLowerCase();
				  if( typeof target_scroll_duration == "undefined" ){
					  target_scroll_duration = iap_scroll_duration;
				  }
				  if( typeof target_scroll_ease == "undefined" ){
					  target_scroll_ease = iap_scroll_ease;
				  }
				  var target_scroll = {
					  target: target_util,
					  label: target_scroll_label,
					  offset: target_scroll_offset,
					  top: 0,
					  bottom: 0,
					  duration: target_scroll_duration,
					  ease: target_scroll_ease
				  };
				  iap_scroll_target.push( target_scroll );
			  }else if( _single_util == "split" ){
				  var target_split = target_util.data( "iapSplit" );
				  var target_split_target = target_util.data( "iapSplitTarget" );
				  var target_split_position = target_util.data( "iapSplitPosition" );
				  var target_split_lines_class = target_util.data( "iapSplitLinesClass" );
				  var target_split_words_class = target_util.data( "iapSplitWordsClass" );
				  var target_split_chars_class = target_util.data( "iapSplitCharsClass" );
  
				  var target_split_config = {
					  type: target_split,
					  position: typeof target_split_position != "undefined" ? target_split_position : "relative",
					  linesClass: typeof target_split_lines_class != "undefined" ? target_split_lines_class : "lines lines++",
					  wordsClass: typeof target_split_words_class != "undefined" ? target_split_words_class : "words words++",
					  charsClass: typeof target_split_chars_class != "undefined" ? target_split_chars_class : "chars chars++"
				  };
  
				  if( target_split_target == "" || typeof target_split_target == "undefined" ){
					  //Target Self!
					  target_split_element = target_util;
				  }else{
					  target_split_element = target_util.find( target_split_target );
				  }
				  $( target_split_element ).addClass( "splitted" );
				  var target_split_object = new SplitText( target_split_element, target_split_config );
				  //iap_scroll_target.push( target_scroll );
			  }
		  });
	  });
	  console.log( iap_scroll_target );
  }
  
  
  /**
   * Scroll Related functions goes here
   */
  
   //Prepare all of the necessary iap_scroll variables
  var iap_scroll_target = [];
  var iap_scroll_index = 0;
  var iap_next_index = 0;
  var iap_scrolling = false;
  var iap_current_scroll = 0;
  var iap_viewport_height = 0;
  
  //iap_init_scroll will be performed only ONCE, we will create the event listener :)
  //Only do this if iap_scroll_target.length > 0
  function iap_init_scroll(){
	  //Setable Variables
	  if( typeof iap_scroll_duration == "undefined" ){
		  iap_scroll_duration = 0.5;
	  }
	  if( typeof iap_scroll_ease == "undefined" ){
		  iap_scroll_ease = "expo.out";
	  }
  
	  //We will always need to have our iap_scroll_listener ( because our iap_animation also used it )
	  window.addEventListener('scroll', iap_scroll_listener);
	  if( iap_scroll_target.length > 0 ){
		  window.onhashchange = iap_hash_listener;
		  
		  
	  }
	  //Do this so that without data-iap-utility-scroll = we can still calculate the iap_viewport_height;
	  //Every 5 Second Trigger This , BUT execute it at least once first!
	  iap_init_scroll_target();
	  setInterval( iap_init_scroll_target, 5000 );
  }
  //iap_init_scroll_target can be performed multiple times, perhaps everytime a window changes is made?
  //Also refreshed the iap_viewport_height , this is important for our next or previous
  var iap_scroll_initted = false;
  function iap_init_scroll_target(){
	  iap_viewport_height = $(window).height();
	  var current_scroll = 0;
	  if( iap_scroll_initted == false ){
		  current_scroll = $(window).scrollTop();
	  }
	  $.each( iap_scroll_target, function( _i, _single_scroll ){
		  let offset = $( _single_scroll.target ).offset();
		  _single_scroll.top = offset.top;
		  _single_scroll.bottom = _single_scroll.top + $( _single_scroll.target ).height();
		  if( iap_scroll_initted == false && current_scroll >= _single_scroll.top ){
			  iap_scroll_index = _i;
		  }
	  });
	  iap_scroll_initted = true;
	  iap_scroll_target.sort( compare_top );
  
	  //Trigger our listener ONCE, as if we have scrolled at least once ( to activate every animation )
	  iap_scroll_listener();
  }
  //Special for our iap_init_scroll to properly sort our iap_scroll_target based on Property start
  function compare_top( a, b ){
	  const top_a = parseInt( a.top );
	  const top_b = parseInt( b.top );
	  if ( top_a > top_b ){
		  return 1;
	  }else if( top_a < top_b ){
		  return -1;
	  }else{
		  return 0;
	  }
  }
  //iap_hash_listener is used to detect HASH Changes, it is used primarily right now for scroll jump
  function iap_hash_listener(){
	  var target_hash = location.hash.toLowerCase();
	  if( target_hash != "#" ){
		  $.each( iap_scroll_target, function ( _i, _single_scroll ){
			  if( "#" + _single_scroll["label"] == target_hash ){
				  //Found the Hash, move to it 
				  iap_next_index = _i;
				  iap_scroll_now();
			  }
		  });
	  }
  }
  //iap_scroll_listener is the one that will govern the scrolling engine
  function iap_scroll_listener(){
	  var current_scroll = $(window).scrollTop();
  
	  //Scrolling Engine Engaged!
	  var check_scroll_target_index = iap_get_scroll_index( current_scroll, iap_scroll_target, "top", "bottom", "offset" );
	  if( check_scroll_target_index >= 0 ){
		  iap_next_index = check_scroll_target_index;
	  }
	  if( iap_next_index != iap_scroll_index && iap_scrolling == false ){
		  iap_delayed( iap_scroll_now, 100, "scroll" );
	  }
	  iap_current_scroll = current_scroll;
  }
  
  //This function is used by iap_scroll_listener to find proper index on iap_scroll_target and iap_timeslines
  function iap_get_scroll_index ( _current_scroll, _target_array, _top_property, _bottom_property, _offset_property ){
	  var scrolling_down = true;
	  if( _current_scroll < iap_current_scroll ) {
		  scrolling_down = false;
	  }
	  var current_index = -1;
	  var current_scroll_max = _current_scroll + iap_viewport_height;
	  $.each( _target_array, function( _i, _target ){
		  var target_top = _target[ _top_property ];
		  var target_bottom = _target[ _bottom_property ];
		  var target_offset = _target[ _offset_property ];
		  var target_min = target_top + target_offset;
		  var target_max = target_bottom - target_offset;
		  if( scrolling_down ){
			  if( _current_scroll < target_min && target_min < current_scroll_max ){
				  //Dont break after finding, we must find lowest last index!
				  current_index = _i;
			  }
		  }else{
			  if( _current_scroll < target_max && target_max < current_scroll_max ){
				  //Do break after finding, We will try to scroll to lowest index first found!
				  current_index = _i;
				  return false;
			  }
		  }
	  });
	  return current_index;
  }
  //This function is DELAYED
  function iap_scroll_now(){
	  console.log( "TRIGGER IAP SCROLL NOW" );
	  iap_scrolling = true;
	  iap_scroll_index = iap_next_index;
	  //20200723 :: DO NOT PUT autoKill:true , this caused our akrgallerywest stop scrolling T.T
	  gsap.to(window, {
		  duration: iap_scroll_target[ iap_scroll_index ][ "duration" ], 
		  scrollTo:{ y:iap_scroll_target[ iap_scroll_index ][ "top" ], autoKill:true, onAutoKill: iap_scrolling_stopped },
		  onComplete: iap_scrolling_stopped,
		  ease: iap_scroll_target[ iap_scroll_index ][ "ease" ]
	  });
  }
  function iap_scrolling_stopped() {
	  console.log( "IAP SCROLL STOPPED" );
	  iap_scrolling = false;
  }
  
  
  
  /**
   * IAP Animation Engine
   */
  var iap_timelines = {};
  var iap_timeline_id = 1; // This will automatically be increased by 1 for every data-iap-in-target
  var iap_animations = [];
  var iap_timeline_config;
  function iap_init_animation(){
	  //Default iap_timeline_config check
	  if( typeof iap_timeline_config == "undefined" ){
		  iap_timeline_config = {
			  repeat: 0, repeatRefresh: true, paused:true
		  };
	  }
  
	  //Init IAP Animation default
	  iap_init_default_animation();
  
	  //Init Default Animation
	  var animations = $("[data-iap-in]");
	  $.each( animations, function( _i, _target_element ){
		  var target_element = $( _target_element );
		  
		  var single_animation_target = iap_get_data_array( target_element, "iapInTarget" );
		  var single_animation_effect = iap_get_data_array( target_element, "iapIn" );
		  var single_animation_position = iap_get_data_array( target_element, "iapInPosition" );
		  var single_animation_timeline = iap_get_data_array( target_element, "iapInTimeline" );
		  var single_animation_timeline_offset_top = iap_get_data_array( target_element, "iapInTimelineOffsetTop" );
		  var single_animation_timeline_offset_bottom = iap_get_data_array( target_element, "iapInTimelineOffsetBottom" );
		  var single_animation_timeline_toggle = iap_get_data_array( target_element, "iapInTimelineToggle" );
		  var single_animation_timeline_toggle_target = iap_get_data_array( target_element, "iapInTimelineToggleTarget" );
		  var single_animation_all_data = target_element.data();
		  var single_animation_array = [];
  
  
		  //Prepare Base Variable, also find the highest TOP and lowest BOTTOM offset!
		  var empty_tl_id = "default-" + iap_timeline_id++;
		  $.each( single_animation_target, function( _j, _var_val ){
			  var single_animation = {
				  target: _var_val.trim(),
				  effect: iap_get_array_value( single_animation_effect, _j ),
				  config: {},
				  position: iap_get_array_value( single_animation_position, _j ),
				  timeline: iap_get_array_value( single_animation_timeline, _j ),
				  timelineConfig: { originalProgress: single_animation_effect == "moveTo" ? 0 : 1 },
				  offset_top: Number(iap_get_array_value( single_animation_timeline_offset_top, _j )),
				  offset_bottom: Number(iap_get_array_value( single_animation_timeline_offset_bottom, _j )),
				  toggle: iap_get_array_value( single_animation_timeline_toggle, _j ),
				  toggle_target: iap_get_array_value( single_animation_timeline_toggle_target, _j ),
				  top: 0,
				  bottom: 0,
				  left: 0,
				  right: 0,
				  offset: 0,
				  real_target: null
			  };
  
			  //Get Real Target
			  var target_animation;
			  if( single_animation["target"] == "" ){
				  //Target Self!
				  target_animation = target_element;
			  }else{
				  target_animation = target_element.find( single_animation['target'] );
			  }
			  single_animation["real_target"] = target_animation;
  
			  //Get Our Highest TOP and Lowest BOTTOM
			  var top_smallest = 999999;
			  var left_smallest = 999999;
			  var bottom_biggest = 0;
			  var right_biggest = 0;
			  $.each( target_animation, function( _k, _check_target){
				  var check_offset = $( _check_target ).offset();
				  var check_top = check_offset.top;
				  var check_bottom = $( _check_target ).outerHeight( true ) + check_top;
				  var check_left = check_offset.left;
				  var check_right = $( _check_target ).outerWidth( true ) + check_left;
				  top_smallest = ( top_smallest > check_top ) ? check_top : top_smallest;
				  bottom_biggest = ( bottom_biggest < check_bottom ) ? check_bottom : bottom_biggest;
				  left_smallest = ( left_smallest > check_left ) ? check_left : left_smallest;
				  right_biggest = ( right_biggest < check_right ) ? check_right : right_biggest;
			  });
			  single_animation[ "top" ] = top_smallest + single_animation[ "offset_top" ];
			  single_animation[ "bottom" ] = bottom_biggest + single_animation[ "offset_bottom" ];
			  single_animation[ "left" ] = left_smallest;
			  single_animation[ "right" ] = right_biggest;
  
			  //Get Real Timeline
			  if( single_animation["timeline"] == "" ){
				  single_animation["timeline"] = empty_tl_id;
			  }
			  if( typeof iap_timelines[ single_animation["timeline"] ] == "undefined" ){
				  //Create new Timeline and store it here!
				  //We use Target to determine the opacity of TARGET_ELEMENT where the data-iap reside!
				  var single_timeline = {
					  top: single_animation.top,
					  bottom: single_animation.bottom,
					  left: single_animation.left,
					  right: single_animation.right,
					  timeline: "",
					  condition: "",
					  target: target_element,
					  toggle: single_animation.toggle != "" ? single_animation.toggle : "opacity",
					  toggle_target: single_animation.toggle_target  != "" ? single_animation.toggle_target : "0.1",
					  config: {  }
				  }
				  iap_timelines[ single_animation.timeline ] = single_timeline;
			  }else{
				  //Get the timeline and check if the top can be smaller and the bottom can be bigger :|
				  var single_timeline = iap_timelines[ single_animation.timeline ];
				  single_timeline.top = ( single_timeline.top >= single_animation.top ) ? single_animation.top : single_timeline.top;
				  single_timeline.left = ( single_timeline.left >= single_animation.left ) ? single_animation.left : single_timeline.left;
				  single_timeline.bottom = ( single_timeline.bottom <= single_animation.bottom ) ? single_animation.bottom : single_timeline.bottom;
				  single_timeline.right = ( single_timeline.right <= single_animation.right ) ? single_animation.right : single_timeline.right;
			  }
			  single_animation_array.push( single_animation);
		  });
  
		  //Coba misalnya kita melakukan satu saja perubahan .... apa yg terjadi?
		  //Populate Configs and TimelineConfigs
		  $.each( single_animation_all_data, function( _var_name, _var_val ){
			  var _target_array_name = "";
			  var _target_var_name = "";
			  if( _var_name.indexOf("iapInConfig") >= 0 ){
				  _target_var_name = "iapInConfig";
				  _target_array_name = "config";
			  }else if( _var_name.indexOf( "iapInTimelineConfig" ) >= 0 ){
				  _target_var_name = "iapInTimelineConfig";
				  _target_array_name = "timelineConfig";
			  }
  
			  if( _target_var_name != "" ){
				  var single_config = lcfirst( _var_name.replace( _target_var_name, "" ) );
				  _var_val += " ";
				  var single_config_arr = _var_val.split(";");
				  $.each( single_animation_array, function( _j, target_animation_array ){
					  var single_config_index = _j;
					  if( single_config_index >= single_config_arr.length ){
						  single_config_index = single_config_arr.length - 1;
					  }
					  target_animation_array[ _target_array_name ][ single_config ] = single_config_arr[ single_config_index ].trim();
				  });
			  }
		  });
  
		  //Update our iap_timelines.config and also init our timeline
		  $.each( single_animation_array, function( _j, target_animation_array ){
			  //Update our timelineConfig on iap_timelines
			  var target_timeline_config = target_animation_array[ "timelineConfig" ];
			  //Set the default if it does not exists
			  $.each( iap_timeline_config, function( _var_name, _var_val ){
				  if( typeof target_timeline_config[_var_name] == "undefined" || target_timeline_config[_var_name] == "" ){
					  target_timeline_config[_var_name] = _var_val;
				  }
			  });
			  //CREATE the timeline ONLY ONCE OKAY!!!!
			  if( iap_timelines[ target_animation_array.timeline ].timeline == "" ){
				  iap_timelines[ target_animation_array.timeline ].config = target_timeline_config;
				  iap_timelines[ target_animation_array.timeline ].timeline = gsap.timeline( target_timeline_config );
			  }
		  });
  
  
		  iap_animations.push( single_animation_array );
  
		  //Apply Animation Engine
		  $.each( single_animation_array, function( _j, _single_animation){
			  var target_animation = _single_animation[ "real_target" ];
			  var target_config = _single_animation["config"];
			  var target_effect = _single_animation["effect"];
			  var target_timeline = iap_timelines[ _single_animation["timeline"] ];
			  var target_position = target_config["position"];
			  target_timeline.timeline.add( gsap.effects[ target_effect ]( target_animation, target_config ), target_position );
		  })
	  });
  
	  //Set our iap_animation_toggler which is triggered every 0.5 second ( Debug to 5 seconds )
	  setInterval( iap_animation_toggler, 500 );
  }
  //This function will check IF the timeline is viewable or not ( even slightly viewable counts )
  function iap_animation_toggler(){
	  var current_min = iap_current_scroll;
	  var current_max = iap_current_scroll + iap_viewport_height;
	  $.each( iap_timelines, function( _timeline_name, _single_timeline ){
		  var target_top = _single_timeline.top;
		  var target_bottom = _single_timeline.bottom;
		  var target_timeline = _single_timeline.timeline;
		  var is_within = false;
		  if( ( current_min < target_top && target_top < current_max ) ||
			  ( current_min < target_bottom && target_bottom < current_max ) ||
			  ( target_top < current_min && current_min < target_bottom ) ){
				  is_within = true;
		  }
  
		  //Additional Toggle if our object is_within == true
		  if( is_within ){
			  var toggle = _single_timeline.toggle;
			  var toggle_target = _single_timeline.toggle_target;
			  if( toggle == "opacity" ){
				  var opacity = 1;
				  if( _single_timeline.target != "" ){
				  $( _single_timeline.target ).parents().addBack()
					  .each(function(){ opacity *= $(this).css('opacity') || 1 });
					  if( opacity <= toggle_target ){
						  is_within = false;
					  }
				  }
			  }
		  }
		  
		  $condition = "";
		  if( is_within && _single_timeline.condition != "playing" ){
			  //Start playing normally
			  if( _single_timeline.config.originalProgress == 0 ){
				  //target_timeline.invalidate();
			  }
			  
			  _single_timeline.condition = "playing";
			  target_timeline.play( 0 );
			  condition = "play";
		  }else if( is_within == false && _single_timeline.condition != "reversing" ){
			  //Animation move to last?
			  if( _single_timeline.config.originalProgress == 1 ){
				  //target_timeline.invalidate();
			  }
			  _single_timeline.condition = "reversing";
			  target_timeline.reverse();
			  condition = "reverse";
		  }
	  })
  }
  //Get data attribute and split it , if there is nothing or undefined, simply returned array of 1 empty string
  function iap_get_data_array( _element, _data_name, _splitter = ";" ){
	  var returned_array = _element.data( _data_name );
	  if( typeof returned_array == "undefined" ){
		  returned_array = [""];
	  }else{
		  returned_array = String( returned_array );
		  returned_array = returned_array.split( _splitter );
	  }
	  return returned_array;
  }
  //Get array on the given index, if the given index is too large give the last element, TRIMMED!
  function iap_get_array_value( _array, _index ){
	  if( _index >= _array.length ){
		  _index = _array.length - 1;
	  }
	  return _array[ _index ].trim();
  }
  
  
  
  
  /**
   * All Other Utility Method Goes Here
   */
  
  //Properly Delayed a function call, we can call this multiple time, but it will only executed ONCE!
  var iap_timeout_handle = {};
  function iap_delayed( _function, _time, _handler ){
	  if( typeof iap_timeout_handle[ _handler ] !== "undefined" ){
		  clearTimeout( iap_timeout_handle[ _handler ] );
	  }
	  iap_timeout_handle[ _handler ] = setTimeout( _function, _time );
  }
  
  //LCFirst, for our config
  function lcfirst( _target ){
	  return _target.charAt(0).toLowerCase() + _target.slice(1);
  }
  
  
  
  /**************************************************************************************************
   * All IAP Animation Default
   * We will have few defaults that will be used extensively and can always be overriden
   * All Animation module will always return a a timeline , which by default is paused 
   * By default all must have _config, _duration, _
   **************************************************************************************************/
  
  function iap_init_default_animation(){
	  //We need at least 1 default animation, which can be easily overridden
	  //Config END is the progress position where we are allowed to invalidate! :)
	  if( typeof gsap.effects["moveFrom"] === "undefined" ){
		  //transitionTimingFunction step-start is required to override all of our transition 
		  gsap.registerEffect({
			  name: "moveFrom",
			  defaults: { 
				  duration:1, 
				  opacity:0,
				  x:"random(-100,100,1)", 
				  y:"random(-100,100,1)",
				  stagger:0.25,
				  ease: "expo",
				  transitionTimingFunction: "step-start"
			  },
			  effect: ( targets, config ) => {
				  return gsap.from( targets, config );
			  }
		  })
	  }
	  if( typeof gsap.effects["moveTo"] === "undefined" ){
		  gsap.registerEffect({
			  name: "moveTo",
			  defaults: { 
				  duration:1,
				  stagger:0.25,
				  ease: "expo"
			  },
			  effect: ( targets, config ) => {
				  return gsap.to( targets, config );
			  }
		  })
	  }
  }
  
  
  
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // var myFunct = debounce( function(){ } , 250 );
  // myFunct(); or onScroll( myFunct )
  function debounce(func, wait, immediate) {
	  var timeout;
	  return function() {
		  var context = this, args = arguments;
		  var later = function() {
			  timeout = null;
			  if (!immediate) func.apply(context, args);
		  };
		  var callNow = immediate && !timeout;
		  clearTimeout(timeout);
		  timeout = setTimeout(later, wait);
		  if (callNow) func.apply(context, args);
	  };
  };
