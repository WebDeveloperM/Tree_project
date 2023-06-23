google.load("maps", "3");

django.jQuery(document).unload(function () {
    GUnload();
});

django.jQuery(document).ready(function () {
    django.jQuery(window).load(function () {
        django.jQuery("input.location_picker").each(function (i) {
            var map = document.createElement('div');
            map.className = "location_picker_map";
            this.parentNode.insertBefore(map, this);
            django.jQuery(this).css('display', 'none');

            var lat = 39.773096;
            var lng = 64.420387;
            var self = this;

            if (this.value.split(',').length === 2) {
                var values = this.value.split(',');
                lat = values[0];
                lng = values[1];
            }

            var latitude = parseFloat(lat);
            var longitude = parseFloat(lng);
            var center = new google.maps.LatLng(latitude, longitude)
            this.value = String(latitude) + "," + String(longitude);

            var mapOptions = {
                center: {lat: latitude, lng: longitude},
                zoom: 13
            };

            var map = new google.maps.Map(map, mapOptions);

            var marker = new google.maps.Marker({
                position: center,
                map: map
            });

            google.maps.event.addListener(map, 'click', function (event) {
                self.value = event.latLng.lat() + "," + event.latLng.lng();
                if (marker === null || marker === undefined) {
                    marker = new google.maps.Marker({
                        position: event.latLng,
                        map: map
                    });
                } else {
                    marker.setPosition(event.latLng);
                }
            });

        });
    });
});