(function ($) {

	var WidgetGooglemapsHandler = function ($scope, $) {

		var mapStyles=[{featureType:"water",elementType:"geometry",stylers:[{color:"#e9e9e9"},{lightness:17}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffffff"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#ffffff"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:16}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:21}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#dedede"},{lightness:21}]},{elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#ffffff"},{lightness:16}]},{elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#333333"},{lightness:40}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#f2f2f2"},{lightness:19}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#fefefe"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#fefefe"},{lightness:17},{weight:1.2}]}];
			
		jQuery('.lte-google-maps').each(function(i, mapEl) {


			mapEl = jQuery(mapEl);
			if (mapEl.length && typeof google === 'object' && typeof google.maps === 'object') {

				var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
				var map = new google.maps.Map(document.getElementById(mapEl.attr('id')), {
				  zoom: mapEl.data('zoom'),
				  center: uluru,
				  scrollwheel: false,
				  styles: mapStyles
				});
/*
				var address = 'London, UK';

				if ( address.length ) {

					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({
					  'address': address
					}, 
					function(results, status) {
					  if( status == google.maps.GeocoderStatus.OK ) {
					     new google.maps.Marker({
					        position: results[0].geometry.location,
					        map: map
					     });
					     map.setCenter(results[0].geometry.location);
					  }
					});
				}
*/
				var marker = new google.maps.Marker({
				  position: uluru,
				  icon: mapEl.data('marker'),
				  map: map
				});
			}
		});
	};

    jQuery(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/lte-googlemaps.default', WidgetGooglemapsHandler);
    });		

})(jQuery);

