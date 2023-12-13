"use strict";


jQuery(document).on('ready', function() { 

	initEvents();
	initStyles();
	initCollapseMenu();	
	checkCountUp();	
	initScrollReveal();
	checkScrollAnimation();
});

jQuery(window).on('scroll', function (event) {

	checkNavbar();
	checkGoTop();
	checkScrollAnimation();
}).scroll();

jQuery(window).on('load', function(){

	initMasonry();
	initParallax();
});

jQuery(window).on("resize", function () {

	setResizeStyles();
}).resize();

/* Navbar menu initialization */
function initCollapseMenu() {

	var navbar = jQuery('.lte-navbar-items'),
		navbar_toggle = jQuery('.lte-navbar-toggle'),
		navbar_wrapper = jQuery("#lte-nav-wrapper");

    navbar_wrapper.on('click', '.lte-navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
        navbar_wrapper.toggleClass('mob-visible');
    });

	// Anchor mobile menu
	navbar.on('click', '.menu-item-type-custom > a', function(e) {

		if ( typeof jQuery(this).attr('href') !== 'undefined' && jQuery(this).attr('href') !== '#' && jQuery(this).attr('href').charAt(0) === '#' )  {

	        navbar_toggle.addClass('collapsed');
	        navbar.addClass('collapse');
	        navbar_wrapper.removeClass('mob-visible');
    	}  	    
    });

    navbar.on('click', '.menu-item-has-children > a', function(e) {

    	var el = jQuery(this);

    	if (!el.closest('.lte-navbar-items').hasClass('collapse')) {

    		if ((el.attr('href') === undefined || el.attr('href') === '#') || e.target.tagName == 'A') {

		    	el.next().toggleClass('show');
		    	el.parent().toggleClass('show');

		    	return false;
		    }
	    }
    });

    var lastWidth;
    jQuery(window).on("resize", function () {

    	checkNavbar();

    	var winWidth = jQuery(window).width(),
    		winHeight = jQuery(window).height();

       	lastWidth = winWidth;
    });	
}

/* Navbar attributes with dependency on resolution and scroll status */
function checkNavbar() {

	var navbar = jQuery('.lte-navbar-items'),
		scroll = jQuery(window).scrollTop(),
    	navBar = jQuery('.lte-navbar'),
    	topBar = jQuery('.lte-topbar-block'),
    	navbar_toggle = jQuery('.lte-navbar-toggle'),
    	navbar_wrapper = jQuery("#lte-nav-wrapper"),
	    slideDiv = jQuery('.slider-full'),
	    winWidth = jQuery(window).width(),
    	winHeight = jQuery(window).height(),
		navbar_mobile_width = navbar.data('mobile-screen-width');

   	if ( winWidth < navbar_mobile_width ) {

		navbar.addClass('navbar-mobile').removeClass('navbar-desktop');
		navbar_wrapper.addClass('lte-navwrapper-mobile').removeClass('lte-navwrapper-desktop');
	}
		else {

		navbar.addClass('navbar-desktop').removeClass('navbar-mobile');
		navbar_wrapper.addClass('lte-navwrapper-desktop').removeClass('lte-navwrapper-mobile');
	}


	navbar_wrapper.addClass('inited');

	if ( topBar.length ) {

		navBar.data('offset-top', topBar.height());
	}

    if (winWidth > navbar_mobile_width && navbar_toggle.is(':hidden')) {

        navbar.addClass('collapse');
        navbar_toggle.addClass('collapsed');
        navbar_wrapper.removeClass('mob-visible');
    }

    jQuery("#lte-nav-wrapper.navbar-layout-transparent + .lte-page-header, #lte-nav-wrapper.navbar-layout-transparent + .main-wrapper").css('margin-top', '-' + navbar_wrapper.height() + 'px');


    jQuery(".lte-image-preview img").each(function(i, el) {

    	var height = jQuery(el).height() - 700;

    	jQuery(el)
    	.on('mouseover', function() {

    		jQuery(this).css(  { '-webkit-transform' : 'translateY(-' + height + 'px)', 'transform' : 'translateY(-' + height + 'px)' } );
    	})
    	.on('mouseout', function() {

    		jQuery(this).css(  { '-webkit-transform' : 'translateY(0px)', 'transform' : 'translateY(0px)' } );
    	});
    });
}


