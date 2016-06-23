// Class Constructor
function LocationItem(name, lat, lng, info) {
    var self = this;
    
    self.name = ko.observableArray(name);
    self.lat = lat;
    self.lng = lng;
    self.info = info;
}

/*==== View Model ====*/
function initMap() {

    // locations = [
    //     ['Fish House Vera Cruz', 33.136278, -117.188976, 'Delicious fresh fish in a cozy atmosphere.'],
    //     ['Mama Kats Restaurant', 33.135647, -117.186735, 'Homemade food at reasonable prices.'],
    //     ['Toms Burger Family Restaurant', 33.132742, -117.194078, 'Burgers, fries, malts and shakes.'],
    //     ['Elephant Bar', 33.140122, -117.192620],
    //     ['Nattiya Thai Restaurant', 33.136045, -117.179256],
    //     ['Cocina Del Charro', 33.135069, -117.189914]
    // ];

    locations = [
        new LocationItem(['Fish House Vera Cruz'], 33.136278, -117.188976, 'Delicious fresh fish in a cozy atmosphere.'),
        new LocationItem(['Mama Kats Restaurant'], 33.135647, -117.186735, 'Homemade food at reasonable prices.'),
        new LocationItem(['Toms Burger Family Restaurant'], 33.132742, -117.194078, 'Burgers, fries, malts and shakes.'),
        new LocationItem(['Elephant Bar'], 33.140122, -117.192620, 'A variety of American, Italian, and Mexican cuisine.'),
        new LocationItem(['Nattiya Thai Restaurant'], 33.136045, -117.179256, 'Authentic Thai Food and specialty drink bar.'),
        new LocationItem(['Cocina Del Charro'], 33.135069, -117.189914, 'Specialty Mexican dishes, outdoor patio, and bar.')
    ];

    
    // Object that defines map properties.
    var sanMarcos = {
        lat: 33.136,
        lng: -117.189
    };
    var mapOptions = {
        center: sanMarcos,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Creates map inside #mapDiv element with mapOptions parameters passed to it.
    var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

    // Creates the search box, link to UI element, and returns predicted search terms.
    var input = document.getElementById("search");
    //var searchBox = new google.maps.places.SearchBox(input);

    // Iterates through array of locations & places each one on the map.
    for (i = 0; i < locations.length; i++) {
        var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: locations[i][0],
            clickable: true
        });

        function addInfoWindow(marker, message) {
            
            var infoWindow = new google.maps.InfoWindow({
              content: message
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(map, marker);
            });

        } // End of addInfoWindow()
        addInfoWindow(marker, locations[i][3]);

    }
} // End of initMap()

// Invokes initMap function on window load to render map.
google.maps.event.addDomListener(window, 'load', initMap);    
   
ko.applyBindings(new initMap());    
