// Class Constructor
function LocationItem(place) {

    this.name = place.name;
    this.location = place.location;
    this.info = place.info;
}

var initialLocations = [{
    name: 'Fish House Vera Cruz',
    location: {
        lat: 33.136278,
        lng: -117.188976
    },
    info: 'Delicious fresh fish in a cozy atmosphere.'
}, {
    name: 'Mama Kats Restaurant',
    location: {
        lat: 33.135647,
        lng: -117.186735
    },
    info: 'Homemade food at reasonable prices.'
}, {
    name: 'Toms Burger Family Restaurant',
    location: {
        lat: 33.132742,
        lng: -117.194078
    },
    info: 'Burgers, fries, malts and shakes.'
}, {
    name: 'Elephant Bar',
    location: {
        lat: 33.140122,
        lng: -117.192620
    },
    info: 'A variety of American, Italian, and Mexican cuisine.'
}, {
    name: 'Nattiya Thai Restaurant',
    location: {
        lat: 33.136045,
        lng: -117.179256
    },
    info: 'Authentic Thai Food and specialty drink bar.'
}, {
    name: 'Cocina Del Charro',
    location: {
        lat: 33.135069,
        lng: -117.189914
    },
    info: 'Specialty Mexican dishes, outdoor patio, and bar.'
}];

var map;
var infowindow;
var service; // If using google.maps.places.PlacesService().
var searchTerm;
// This is the Google Maps API callback function
// automatically executed when the Google Maps API finishes loading.
// This is done by adding 'callback=initMap' to the script tag in the HTML file
function initMap() {
    // Object that defines map properties.
    var mapOptions = {
        center: {
            lat: 33.136,
            lng: -117.189
        },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Creates map inside #mapDiv element with mapOptions parameters passed to it.
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);

    // Create Google Infowindow object (just one) - empty until window is populated with another function.
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
            map: map, // moved inside showListings function
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

                toggleBounce(location);
            };

        })(location));

    }
}

function toggleBounce(location) {
    if (location.marker.getAnimation() !== null) {
        location.marker.setAnimation(null);
    } else {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            location.marker.setAnimation(null);
        }, 1400);
    }
}

// This function populates infowindow content
// and opens the infowindow object in this marker location
// It does not create a new infowindow object
function populateInfoWindow(location) {
    console.log(location);
    // Perform AJAX request.
    // Display content retreived from Foursquare.
    
    
    var client_id = 'B0RZKSFFOY4MZXDOVQ1K2ZISI2LIYBO1H1YVMR4SIGDH5LZG';
    var client_secret = 'NNMRABZJDANAI5GCFG2T5TW01EFSGUBHYBDHZEFMXFYPUP5L';
    var fsUrl = 'https://api.foursquare.com/v2/venues/search?' + 
        'near=San Marcos,CA&v=20130815&ll=51.447581,5.457728&query='
        + location.name + '&client_id=' + client_id + '&client_secret=' + client_secret;
    
    // Yelp AJAX request goes here
    var foursquareLocationObject = result.response.venues[0];

    function getNewVenues () {
        $.ajax({
            // Use this data to update the viewModel, and KO will update UI automatically.
            url: 'fsUrl',
            data: {
                limit: 10,
                near: 'San Marcos, CA'
            },
            success: function(result) {
                console.log(result);
                if (result.response.venues.length > 0) {
                    // var foursquareLocationObject = result.response.venues[0];
                    console.log(foursquareLocationObject);

                    infowindow.setContent('<div class="locationTitle">' + location.name + '<div class="information">'
                     + location.info + '</div>' + '</div>');
                    infowindow.open(map, location.marker); // Opens infowindow as part of this function.        
                } else {
                    alert('Sorry, no venues found.');
                }
            },
            error: function(error) {
                alert('An error has occured.');
            }
            
        });
    }

    getNewVenues();
        
    // This is the object that holds the results data. 
    var newVenueData = {
        // name: fsResults[newVenues].location.name,
        name: foursquareLocationObject[newVenues].location.name,
        info: location.info
    };

    // The newLocationData is then passed to an observableArray that
    // is used to populate the info window.
    var newVenuesArray = [];
    function newVenueResults(newVenueData) {
        for (var i = 0; i < newVenuesArray().length; i++) {
            location.push(newVenueData) // Push to locationsObservableArray
        }
        
    };

}

/*==== View Model Constructor ====*/
function viewModel() {
    var self = this;

    // Creates an empty observable array.  Also can store returned data from places api.
    self.locationsObservableArray = ko.observableArray();

    var newVenuesArray = ko.observableArray();

    var place;
    // Loop over each initial location object
    for (var i = 0; i < initialLocations.length; i++) {
        // Create new LocationItem using initial location object as parameter
        place = new LocationItem(initialLocations[i]);
        // Push that new LocationItem to the locationsObservableArray
        // Observable Arrays can be used by Knockout to hide / show locations
        self.locationsObservableArray.push(place);
    }

    // Listener when list item is clicked and creates info window.
    self.listItemClick = function(marker) {
        console.log(marker);
        google.maps.event.trigger(this.marker, 'click');
    };

    // Knockout handles the following filter: an observable to store users search input
    // Value bound to the DOM using 'textInput' binding and provides string for the
    // textSearch() method.
    self.searchTerm = ko.observable(); //  
    
    self.filterSearch = ko.computed(function() {
        // If nothing in search box, show all locations.
        if (!self.searchTerm() || self.searchTerm === undefined) {
            return self.locationsObservableArray();
            location.marker.setVisible();
        } else {
            // So input isn't case sensitive.
            filter = self.searchTerm().toLowerCase();
            // Knockout filters out non-matching locations.
            return ko.utils.arrayFilter(self.locationsObservableArray(),
            function(location) {
                var match = location.name.toLowerCase().indexOf(filter) > -1;
                // Set visibilty to true if location matches, false if it doesn't.
                location.marker.setVisible(match);
                // If true, location goes into filtered array.
                return match;
            });
        } 
    });
    
}

// Assign viewModel to a global variable. This creates a new viewModel object and stores
// it inside the 'vm' variable in order to access viewModel variables using dot notation
// Example: vm.locationsObservableArray()
var vm = new viewModel();
ko.applyBindings(vm);