/* Check GoTop Visibility */
function checkGoTop() {

	var gotop = jQuery('.lte-go-top'),
		scrollBottom = jQuery(document).height() - jQuery(window).height() - jQuery(window).scrollTop();

	if ( gotop.length ) {

		if ( jQuery(window).scrollTop() > 400 ) {

			gotop.addClass('show');
		}
			else {

			gotop.removeClass('show');
    	}

    	if ( scrollBottom < 50 ) {

    		gotop.addClass('scroll-bottom');
    	}
    		else {

    		gotop.removeClass('scroll-bottom');
   		}
	}	
}

/* All keyboard and mouse events */
function initEvents() {

	initSearch();

	setTimeout(function() { if ( typeof Pace !== 'undefined' && jQuery('body').hasClass('paceloader-enabled') ) { Pace.stop(); }  }, 3000);	

	jQuery('.swipebox.photo').magnificPopup({type:'image', gallery: { enabled: true }});
	jQuery('.swipebox.lte-video-popup').magnificPopup({type:'iframe'});
	
	if (!/Mobi/.test(navigator.userAgent) && jQuery(window).width() > 768) {

		jQuery('.matchHeight').matchHeight();
		jQuery('.items-matchHeight article').matchHeight();
	}	

	jQuery('.lte-sidebar-filter').on('click', function() {

		jQuery(this).parent().toggleClass('lte-show');
	});

	jQuery('.lte-sidebar-close').on('click', function() {

		jQuery(this).parent().parent().removeClass('lte-show');
	});

	jQuery('.lte-sidebar-overlay').on('click', function() {

		jQuery(this).parent().removeClass('lte-show');
	});


	/* Scrolling to navbar from "go top" button in footer */
    jQuery('.lte-go-top').on('click', function() {

	    jQuery('html, body').animate({ scrollTop: 0 }, 1200);

	    return false;
	});

	// WooCommerce grid-list toggle
	jQuery('.gridlist-toggle').on('click', 'a', function() {

		jQuery('.matchHeight').matchHeight();
	});

	jQuery('.woocommerce').on('click', 'div.quantity > span', function(e) {

		var f = jQuery(this).siblings('input');
		if (jQuery(this).hasClass('more')) {
			f.val(Math.max(0, parseInt(f.val()))+1);
		} else {
			f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
		}
		e.preventDefault();

		jQuery(this).siblings('input').change();

		return false;
	});

	if ( jQuery('.lte-mouse-move-object').length )  {

		jQuery('.lte-mouse-move-object').each(function(i, el) {

			jQuery('body').on('mousemove', function(e){

				jQuery(el)[0].style.WebkitTransform = 'translate3d(' + '-' + (((e.pageX - jQuery(this).offset().left) / jQuery(el).width()) * 10) + 'px, 0, 0)';
			});
		});
	}

	jQuery('.lte-mouse-move .elementor-column-wrap')
    .on('mouseover', function() {

		if ( typeof jQuery(this).data('bg-size') === 'undefined' ) {
			jQuery(this).data('bg-size', jQuery(this).css('background-size'));
		}

		if ( jQuery(this).css( 'background-size' ) != 'cover' ) {

			jQuery(this)[0].style.setProperty( 'background-size', parseInt(jQuery(this).data('bg-size')) + 10 + '%', 'important' );
		}
    })
    .on('mouseout', function(){
    	
    	if ( jQuery(this).css( 'background-size' ) != 'cover' ) {

			jQuery(this)[0].style.setProperty( 'background-size', jQuery(this).data('bg-size'), 'important' );
		}
    })	
	.on('mousemove', function(e){

		if ( jQuery(this).css( 'background-size' ) != 'cover' ) {

			jQuery(this)[0].style.setProperty( 'background-position', ((e.pageX - jQuery(this).offset().left) / jQuery(this).width()) * 100 + '% ' + ((e.pageY - jQuery(this).offset().top) / jQuery(this).height()) * 100 + '%', 'important' );
		}
	});
	

	jQuery('.lte-navbar').on( 'affix.bs.affix', function(){

	    if (!jQuery( window ).scrollTop()) return false;
	});	

	if ( jQuery('.lte-particles-ripples').length ) {

	    jQuery('.lte-particles-ripples').ripples({
	        resolution: 512,
	        dropRadius: 20,
	        perturbance: 0.04,
	    });

		setInterval(function() {

			if ( !document.hidden ) {

				var $el = jQuery('.lte-particles-ripples');
				var x = Math.random() * $el.outerWidth();
				var y = Math.random() * $el.outerHeight();
				var dropRadius = 20;
				var strength = 0.04 + Math.random() * 0.04;

				$el.ripples('drop', x, y, dropRadius, strength);
			}
		}, 400);	    
	}	
}

