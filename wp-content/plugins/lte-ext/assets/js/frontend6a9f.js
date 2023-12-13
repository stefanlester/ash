/* LT-Ext Plugin Frontend functions */	
"use strict";
jQuery(document).on('ready', function() { 

	initSwiperWrappers();
	//initFCSwiper();
});

jQuery(window).on('elementor/frontend/init', function () {

    elementorFrontend.hooks.addAction('frontend/element_ready/lte-product-categories.default', initSwiperWrappers);
    elementorFrontend.hooks.addAction('frontend/element_ready/lte-products.default', initSwiperWrappers);
    elementorFrontend.hooks.addAction('frontend/element_ready/lte-testimonials.default', initSwiperWrappers);
    elementorFrontend.hooks.addAction('frontend/element_ready/lte-zoomslider.default', initSwiperWrappers);
    elementorFrontend.hooks.addAction('frontend/element_ready/lte-gallery.default', initSwiperWrappers);

    elementorFrontend.hooks.addAction('frontend/element_ready/lte-rental-search.default', initCf7Styles);
    elementorFrontend.hooks.addAction('frontend/element_ready/lte-cf7.default', initCf7Styles);
});

function initSwiperWrappers() {

	initSwiperSliders();
	initFilterContainer();	
}

/* Swiper Slider Containers and Script Initialization */
function initSwiperSliders() {

	var lteSliders = jQuery('.lte-swiper-slider:not(".lte-inited")');

	jQuery(lteSliders).each(function(i, el) {

		var container = jQuery(el),
			id = 'lte-id-' + Math.floor(Math.random() * Math.floor(10000)),
			autoplay = false,
			autoplay_interact = false,
			navigation = false,
			pagination = false,
			slidesPerView = false,
			centeredSlides = false,
			simulateTouch = true,
			allowTouchMove	= true,
			spg = 1,
			slidesPerGroup = 1,
			spaceBetween = container.data('space-between'),
			loop = container.data('loop'),
			effect = container.data('effect'),
			speed = container.data('speed'),
			breakpoints_per = container.data('breakpoints').split(';'),
			breakpoints_viewports = [1599, 1199, 991, 768, 480, 0],
			breakpoints = {};

		if ( container.data('autoplay') && container.data('autoplay') > 0 ) {

			if ( container.data('autoplay-interaction') === 1 ) {

				autoplay_interact = true;		
			}
				else {

				autoplay_interact = false;
			}

			autoplay = {

				delay: container.data('autoplay'),
				disableOnInteraction: autoplay_interact,
			}
		}

		if ( container.data('center-slide') ) {

			centeredSlides = true;
		}

		if ( container.data('arrows') ) {

			var arrows_html = '<div class="'+ id + '-arrows lte-arrows lte-arrows-' + container.data('arrows') + '"><a href="#" class="lte-arrow-left"></a><a href="#" class="lte-arrow-right"></a></div>';

			if ( container.data('arrows') == 'sides-outside' || container.data('arrows') == 'sides-small' ) {

				jQuery(container).after(arrows_html);
			}
				else
			if ( container.data('arrows') != 'custom' ) {

				jQuery(container).append(arrows_html);
			}

			navigation = {
				nextEl: '.' + id + '-arrows .lte-arrow-right',
				prevEl: '.' + id + '-arrows .lte-arrow-left',
			}
		}

		if ( !loop ) loop = false;

		jQuery(breakpoints_per).each(function(i, el) {

			if ( !slidesPerView && el ) {

				slidesPerView = 1;
				if ( container.data('slides-per-group') ) slidesPerGroup = el;
				slidesPerGroup = 1;
			}

			if ( el ) {


				if ( container.data('slides-per-group') ) spg = el; else spg = 1;
				spg = 1;
				if ( container.data('slides-per-group') == -1 ) spg = -1;

				breakpoints[breakpoints_viewports[i]] = { slidesPerView : el, slidesPerGroup : el };
				
				if ( spg == -1 ) delete breakpoints[breakpoints_viewports[i]]['slidesPerGroup']; 		
			}
		});

		if ( container.data('pagination') && container.data('pagination') == 'bullets' ) {

			pagination = {

				el: '.swiper-pagination',
				type: 'bullets',
				clickable:  true
			};

			jQuery(container).append('<div class="swiper-pagination"></div>');
		}
			else
		if ( container.data('pagination') && container.data('pagination') == 'fraction' ) {

			pagination = {

				el: '.swiper-pagination',
				type: 'fraction',			
			};
		}
			else
		if ( container.data('pagination') && container.data('pagination') == 'custom' ) {

			pagination = {
				el: '.swiper-pagination-custom',
				clickable: true,
				renderBullet: function (index, className) {

					var pages = (container.data('pagination-custom'));

					return '<span class="' + className + ' ' + pages[index]['cats'] +'"><span class="lte-img"><img src="' + pages[index]['image'] + '" alt="' + pages[index]['header'] + '"></span><span class="lte-title">' + pages[index]['header'] + '</span></span>';
				},
			};
		}

		if ( container.data('simulate-touch') ) {

			simulateTouch = false;
			allowTouchMove = false;
		}

		if ( !slidesPerView ) slidesPerView = 1;

		var conf = {
	    	initialSlide	: 0,
			spaceBetween	: spaceBetween,
			centeredSlides	: centeredSlides,

			slidesPerView	: slidesPerView,
			slidesPerGroup	: slidesPerGroup,	
			breakpoints		: breakpoints,

			loop		: loop,
			speed		: speed,
			navigation	: navigation,	
			autoplay	: autoplay,	

			pagination : pagination,

			simulateTouch : simulateTouch,
			allowTouchMove : allowTouchMove,
/*
		    slideChangeTransitionStart: function(s) {

		        var currentSlide = $(s.slides[s.activeIndex]);
		        var elems = currentSlide.find(".animated")
		        elems.each(function() {
		            var $this = $(this);
		            var animationType = $this.data('animation');
		            $this.addClass(animationType, 100).on(animEndEv, function() {
		                $this.removeClass(animationType);
		            });
		        });

		    },
		    slideChangeTransitionEnd: function(s) {
		        var currentSlide = $(s.slides[s.activeIndex]);

		    }			
*/
			on: {
				init: function () {

					var activeIndex = this.activeIndex;
					var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');

					jQuery('.swiper-slide').removeClass('swiper-slide-nth-prev-2 swiper-slide-nth-next-2');
					jQuery('.swiper-slide[data-swiper-slide-index="'+realIndex+'"]').prev().prev().addClass('swiper-slide-nth-prev-2');
					jQuery('.swiper-slide[data-swiper-slide-index="'+realIndex+'"]').next().next().addClass('swiper-slide-nth-next-2');
				},
				slideChange: function () {

					var activeIndex = this.activeIndex;
					var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');

					jQuery('.swiper-slide').removeClass('swiper-slide-nth-prev-2 swiper-slide-nth-next-2');
					jQuery('.swiper-slide[data-swiper-slide-index="'+realIndex+'"]').prev().prev().addClass('swiper-slide-nth-prev-2');
					jQuery('.swiper-slide[data-swiper-slide-index="'+realIndex+'"]').next().next().addClass('swiper-slide-nth-next-2');
				},
			}
	    };

	    if ( slidesPerGroup == 1) delete conf['slidesPerGroup']; 

	    if ( effect == 'fade') {

	    	conf["effect"] = 'fade';
	    	conf["fadeEffect"] = { crossFade: true };
	    }
	    	else
	    if ( effect == 'coverflow') {

			var ww = jQuery(window).width();		    

	    	conf['centeredSlides'] = true;
	    	conf["loop"] = true;
	    	conf["effect"] = 'coverflow';

	    	if ( ww > 1199 ) {

		    	conf["coverflowEffect"] = {

					rotate : 0,
					stretch :0,
					depth: 200,
					modifier: 1,
					slideShadows: false,
				};
	    	}
	    		else {

		    	conf["coverflowEffect"] = {

					rotate : 0,
					stretch :0,
					depth: 400,
					modifier: 1.5	,
					slideShadows: false,
				};
    		}
	    }
	    	else
	    if ( effect == 'flip') {

	    	conf["effect"] = 'flip';
	    	conf["flipEffect"] = { slideShadows: false };
	    }
	    	else
	    if ( effect == 'cube') {

	    	conf["effect"] = 'cube';
	    	conf["cubeEffect"] = { slideShadows: false };
	    }

	    var swiper = new Swiper(container, conf);
		if ( container.data('autoplay') > 0 && container.data('autoplay-interaction') === 1 ) {

			swiper.el.addEventListener("mouseenter", function( event ) { swiper.autoplay.stop(); }, false);
			swiper.el.addEventListener("mouseout", function( event ) { swiper.autoplay.start(); }, false);
		}

		container.addClass('lte-inited');
	    swiper.update();		
	});
}


