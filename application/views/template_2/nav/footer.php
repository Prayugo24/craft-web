<footer class='lay_598_13  ' id='ins_2494b_303'>
	<div class='lay_2494_311   data_3591_951 row container' itemscope itemtype='http://schema.org/Thing'>
		<div class='lay_2494_312   data_2494_1117 row col-md-12 left-md col-xs-12 left-xs' itemscope
			itemtype='http://schema.org/Thing'>
			<div class='data_2494_1113 text title-detail-product col-xs-12'>Need More Information ?</div>
			<div class='style_2494_51 data_2494_1114 text text-normal-secondary col-md-9 col-xs-12'>
				<span itemprop='description'>You can contact us here to ask for information about our
					products, just click the button beside and you will be connected to us via
					whatsapp.</span>
			</div>
			<div class='lay_2494_310   data_2494b_1081 col-md-3 col-xs-7' itemscope itemtype='http://schema.org/Thing'>
				<a class='style_598_4 data_2494_1112 link button-ghost' href='https://wa.me/6289516142887'
					target='_blank'>+6289-5161-42887</a>
				<meta itemprop='name' content='Whatsapp Information' />
			</div>
			<meta itemprop='name' content='Home Call To Action' />
		</div>
		<meta itemprop='name' content='Home Call To Action' />
	</div>
	<footer class='lay_3591_333   data_2494_403 color-scunder'>
		<div class='lay_2494b_356   data_3591_949 row container md-center xs-center'>
			<div class='lay_2494b_349   data_3591_916 col-md-6 col-xs-12' itemscope itemtype='http://schema.org/Thing'>
				<div class='style_2494_51 data_2494b_1084 text title-detail-product'>Goocraft Indonesia</div>
				<div class='data_3591_928 text footer-link'>
					<span itemprop='description'> Kab.Pacitan ,Kec. Punung, 63553 Jawa Timur - Indonesia</span>
				</div>
				<meta itemprop='name' content='Contact Information' />
			</div>
			<div class='lay_2494b_357   data_2494b_1102 col-md-3 col-xs-12' itemscope itemtype='http://schema.org/Thing'>
				<div class='data_2494b_1116 text col-md-12 col-xs-12 footer-title'>Opening Hours</div>
				<a class='style_3591_83  link footer-link col xs-12' >Monday – Friday : 10 AM – 9 PM</a><br>
				<a class='style_3591_83  link footer-link col xs-12' >Saturday : 10 AM – 5 PM</a><br>
				<a class='style_3591_83  link footer-link col xs-12' >Sunday : Closed</a><br>
				<meta itemprop='name' content='Contact Information' />
			</div>
			<div class='lay_2494b_357   data_2494b_1102 col-md-3 col-xs-12' itemscope itemtype='http://schema.org/Thing'>
				<div class='data_2494b_1116 text col-md-12 col-xs-12 footer-title'>Contact Us</div>
				<a class='style_3591_83 data_3591_929 link footer-link col xs-12' href='tel:+6289-5161-42887;'>+6289-5161-42887</a>
				<a class='style_3591_83 data_3591_931 link footer-link col xs-12' href='mailto:goocraftindonesia@gmail.com;'>goocraftindonesia@gmail.com</a>
				<!-- <a class='style_3591_83 data_3591_956 link footer-link col xs-12' href='https://www.instagram.com/GoocraftIndonesia/' target='_blank'>GoocraftIndonesia</a> -->
				<meta itemprop='name' content='Contact Information' />
			</div>
			
		</div>
		<div class='lay_2494_202   data_3591_950 row md-center xs-center' itemscope itemtype='http://schema.org/Thing'>
			<div class='style_2494_51 data_2494_657 text footer-copyright col-md-6 col-xs-12'>
				<span itemprop='description'>Copyright © 2021 - Goocraft Indonesia All Rights Reserved</span>
			</div>
			
			<meta itemprop='name' content='Footer Copyright Information' />
		</div>
	</footer>
	<div class='data_3591_957 html'>
		<!-- WhatsHelp.io widget -->

	</div>
