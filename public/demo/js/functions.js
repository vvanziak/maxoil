// JavaScript Document
$(document).ready(function() {
$(".view_btn").fancybox({
    'titlePosition'		: 'inside',
    'transitionIn'		: 'none',
    'transitionOut'		: 'none'
});
});
$(document).ready(function(){
// Cufon Functions //	
//Cufon.replace ('h1',{hover:true});
//Cufon.replace ('h2',{hover:true});
//Cufon.replace ('h3',{hover:true});
//Cufon.replace ('h4',{hover:true});
//Cufon.replace ('.cufontxt',{hover:true});
//Cufon.replace ('#menu > ul > li',{hover:true, hoverables:{li:true} ,    textless: { li: true } , ignore: { ul: true }  });
//Cufon.replace ('.top_bar ul li span.number',{hover:true});
//Cufon.replace ('.latest_products_slider ul li a.view_btn',{hover:true});
//Cufon.replace ('.sub_nav ul li span',{hover:true});
//Cufon.replace ('.sub_nav > ul > li',{hover:true, hoverables:{li:true} ,    textless: { li: true } , ignore: { ul: true }  });
//Cufon.replace ('.cart_information p',{hover:true});
//Cufon.replace ('.cart_information a.cart_btn',{hover:true});
//Cufon.replace ('.cart_list .titles span',{hover:true});
//Cufon.replace ('.cart_detail_btm .form_box ul li .apply_btn',{hover:true});
//Cufon.replace ('.post .titlerow span.postdate',{hover:true});
//Cufon.replace ('.payment_info a.safecheckout_btn',{hover:true});
//Cufon.replace ('.sub_nav > ul > li.inquary',{hover:true, hoverables:{li:true} ,    textless: { li: true } , ignore: { ul: true }  });
// Cufon Functions //

// Sudo Slider Functions //

var sudoSlider = $(".latest_products_slider").sudoSlider({
continuous:true
});

// Sudo Slider Functions //

// Cart DropDown Function //

$(".top_bar ul li a.cart_link") .attr ("href","#") .click(function (){return false; });
$('.top_bar ul li a.cart_link').click(function(){
$(this) .toggleClass ("active");
$('.cart_dropdown').toggle();
}
);	
// Cart DropDown Function //
// Location Function //

$(".top_bar ul li a.goolge_icon") .attr ("href","#") .click(function (){return false; });
$('.top_bar ul li a.goolge_icon').click(function(){
$(this) .toggleClass ("active");
$('.goolge_sec').toggle();
}
);	
// Location Function //
// Search Function //

$(".top_bar ul li a.search") .attr ("href","#") .click(function (){return false; });
$('.top_bar ul li a.search').click(function(){
$(this) .toggleClass ("active");
$('.searchsec').toggle();
}
);	
// Search Function //
// Opacity Functions //

$(".latest_products_slider ul li img") .css ('opacity','0.5');
$(".latest_pro_box") .hover (function () {
$(this) .find ("img") .stop().animate({"opacity": "1"});
},function () {
$(this) .find ("img") .stop().animate({"opacity": "0.5"});
});

// Opacity Functions //

// Opacity Functions //

$("div.productbox img") .css ('opacity','0.5');
$("div.productbox") .hover (function () {
$(this) .find ("img") .stop().animate({"opacity": "1"});
},function () {
$(this) .find ("img") .stop().animate({"opacity": "0.5"});
});

// Opacity Functions //

// Gallery Slider  Functions //
$("#pikame").PikaChoose({carousel:true, autoPlay: false});
// Gallery Slider  Functions //

// Back Top Functions //

$("#gotop").click(function(event){
event.preventDefault();
var full_url = this.href;
var parts = full_url.split("#");
var trgt = parts[1];
var target_offset = $("#"+trgt).offset();
var target_top = target_offset.top;
$('html, body').animate({scrollTop:target_top}, 500);
});

// Back Top Functions //

// Accordion Function //

$('.acc_container').hide();
$('.acc_trigger:first').addClass('active').next().show();
$('.acc_trigger').click(function(){
if( $(this).next().is(':hidden') ) {
$('.acc_trigger').removeClass('active').next().slideUp();
$(this).toggleClass('active').next().slideDown(); 
}
return false;
});
// Accordion Function //

// Tabs Functions //

$("ul.tabs_nav li:first").addClass("active"); //Activate first tab
$(".tab_content") .hide();
$(".tab_content:first").show(); //Show first tab content
//On Click Event
$("ul.tabs_nav li").click(function() {
$("ul.tabs_nav li").removeClass("active"); //Remove any "active" class
$(this).addClass("active");
$(".tab_content").hide(); //Hide all tab content
var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
$(activeTab).fadeIn(); //Fade in the active content
return false;
});

// Tabs Functions //

//for text replacement

$('.focusField').focus(function() {
if (this.value == this.defaultValue){ 
this.value = '';
}
if(this.value != this.defaultValue){
this.select();
}
});
$('.focusField').blur(function() {
if ($.trim(this.value) == ''){
this.value = (this.defaultValue ? this.defaultValue : '');
}
});
});


