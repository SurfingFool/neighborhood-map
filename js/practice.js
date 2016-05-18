/*==== Model ====*/
var locations = ko.observableArray([
	{
		name : 'Fish House Vera Cruz',
		lat : 33.136278,
		lng : -117.188976,
		info : 'Delicious fresh fish in a cozy atmosphere.'
	},
	{
		name : 'Mama Kats Restaurant',
		lat : 33.135647,
		lng : -117.186735,
		info : 'Homemade food at reasonable prices.'
	},
	{
		name : 'Toms Burger Family Restaurant',
		lat : 33.132742,
		lng : -117.194078,
		info : 'Burgers, fries, malts and shakes.'
	},
	{
		name : 'Elephant Bar',
		lat : 33.140122,
		lng : -117.192620,
		info : 'A variety of American, Italian, and Mexican cuisine.'
	},
	{
		name : 'Nattiya Thai Restaurant',
		lat : 33.136045,
		lng : -117.179256,
		info : 'Authentic Thai Food and specialty drink bar.'
	},
	{
		name : 'Cocina Del Charro',
		lat : 33.135069,
		lng : -117.189914,
		info : 'Specialty Mexican dishes, outdoor patio, and bar.'
	}
]);


// Class constructor
var Location = function(data) {
	var self = this;
	self.name = data.name;
}

/*==== View Model ====*/
var locationViewModel = function() {	
	var self = this;

	var locationItem = locations()[0];
	
	self.currentLocation = ko.observable(new Location(locationItem));

	console.log(self.currentLocation());
	console.log(self.currentLocation().name);
	
}


	
	
	//for (i = 0; i < locations.length; i++);
		//location = locations[i];
	// var places = '<ul>';
	// for (var index in locations) {
	// 	places += '<li>' + locations[i].name + '</li>';
	// }
	// places += '</ul>'


ko.applyBindings(new locationViewModel);
	

var initMap = function() {
	// Defines map properties.
	var sanMarcos = {lat: 33.136, lng: -117.189};
	var mapOptions = {
		center: sanMarcos,
		zoom: 15,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	
	// Creates map inside #mapDiv element with myOptions parameters passed to it.
	var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
	// Shows markers
	

	// var searchBox = new google.maps.places.SearchBox(input);
	// ko.applyBindings(new initMap());	

	// Adds markers and corresponding info windows to locations when clicked
	var addMarkers = function() {
		var marker;
		// Iterates through array of locations & places each one on the map.
		for (i = 0; i < locations.length; i++) {
			var position = new google.maps.LatLng(locations[i].lat, locations[i].lng);   
			marker = new google.maps.Marker({
				position: position,
				map: map,
				title: locations[i].name,
				clickable: true
			});

			function addInfoWindow(marker, message) {

				var infoWindow = new google.maps.InfoWindow({
						content: message
				});

				google.maps.event.addListener(marker, 'click', function () {
						infoWindow.open(map, marker);
				});
			}
			addInfoWindow(marker, locations[i].info);
		}
	}
}
	

//Invokes initMap function on window load to render map.
google.maps.event.addDomListener(window, 'load', initMap);
// window.onload = initMap();





