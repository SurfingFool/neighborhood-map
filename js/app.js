// Class Constructor
function LocationItem (place) {
    var self = this;

    self.name = place.name;
    self.location = place.location;
    self.info = place.info;
}

var initialLocations = [
    {
        name:'Fish House Vera Cruz',
        location: {
            lat: 33.136278,
            lng: -117.188976
        },
        info: 'Delicious fresh fish in a cozy atmosphere.'
    },
    {
        name:'Mama Kats Restaurant',
        location: {
            lat: 33.135647,
            lng: -117.186735
        },
        info: 'Homemade food at reasonable prices.'
    },
	{
		name:'Toms Burger Family Restaurant',
		location: {
			lat: 33.132742,
			lng: -117.194078
		},
		info: 'Burgers, fries, malts and shakes.'
	},
    {
		name:'Elephant Bar',
		location: {
			lat: 33.140122,
			lng: -117.192620
		},
		info: 'A variety of American, Italian, and Mexican cuisine.'
	},
    {
		name:'Nattiya Thai Restaurant',
		location: {
			lat: 33.136045,
			lng: -117.179256
		},
		info: 'Authentic Thai Food and specialty drink bar.'
	},
    {
		name:'Cocina Del Charro',
		location: {
			lat: 33.135069,
			lng: -117.189914
		},
		info: 'Specialty Mexican dishes, outdoor patio, and bar.'
	}
];

var map;
var infowindow;

// This is the Google Maps API callback function
// It will be automatically executed when the Google Maps API finishes loading
// This is done by adding 'callback=initMap' to the script tag in the HTML file
function initMap() {
    // Object that defines map properties.
    var mapOptions = {
        center: {lat: 33.136, lng: -117.189},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Creates map inside #mapDiv element with mapOptions parameters passed to it.
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

    // Create Google Infowindow - empty until window is populated with another function.
    infowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });

    // Initializes function to create Map Markers
    createMarkers();

} // End of initMap()


function createMarkers() {
    // Markers.  Iterates through array of locations & places each one on the map.
    var location;
    // Loop over each location in the locationsObservableArray (inside the viewmodel)
    for (var i = 0; i < vm.locationsObservableArray().length; i++) {
        // Store this location object (the current location in the loop) inside a variable
        // to make it easier to reference the location
        location = vm.locationsObservableArray()[i];

        // Create map marker object
        var newMapMarker = new google.maps.Marker({
            map: map,  // moved inside showListings function
            position: location.location,
            title: location.name,
            animation: google.maps.Animation.DROP,
            info: location.info
        });

        // Store the new map marker object inside the location object
        // This creates a new property called 'marker' for each location, which contains all
        // of the map marker data
        location.marker = newMapMarker;

        // Create marker event listener, pass 'location' as a parameter
        newMapMarker.addListener('click', (function(location) {
            return function() {
                console.log(location);
                // execute 'populateInfoWindow' and pass on the 'location' parameter
                populateInfoWindow(location);
            };
        })(location));
        
    }
}

// This function populates infowindow content
// and opens the infowindow object in this marker location
// It does not create a new infowindow object
function populateInfoWindow(location) {
    // Perform AJAX request here
    // Display content retreived from third party API
    // Can break this down into as many functions that makes sense

    // Check to make sure the infowindow is not already open on this marker.
    if (infowindow.marker != location) {
        infowindow.marker = location;
        infowindow.setContent('<div class="locationTitle">' + location.name + '<div>' + location.info + '</div>' + '</div>');
        infowindow.open(map, location.marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        // infowindow.addListener('closeclick',function(){

        //     infowindow.setMap(null);
        // });
    }
}

/*==== View Model Constructor ====*/
function viewModel() {
    var self = this;

    // Creates an empty observable array
    self.locationsObservableArray = ko.observableArray();

    var place;
    // Loop over each initial location object
    for (var i = 0; i < initialLocations.length; i++) {
        // Create new LocationItem using initial location object as parameter
        place = new LocationItem(initialLocations[i]);
        // Push that new LocationItem to the locationsObservableArray
        // Observable Arrays can be used by Knockout to hide / show locations
        self.locationsObservableArray.push(place);
    }

    // Observable to store the search input value
    // This can be bound to the DOM using either the 'value' or 'textInput' binding
    self.searchTerm = ko.observable();

    // Creates the search box, link to UI element, and returns predicted search terms.
    // var input = document.getElementById("search");
    // var searchBox = new google.maps.places.SearchBox(input);
    self.search = function() {
        // filter list items & map markers
        /*for all location:
            if the location name contains the filter (self.searchTerm):
                show the location
            else
                hide the location*/
    };
}

// Assign viewModel to a global variable.
// This creates a new viewModel object and stores it inside the 'vm' variable
// in order to access viewModel variables using dot notation
// Ex: vm.locationsObservableArray()
var vm = new viewModel();
ko.applyBindings(vm);