function initSearch() {

    let searchHandler = function(event){

        if (jQuery(event.target).is(".lte-top-search-wrapper, .lte-top-search-wrapper *")) return;
        jQuery(document).off("click", searchHandler);
        jQuery('.lte-top-search-wrapper').removeClass('show-field');
        jQuery('.lte-navbar-items').removeClass('muted');
    }

	let search_href = jQuery('.lte-top-search-wrapper').data('base-href'),
		search_soruce = jQuery('.lte-top-search-wrapper').data('source');


	jQuery('.lte-top-search-ico').on('click', function (e) {

		e.preventDefault();
		jQuery(this).parent().toggleClass('show-field');
		jQuery('.lte-navbar-items').toggleClass('muted');

        if (jQuery(this).parent().hasClass('show-field')) {

        	jQuery(document).on("click", searchHandler);
        }
        	else {

        	jQuery(document).off("click", searchHandler);
        }
	});

	jQuery('.lte-nav-search .lte-header').on('click', function(e) {

		jQuery(this).prev().find('.lte-top-search-ico').click();

		return false;
	});

    jQuery('.lte-top-search-ico-close').on('click', function (e) {

		jQuery(this).parent().toggleClass('show-field');
		jQuery('.lte-navbar-items').toggleClass('muted');    	

		return false;
    });


	jQuery('#lte-top-search-ico-mobile').on('click', function() {

		if ( search_soruce == 'woocommerce' ) {

			window.location = search_href + '?s=' + jQuery(this).next().val() + '&post_type=product';
		}
			else {

			window.location = search_href + '?s=' + jQuery(this).next().val();
		}

		return false;
	});	

	jQuery('.lte-top-search-wrapper input').keypress(function (e) {

		if (e.which == 13) {

			if ( search_soruce == 'woocommerce' ) {
			
				window.location = search_href + '?s=' + jQuery(this).val() + '&post_type=product';
			}
				else {

				window.location = search_href + '?s=' + jQuery(this).val();
			}

			return false;
		}
	});	
}