/* Tabs Filterered Container */
function initFilterContainer() {

	var container = jQuery('.lte-filter-container:not(".lte-inited")');

	jQuery(container).each(function(i, el) {

		var wrapper = jQuery(el),
			tabs = wrapper.find('.lte-tabs-cats');

		if (tabs.length) {

			tabs.on('click', '.lte-tab', function() {

				if ( !tabs.hasClass('animated') ) {

					var el = jQuery(this),
						filter = el.data('filter');

					el.parent().parent().find('.active').removeClass('active');
					el.addClass('active');

					if (filter === 0) {

						wrapper.find('.lte-filter-item').show();
					}
						else
					if (filter !== '') {

						wrapper.find('.lte-filter-item').removeClass('show-item').fadeOut(300, function() {

							tabs.addClass('animated');

							setTimeout(function() {

								wrapper.find('.lte-filter-item.lte-filter-id-' + filter).addClass('show-item').fadeIn(300, function() {

									tabs.removeClass('animated');
								});

								var mySwiper = document.querySelector('.lte-filter-item.lte-filter-id-' + filter + ' .swiper-container');
								if ( document.querySelector('.lte-filter-item.lte-filter-id-' + filter + ' .swiper-container') !== null ) {

									mySwiper = mySwiper.swiper;
									mySwiper.update();								
								}

							}, 500);	
						});;
						
					}

					return false;
				}

				return false;
			});

			// First Init, Activating first tab
			var firstBtn = tabs.find('.lte-tab:first');

			firstBtn.addClass('active');

			if ( firstBtn.data('filter') != 0 ) {

				wrapper.find('.lte-filter-item').hide();
				wrapper.find('.lte-filter-item.lte-filter-id-' + firstBtn.data('filter') + '').addClass('show-item').show();

				setTimeout(function() {
					wrapper.css('min-height', container.height())
				}, 1000);
			}

			jQuery(el).addClass('lte-inited');

			jQuery(window).resize();

		}		
	});
}


