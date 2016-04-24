/*==== Model or Data ====*/

var model =  {
		locations: [
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
		]
};


/*==== View Model ====*/



/*==== View ====*/


function initMap() {
		// Object that defines map properties.
		var sanMarcos = {lat: 33.136, lng: -117.189};
		var mapOptions = {
				center: sanMarcos,
				zoom: 15,
				mapTypeId:google.maps.MapTypeId.ROADMAP
		};
		// Creates map inside #mapDiv element with myOptions parameters passed to it.
		var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

		// Creates the search box, link to UI element, and returns predicted search terms.
		// var input = document.getElementById("search");
		// var searchBox = new google.maps.places.SearchBox(input);

		// Iterates through array of locations & places each one on the map.
		for (i = 0; i < model.locations.length; i++) {
				var position = new google.maps.LatLng(model.locations[i].lat, model.locations[i].lng);   
				var marker = new google.maps.Marker({
						position: position,
						map: map,
						title: model.locations[i].name,
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
				addInfoWindow(marker, model.locations[i].info);

		}
}



function listView() {
		var locationList = model.locations[i].name;
		// Iterate over the locations
		for (i = 0; i < model.locations.length; i++) {
				locationList += model.locations[i].name;
				function init() {
 				this.locationsList = document.getElementById('location-list')

		 		}
		}

} 
// Invokes initMap function on window load to render map.
google.maps.event.addDomListener(window, 'load', initMap);
listview();