function lteUrlDecode(str) {

   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

/* Parallax initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	jQuery('.lte-parallax').parallax("50%", 0.2);	

	jQuery('section.lte-parallax-yes, div.lte-parallax-yes > .elementor-column-wrap').each(function(i, el) {

		var val = jQuery(el).attr('class').match(/lte-bg-parallax-value-(\S+)/); 
		if ( val === null ) var val = [0, 0.2];

		jQuery(el).parallax("50%", parseFloat(val[1]));	
	});	

	if (typeof jQuery().paroller === "function") {
	
		jQuery("[data-paroller-factor]").paroller();
	}
}

/* Adding custom classes to element */
function initStyles() {

	jQuery('form:not(.checkout, .woocommerce-shipping-calculator) select:not(#rating), .wpcf7-form select:not(#rating), .lte-wc-order select, aside select, .lte-footer-widget-area select').wrap('<div class="select-wrap"></div>');
	
	jQuery('.wpcf7-checkbox').parent().addClass('margin-none');

	jQuery('input[type="submit"], button[type="submit"]').not('.lte-btn').addClass('lte-btn');
	jQuery('#send_comment').removeClass('btn-xs');
	jQuery('#searchsubmit').removeClass('lte-btn');
	jQuery('blockquote').append('<span class="lte-triangle"></span>');

	jQuery('table:not([class])').addClass('lte-table');
	jQuery('ul:not([class]), ol:not([class])').addClass('lte-list');

	// WooCommerce styles
	jQuery('.woocommerce .button').addClass('lte-btn btn-main').removeClass('button');	
	jQuery('.woocommerce-message .lte-btn, .woocommerce-info .lte-btn').addClass('btn-xs');
	jQuery('.woocommerce .price_slider_amount .lte-btn').removeClass('btn-black color-hover-white').addClass('btn btn-main btn-xs');
	jQuery('.woocommerce .checkout-button').removeClass('btn-black color-hover-white').addClass('btn btn-main btn-xs');
	jQuery('button.single_add_to_cart_button').removeClass('btn-xs color-hover-white').addClass('color-hover-main');
	jQuery('.woocommerce .coupon .lte-btn').removeClass('color-hover-white').addClass('color-hover-main');
	jQuery('.woocommerce .product .wc-label-new').closest('.product').addClass('lte-wc-new');
	jQuery('.widget_product_search button').removeClass('lte-btn btn-xs');
	jQuery('.woocommerce .product_meta span').each(function(i, el) {

		jQuery(el).html(jQuery(el).html().replace(/\,/gi, '<span class="lte-coma">,</span>'));
	});

	// Cart quanity change
	jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
	jQuery(document).off('updated_wc_div').on('updated_wc_div', function () {

		jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
		initStyles();
	});

	jQuery('.input-group-append .lte-btn').removeClass('btn-xs');

	jQuery('.lte-hover-logos img').each(function(i, el) { jQuery(el).clone().addClass('lte-img-hover').insertAfter(el); });

	jQuery(".container input[type=\"submit\"], .container input[type=\"button\"], .container .lte-btn").wrap('<span class="lte-btn-wrap"></span');
	jQuery(".woocommerce *:not(.lte-btn-wrap) > .lte-btn").wrap('<span class="lte-btn-wrap"></span');

	jQuery(".container .wpcf7-submit").removeClass('btn-xs').wrap('<span class="lte-btn-wrap"></span');

	jQuery('.blog-post .nav-links > a').wrapInner('<span></span>');
	jQuery('.blog-post .nav-links > a[rel="next"]').wrap('<span class="next"></span>');
	jQuery('.blog-post .nav-links > a[rel="prev"]').wrap('<span class="prev"></span>');

	jQuery('.lte-background-no-img').each(function() {

		var rx = Math.floor((Math.random() * 1200)) + 'px',
			ry = Math.floor((Math.random() * 900)) + 'px';

		jQuery(this).css('background-position', rx + ' ' + ry);
	});

	var overlays = jQuery('*[class*="lte-overlay-wrapper-"]')
	.each(function (i, el) {

		var overlay = this.className.match(/lte-overlay-wrapper-(\S+)/);

		if ( jQuery(this).hasClass('elementor-column') ) {

			jQuery(el).children('.elementor-column-wrap').prepend('<div class="lte-background-overlay lte-overlay-' + overlay[1] + '"></div>');
		}
			else {

			jQuery(el).prepend('<div class="lte-background-overlay lte-overlay-' + overlay[1] + '"></div>');
		}
	});

	var header_icon_class = jQuery('#lte-header-icon').data('icon');

	var update_width = jQuery('.woocommerce-cart-form__contents .product-subtotal').outerWidth();
	jQuery('button[name="update_cart"]').css('width', update_width);

	jQuery('.wp-searchform .lte-btn').removeClass('lte-btn');

	// Settings copyrights overlay for non-default heights
	var copyrights = jQuery('.copyright-block.copyright-layout-copyright-transparent'),
		footer = jQuery('#lte-widgets-footer + .copyright-block'),
		widgets_footer = jQuery('#lte-widgets-footer'),
		footerHeight = footer.outerHeight();

	widgets_footer.css('padding-bottom', 0 + footerHeight + 'px');
	footer.css('margin-top', '-' + 0 + footerHeight + 'px');

	copyrights.css('margin-top', '-' + (copyrights.outerHeight()) + 'px')

	var bodyStyles = window.getComputedStyle(document.body);
	var niceScrollConf = {cursorcolor:bodyStyles.getPropertyValue('--white'),cursorborder:"0px",background:"#000",cursorwidth: "8px",cursorborderradius: "0px",autohidemode:false};

	jQuery('.lte-menu-sc.lte-scroll-yes .lte-items').niceScroll(niceScrollConf);		

}

/* Styles reloaded then page has been resized */
function setResizeStyles() {

	var videos = jQuery('.blog-post article.format-video iframe'),
		container = jQuery('.blog-post'),
		bodyWidth = jQuery(window).outerWidth(),
		contentWrapper = jQuery('.lte-content-wrapper.lte-footer-parallax'),
		footerWrapper = jQuery('.lte-content-wrapper.lte-footer-parallax + .lte-footer-wrapper');

		contentWrapper.css('margin-bottom', footerWrapper.outerHeight() + 'px');

	jQuery.each(videos, function(i, el) {

		var height = jQuery(el).height(),
			width = jQuery(el).width(),
			containerW = jQuery(container).width(),
			ratio = containerW / width;

		jQuery(el).css('width', width * ratio);
		jQuery(el).css('height', height * ratio);
	});

	document.documentElement.style.setProperty( '--fullwidth', bodyWidth + 'px' );
}

/* Starting countUp function */
function checkCountUp() {

	if (jQuery(".lte-countup-animation").length){

		jQuery('.lte-countup-animation').counterUp();
	}
}

/* 
	Scroll Reveal Initialization
	Catches the classes: lte-sr-fade_in lte-sr-text_el lte-sr-delay-200 lte-sr-duration-300 lte-sr-sequences-100
*/
function initScrollReveal() {

	if (/Mobi/.test(navigator.userAgent) || jQuery(window).width() < 768) return false;

	window.sr = ScrollReveal();

	var srAnimations = {
		zoom_in: {
			
			opacity : 1,
			scale    : 0.01,
		},
		zoom_in_large: {
			
			opacity : 0,
			scale    : 5.01,
		},		
		fade_in: {
			distance: 1,
			opacity : 0,
			scale : 1,
		},
		slide_from_left: {
			distance: '50%',
			origin: 'left',
			scale    : 1,
		},
		slide_from_right: {
			distance: '50%',
			origin: 'right',			
			scale    : 1,
		},
		slide_from_top: {
			distance: '50%',
			origin: 'top',			
			scale    : 1,
		},
		slide_from_bottom: {
			distance: '50%',
			origin: 'bottom',			
			scale    : 1,
		},
		slide_rotate: {
			rotate: { x: 0, y: 0, z: 360 },		
		},		
	};

	var srElCfg = {

		block: [''],
		items: ['article', '.item'],
		text_el: ['.heading', '.lte-btn', '.lte-btn-wrap', 'p', 'ul', 'img'],
		list_el: ['li']
	};


	/*
		Parsing elements class to get variables
	*/
	jQuery('.lte-sr').each(function() {

		var el = jQuery(this),
			srClass = el.attr('class');

		var srId = srClass.match(/lte-sr-id-(\S+)/),
			srEffect = srClass.match(/lte-sr-effect-(\S+)/),
			srEl = srClass.match(/lte-sr-el-(\S+)/),
			srDelay = srClass.match(/lte-sr-delay-(\d+)/),
			srDuration = srClass.match(/lte-sr-duration-(\d+)/),
			srSeq = srClass.match(/lte-sr-sequences-(\d+)/); 

		var cfg = srAnimations[srEffect[1]];

		var srConfig = {

			delay : parseInt(srDelay[1]),
			duration : parseInt(srDuration[1]),
			easing   : 'ease-in-out',
			afterReveal: function (domEl) { jQuery(domEl).css('transition', 'all .3s ease'); }
		}			

		cfg = jQuery.extend({}, cfg, srConfig);

		var initedEls = [];
		jQuery.each(srElCfg[srEl[1]], function(i, e) {

			initedEls.push('.lte-sr-id-' + srId[1] + ' ' + e);
		});

		sr.reveal(initedEls.join(','), cfg, parseInt(srSeq[1]));
	});
}



/* Masonry initialization */
function initMasonry() {

	jQuery('.masonry').masonry({
	  itemSelector: '.item',
	  columnWidth:  '.item'
	});		

	jQuery('.gallery-inner').masonry({
	  itemSelector: '.mdiv',
	  columnWidth:  '.mdiv'
	});			
}

/* Scroll animation used for homepages */
function checkScrollAnimation() {

	var scrollBlock = jQuery('.ltx-check-scroll:not(.done)');
    if (scrollBlock.length) {

    	jQuery.each(scrollBlock, function(i, el) {

		    var scrollTop = scrollBlock.offset().top - window.innerHeight;
		    if ( jQuery(window).scrollTop() >= scrollTop ) {

		    	scrollBlock.addClass('done');
		    }  
    	});
	}
}
