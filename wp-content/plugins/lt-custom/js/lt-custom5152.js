"use strict";

jQuery('.lt-custom-popup').on('change keyup', '.lt-custom-field', function(el) {

	var field = jQuery(this).data('field'),
		val = jQuery(this).val(),
		bodyStyles = window.getComputedStyle(document.body);

	document.documentElement.style.setProperty('--' + field, val);
	document.documentElement.style.setProperty('--main-darker', ltxColorLuminance(bodyStyles.getPropertyValue('--main'), -0.05));
});


jQuery(document).on('click', '.ltx-font-selector', function(el) {

	var font = jQuery(this).data('font'),
		bodyStyles = window.getComputedStyle(document.body);

	console.log(jQuery(this).data('font-headers'));
	
	document.documentElement.style.setProperty('--font-headers', jQuery(this).data('font-headers'));
	document.documentElement.style.setProperty('--font-main', jQuery(this).data('font-main'));
});

jQuery(document).on('click', '.lt-custom-popup img', function(el) {

	jQuery('.lt-custom-popup').removeClass('closed');
});

jQuery('.lt-custom-popup').on('click', '.close', function(el) {

	jQuery('.lt-custom-popup').addClass('closed');
});


jQuery(document).on('ready', function() { 

	jQuery('.lt-custom-popup').append('<div class="ltx-color-selector lt-custom-main" id="ltx-color-1" data-field="main"><div id="ltx-color-1-val"></div></div>');
	jQuery('.lt-custom-popup').append('<div class="ltx-color-selector lt-custom-second" id="ltx-color-4" data-field="second"><div id="ltx-color-4-val"></div></div>');
	jQuery('.lt-custom-popup').append('<div class="ltx-color-selector" id="ltx-color-3" data-field="gray"><div id="ltx-color-3-val"></div></div>');
	jQuery('.lt-custom-popup').append('<div class="ltx-color-selector" id="ltx-color-2" data-field="black"><div id="ltx-color-2-val"></div></div>');
/*
	jQuery('.lt-custom-popup').append('<div class="ltx-font-selector" id="ltx-font-0"><div id="ltx-font-0-val">Aa</div></div>');
	jQuery('.lt-custom-popup').append('<div class="ltx-font-selector" id="ltx-font-1" data-font-headers="Playfair+Display" data-font-main="Open+Sans"><div id="ltx-font-1-val">Aa</div></div>');
	jQuery('.lt-custom-popup').append('<div class="ltx-font-selector" id="ltx-font-2" data-font-headers="Ubuntu" data-font-main="Lato"><div id="ltx-font-2-val">Aa</div></div>');
*/
	jQuery('.ltx-color-selector').each(function(i, el) {

		var field = jQuery(el).data('field'),
			bodyStyles = window.getComputedStyle(document.body),
			color = jQuery.trim(bodyStyles.getPropertyValue('--' + field)),
			elId = jQuery(el).attr('id'),
			valId = elId + '-' + 'val';

		jQuery('#' + valId).css('background-color', color);

		if ( jQuery(el).hasClass('lt-custom-second') && jQuery.trim(bodyStyles.getPropertyValue('--main').toLowerCase()) == color.toLowerCase() ) {

			jQuery(el).hide();
		}

		jQuery('#' + elId).ColorPicker({
			color: color,
			onShow: function (colpkr) {
				jQuery(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				jQuery(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				bodyStyles = window.getComputedStyle(document.body);
				jQuery('#' + valId).css('background-color', '#' + hex);
				document.documentElement.style.setProperty('--' + field, '#' + hex, 'important');

				document.documentElement.style.setProperty('--main-darker', ltxColorLuminance(bodyStyles.getPropertyValue('--main'), -0.15));
				document.documentElement.style.setProperty('--black-text', ltxColorLuminance(bodyStyles.getPropertyValue('--black'), 0.25));
			}	
		});		
	});

	var image = jQuery('.lt-custom-popup').data('image');
	jQuery('.lt-custom-popup').prepend('<span class="img"><img src="' + image + '"></span>');
	jQuery('.lt-custom-popup').prepend('<span class="close">&times;</span>');

    setTimeout(
        function() {
                jQuery('.lt-custom-popup').fadeIn();
        }, 2000
     );
	
});

function ltxColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
}