<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />
	<link href='https://fonts.googleapis.com/css?family=EB+Garamond:400,500,700%7CRoboto:400,300,500%7CEconomica'
		rel='stylesheet' type='text/css' />
	<?php if($menu == 'home'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/home.css";?>'>
	<?php }else if ($menu == 'about'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/about.css";?>'>
	<?php }else if ($menu == 'craftsmen'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/craftsmen.css";?>'>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/product.css";?>'>
	<?php }else if ($menu == 'product'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/product.css";?>'>
	<?php }else if ($menu == 'contact'){ ?>
		
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/contact.css";?>'>
	<?php } else if ($menu == 'terms_conditions'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/terms_conditions.css";?>'>
	<?php } else if ($menu == 'faq'){ ?>
		<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/faq.css";?>'>
	<?php } ?>
	<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/style.css";?>'>
	<script type="text/javascript" src="<?php echo base_url()."assets/template_2/js/activity.js";?>"></script>
	<title>Goocraft Indonesia</title> 
	<meta name="twitter:title" content="Goocraft Indonesia">
	<meta property="og:title" itemprop="name" content="Goocraft Indonesia">
	<meta itemprop="image" content="<?php echo base_url()."assets/img/goocraft.png"?>">
	<meta name="twitter:image:src" content="<?php echo base_url()."assets/img/goocraft.png"?>">
	<meta property="og:image" itemprop="image" content="<?php echo base_url()."assets/img/goocraft.png"?>">
	<meta property="og:image" itemprop="image" content="<?php echo base_url()."assets/img/goocraft.png"?>">
	<meta name="twitter:card" content="summary_large_image">
	<meta property="og:url" itemprop="url" content="<?php echo base_url(); ?>">
	<meta property="og:type" content="website">
	
	<link rel='stylesheet' type='text/css' href='<?php echo base_url()."assets/template_2/css/flexboxgrid.css";?>'>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
	
	<!-- IKT Animation Platform -->
	<script src='<?php echo base_url()."assets/template_2/js/gsap.min.js"; ?>'></script>
	<script src='<?php echo base_url()."assets/template_2/js/ScrollToPlugin.min.js"; ?>'></script>
	<script src='<?php echo base_url()."assets/template_2/js/SplitText.min.js"; ?>'></script>
	<script src='<?php echo base_url()."assets/template_2/js/iap.js"; ?>'></script>
	
	<script>
		iap_scroll_duration = 0.5;
		iap_scroll_ease = "expo.out";
	</script>
	

	<script type="text/javascript">
		var host_api = "https://api.ikt.co.id/3591";
	</script>
	<script src='https://www.google.com/recaptcha/api.js'></script>
</head>

<body class="color-primer">
	<div class='body style_2494_57'>
		<div class='design_2494b_73' id='design'>
			<header class='lay_598_5  ' id='ins_2494b_293'>
				<div class='lay_2494_295   data_2494b_1061 color-scunder'>
					<div class="row container">
						<div class='lay_2494b_306   data_2494_1083 col-md-6 row'>
							<a class='style_3591_83 data_3591_905 c_2494_17 link text-small-dark' href='<?php echo base_url()."faq"; ?>'>FAQ</a>
							<a class='style_3591_83 data_3591_907 link text-small-dark 'href='<?php echo base_url()."terms-and-conditions"; ?>'>Term &amp;
								Conditions</a>
						</div>
						<div class='lay_598_1   data_2494_1078 col-md-6 end-md row' itemscope
							itemtype='http://schema.org/Thing'>
							<!-- <a class='style_3591_83 data_598_1 link text-small-dark'
								href='https://www.instagram.com/GoocraftIndonesia/' target='_blank'>GoocraftIndonesia</a> -->
							<a class='style_3591_83 data_598_2 link text-small-dark '
								href='tel:+6289-5161-42887'>+6289-5161-42887</a>
							<meta itemprop='name' content='Contact Information' />
						</div>
					</div>
				</div>
				<div class='lay_2494_300   data_2494_1092 row container header-mobile center-xs color-primer'>
					<nav class='lay_598_6   data_2494_1090 col-md-12 row'>
						<a class='style_598_1 data_598_12 link' href='<?php echo base_url(); ?>'>Home</a>
						<a class='style_598_1 data_598_13 c_598_1 link' href='<?php echo base_url()."about"; ?>'>About Us</a>
						<a class='style_598_1 data_598_55 c_598_18 link'   href='<?php echo base_url()."product"; ?>' onclick="product_menu(3)">Product</a>
						<div class='lay_2494_110   data_3591_924 logo color-primer' itemscope itemtype='http://schema.org/Thing'
							style="padding-top:20px;padding-bottom:20px;margin-bottom:-45px;border-bottom-left-radius: 70px;border-bottom-right-radius: 70px; padding-left: 5%;padding-right: 5%;margin-left: -5%;margin-right: -5%;">
							<a style="text-align: -webkit-center;" class='data_2494_340 link logo-to-img' href='<?php echo base_url(); ?>'>
								<img itemprop='image' class='style_2494_109 imag_logo head' src='<?php echo base_url()."assets/img/icon_goocraft.png"?>' alt='Logo' style="width:120px;"/>
								<img itemprop='image' class='style_2494_109 imag_logo' src='<?php echo base_url()."assets/img/font_goocraft.png"?>' alt='Logo' style="height:22px;"/>
							</a>
							<meta itemprop='name' content='Logo' />
						</div>
						
						<a class='style_598_1 data_598_16 c_598_3 link' href='<?php echo base_url()."craftsmen"; ?>'>Craftsmen Activity</a>
						<a class='style_598_1 data_598_19 link' href='<?php echo base_url()."contact-us"; ?>'>Contact Us</a>
						<div class='lay_2494b_296   data_3591_935'>
							<div class='lay_3329_322   data_2494b_857'>
								<div class='empty data_2494b_862'></div>
							</div>
							<div class='data_2494b_863 html'>
								<!-- Menu -->
							</div>
						</div>
					</nav>
					
					<nav class='lay_2494b_295   data_3591_954'>
						<div class='data_2494b_853 html'>

							<a id="nav-toggle" onclick="menu_toggle()">
								<span></span>
							</a>
						</div>
						<div class='lay_2545_266   data_2494b_854'>
							<div class='lay_598_66   data_2494_520'>
								<a class='style_2494b_84 data_598_147 link' href='<?php echo base_url(); ?>'>Home</a>
								<a class='style_2494b_84 data_598_148 c_598_1 link' href='<?php echo base_url()."about"; ?>'>About Us</a>
								<a class='style_2494b_84 data_598_149 c_3591_28 link' href='<?php echo base_url()."product"; ?>' >Product</a>
								<a class='style_2494b_84 data_598_152 c_598_3 link' href='<?php echo base_url()."craftsmen"; ?>'>Craftsmen Activity</a>
								<a class='style_2494b_84 data_598_152 c_598_3 link' href='<?php echo base_url()."faq"; ?>'>FAQ</a>
								<a class='style_2494b_84 data_598_152 c_598_3 link' href='<?php echo base_url()."terms-and-conditions"; ?>'>Term &amp; Conditions</a>
								<a class='style_2494b_84 data_598_154 link' href='<?php echo base_url()."contact-us"; ?>'>Contact Us</a>
							</div>
						</div>
						<div class='data_2494b_855 html'>
							<!-- Menu -->
						</div>
					</nav>
				</div>
				<div class='lay_2494_301   data_2494b_1111'>
					<div class='data_2494_1052 text'></div>
				</div>
			</header>