</footer>
<div class='overlay' style='z-index:9999;'>
	<div class='popup_warper_centered'>
		<div id='popup_loading' class='popup_window'>
			<div class='lay_2346_45  '>
				<div class='data_2346_126 text'>
					<span class='fcffffff'>
						<span class='facenter'>
							<b>Loading Now</b>
							<br>Please Wait </span>
					</span>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</div>

<script src='<?php echo base_url()."assets/template_2/js/jquery.min.js"; ?>'></script>
<script type='text/javascript'>
	var search_parameter = null;
	console.log(search_parameter);
</script>

<script>
 function product_menu(id_category,name_category){
	console.log(id_category);
	$("#product_categorys").empty();
	var url = "<?php echo base_url()."ProductController/get_product_by_category/"; ?>"+id_category;
 	$.ajax({
 		url: url,
 		type: "GET",
 		dataType: "JSON",
 		success: function(data){
			$('.style_3591_82').removeClass('active');
			$('#products_'+id_category).addClass('active');
			$('#tetle-products').text(name_category);
			var getHtml  = ``;
			
			if(data.length > 0){
				getHtml = `<div class='lay_598_40   col-md-12 col-xs-12'>
					<h2 class='style_2494_51 data_2494b_1135 text title-transition'>`+data[0]['name_category']+`</h2>
				</div>`;
				for(var i=0; i<data.length; i++){
				getHtml +=`
						<div class='lay_598_41   col-md-4 col-xs-6'>
							<div class='lay_2494_308   data_2494b_1121'>
								<a class='data_2494_1108 c_3591_29 link'><img
										itemprop='image' class='style_2494_97'
										src=assets/img/product/`+data[i]['name_image']+`
										alt=`+data[i]['name_product']+` /></a>
							</div>
						</div>`;	
				}
				
				
			}else{
				getHtml = `<div class='lay_598_40   col-md-12 col-xs-12'>
					<h2 class='style_2494_51 data_2494b_1135 text title-transition'>Data Empty</h2>
				</div>`;
			}
			$("#product_categorys").append(getHtml)
 		}
 	});
 }

 function about_menu(menu){
	$('.style_2494b_85').removeClass('active');
	if(menu=='vision'){
		$('#vision').addClass('active');
		$('#header-company').text(`Vision and Mission`)
		$('#header-des-company').text(`Vision and Mission`)
		$('#desc-profil').html(`VISION: To be the best and trustworthy
			Indonesian handicraft supplier worldwide<br><br>MISSION:<br>- To be committed to use the best and natural
			material in order to create unique handicrafts.<br>- To establish networking and give the best service for
			prospective and existing customers in order to maintain good communication and a long lasting business
			relationship.`);
	}else{
		$('#com-profile').addClass('active');
		$('#header-company').text(`Company Profile`)
		$('#header-des-company').text(`Company Profile`)
		$('#desc-profil').html(`Goocraft Indoneisia has been committed to maintain the quality of premium\n
            Indonesian handicraft for export. Our handicrafts focus on storage boxes,\n
            baskets, wall art, and lampshades, made from natural materials such as banana bark, rattan, and seagrass. We empower craftsmen, who\n
            are mostly housewives, from villages Indonesia so that they are able to improve\n
            their life.<br><br>Products quality is what we prioritize as we maintain good relationship with our customers.</div>`)
	}
 }


</script>

<script type='text/javascript' src="<?php echo base_url()."assets/template_2/js/whatsapp.js"; ?>">
</script>
<script type='text/javascript' src="<?php echo base_url()."assets/template_2/js/slide_show.js"; ?>">
</script>
<script type='text/javascript' src="<?php echo base_url()."assets/template_2/js/mobile_menu.js"; ?>">
</script>

<script type='text/javascript' src="<?php echo base_url()."assets/template_2/js/preview.js"; ?>">
</script>



<script>
	function fbq_track_add(item_id, amount) {}

	function fbq_track_purchase(order_id, value, item_ids) {}

	function fbq_track_checkout(target_lvl) {}

	function fbq_track_lead(info) {}

	function fbq_track_complete(info) {}
</script>
<!-- MIDTRANS PLACEHOLDER -->
</body>

</html>