function initFCSwiper() {

	var container = jQuery('.elementor-widget-lte-slider-full'),
		menu = container.find('.lte-slider-fc-menu'),
		items = container.find('.lte-item');

	var current = menu.find('span').first().addClass('active').data('id');

	container.find('.lte-wrapper-item').fadeOut();
	container.find('.lte-wrapper-item-' + current).fadeIn();

	menu.on('click', 'span', function() {

		menu.find('span').removeClass('active');
		current = jQuery(this).addClass('active').data('id');

		container.find('.lte-wrapper-item').fadeOut();
		container.find('.lte-wrapper-item-' + current).delay(300).fadeIn("slow");
	});

	if ( document.querySelector('.swiper-container') !== null ) {
	
		var swiper = document.querySelector('.swiper-container').swiper;
		swiper.update();
	}
}

function initCf7Styles() {

	jQuery('form.wpcf7-form select').parent(":not(.select-wrap)").find('select').wrap('<div class="select-wrap"></div>');
	jQuery('form:not(.checkout, .woocommerce-shipping-calculator) select:not(#rating), .wpcf7-form select:not(#rating), .lte-wc-order select, aside select, .lte-footer-widget-area select').parent(":not(.select-wrap)").find('select').wrap('<div class="select-wrap"></div>');
}