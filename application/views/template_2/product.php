<div class='lay_2494_324  ' id='ins_2494_326'
	style="background-image: url('<?php echo base_url()."assets/template_2/img/head_background.jpeg"?>');background-attachment: fixed;background-size:cover; background-blend-mode: multiply;">
	<div class='lay_2494_331   data_2494_1010'>
		<h1 class='data_2494_1161 text title-larger-white' id="tetle-products"><?php echo $category[0]->name_category ?></h1>
		<div class='lay_2494_258   data_2494_1160'>
			<a class='style_2494b_86 data_2494_897 link' href='<?php echo base_url() ?>'>Home /</a>
			<div class='lay_2327_85   data_2494_898'>
				<a class='active style_2494b_86 c_3591_28'
					href='#' rel='tag'>
					<span>Product</span>
				</a>
			</div>
		</div>
	</div>
</div>
<div class='lay_2494b_362   row container adjust-position-row ' id='ins_598_36'>
	<div class='lay_598_33   data_2494b_1119 col-md-3 col-xs-12'>
		<div class='lay_2494_333  '>
			<div class='data_2494b_1134 text title-transition '>Category</div>
		</div>
		
		<?php foreach($category as $key => $value): ?>
		<div class='lay_3591_334 col-md-12 col-xs-12'>
			<?php if($key < 1){ ?>
			<a class='active style_3591_82 data_3591_952 c_3591_29 link' id="<?php echo 'products_'.$value->id; ?>" onclick="product_menu('<?= $value->id; ?>','<?= $value->name_category; ?>')"
				><?= $value->name_category; ?></a>
			<?php }else{?>
				<a class='style_3591_82 data_3591_952 c_3591_29 link' id="<?php echo 'products_'.$value->id; ?>" onclick="product_menu('<?= $value->id; ?>','<?= $value->name_category; ?>')"
				><?= $value->name_category; ?></a>
			<?php }?>
		</div>
		<?php endforeach; ?> 
	</div>
	
	
	
	
	<div class='lay_598_43   data_2494b_1120 col-md-9 col-xs-12 row adjust-position-row ' id="product_categorys">
		<?php if(empty($product)){ ?>
			
		<?php }?>
		
			<div class='lay_598_40   col-md-12 col-xs-12'>
				<h2 class='style_2494_51 data_2494b_1135 text title-transition'><?php echo $category[0]->name_category ?></h2>
			</div>
			<?php foreach($product as $key => $value): ?>
			<div class='lay_598_41   col-md-4 col-xs-6'>
				<div class='lay_2494_308   data_2494b_1121'>
					<a class='data_2494_1108 c_3591_29 link'
						href='#'><img
							itemprop='image' class='style_2494_97'
							src='<?php echo base_url()."assets/img/product/".$value->name_image ?>'
							alt='Storage Boxes' /></a>
				</div>
				<a class='style_2494_51 data_2494b_1122 c_3591_29 link link-product'
					href='#'>
					<span itemprop='name'>Storage Boxes</span>
				</a>
			</div>
		<?php endforeach; ?> 
	
	</div>
</div>
<div class='lay_598_30  ' id='ins_598_35'>
	<!--- EMPTY --->
</div>
