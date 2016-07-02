// Class Constructor
function LocationItem(name, lat, lng, info) {
    var self = this;
    
    self.name = name;
    self.lat = lat;
    self.lng = lng;
    self.info = info;
}

var locations = ko.observableArray()[
        {name:'Fish House Vera Cruz', location: {lat: 33.136278, lng: -117.188976}, info: 'Delicious fresh fish in a cozy atmosphere.'},
        {name:'Mama Kats Restaurant', location: {lat: 33.135647, lng: -117.186735}, info: 'Homemade food at reasonable prices.'},
        {name:'Toms Burger Family Restaurant', location: {lat: 33.132742, lng: -117.194078}, info: 'Burgers, fries, malts and shakes.'},
        {name:'Elephant Bar', location: {lat: 33.140122, lng: -117.192620}, info: 'A variety of American, Italian, and Mexican cuisine.'},
        {name:'Nattiya Thai Restaurant', location: {lat: 33.136045, lng: -117.179256}, info: 'Authentic Thai Food and specialty drink bar.'},
        {name:'Cocina Del Charro', location: {lat: 33.135069, lng: -117.189914}, info: 'Specialty Mexican dishes, outdoor patio, and bar.'}
];

/*==== View Model ====*/
function viewModel() {

    var self = this;

    var location = locations.location;
    var map;
    var marker;
    var markers = [];

    function initMap() {
        // Object that defines map properties.
        var mapOptions = {
            center: {lat: 33.136, lng: -117.189},
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        // Creates map inside #mapDiv element with mapOptions parameters passed to it.
        map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

        // Creates the search box, link to UI element, and returns predicted search terms.
        // var input = document.getElementById("search");
        // var searchBox = new google.maps.places.SearchBox(input);
        var smallInfoWindow = new google.maps.InfoWindow();
        // Markers.  Iterates through array of locations & places each one on the map.
        for (i = 0; i < locations.length; i++) {
            var position = locations[i].location;
            var title = locations[i].name;
            marker = new google.maps.Marker({
                // map: map,  // moved inside showListings function
                position: position,
                title: title,
                clickable: true,
                animation: google.maps.Animation.DROP,
                id: i
            });
            markers.push(marker);

            marker.addListener('click', function() {
                    populateInfoWindow(this, smallInfoWindow);
            })

        function addInfoWindow(marker, infowindow) {
            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.name + '</div>');
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick',function(){
                    infowindow.setMarker(null);
                });
            }
        }
    } // End of initMap()
    initMap();
}
// Invokes initMap function on window load to render map.
// google.maps.event.addDomListener(window, 'load', initMap);    
   
ko.applyBindings(new viewModel());    
