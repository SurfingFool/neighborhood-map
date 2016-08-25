// Class Constructor
function LocationItem(place) {

    this.name = place.name;
    this.location = place.location;
    this.info = place.info;
    this.currentSelection = ko.observable(false);
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
var currentLocation; // Current clicked location stored here.
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

function mapError() {
    alert('The map could not be loaded.');
}

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
        // of the map marker data.
        location.marker = newMapMarker;

        // Create marker event listener, pass 'location' as a parameter
        newMapMarker.addListener('click', (function(location) {
            return function() {
                console.log(location);
                // Execute 'populateInfoWindow' and pass on the 'location' parameter
                populateInfoWindow(location);
                toggleBounce(location);
                // To change color of clicked list item.
                // Check if previous location object has been clicked. If so, color style not
                // applied. 
                if (currentLocation) {
                currentLocation.currentSelection(false);
                }
                // Applies color style to current clicked location.
                currentLocation = location;
                location.currentSelection(true);  
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

// This function populates infowindow content and opens the infowindow object in this marker location.
// It does not create a new infowindow object.
function populateInfoWindow(location) {
    console.log(location);
    
    // Perform AJAX request.
    var client_id = 'B0RZKSFFOY4MZXDOVQ1K2ZISI2LIYBO1H1YVMR4SIGDH5LZG';
    var client_secret = 'NNMRABZJDANAI5GCFG2T5TW01EFSGUBHYBDHZEFMXFYPUP5L';
    var fsUrl = 'https://api.foursquare.com/v2/venues/search';
    
    function getNewVenues () {
        $.ajax({
            // Use this data to update the viewModel, and KO will update UI automatically.
            url: fsUrl,
            dataType: 'json',
            data: {
                limit: 15,
                ll: '33.136,-117.189',
                query: location.name,
                client_id: client_id,
                client_secret: client_secret,
                v: 20130815,
                m: 'foursquare',
            },
            async: true,
            // Display content retreived from Foursquare.
            success: function(result) {
                                
                var theVenue = result.response.venues[0];
                var theAddress = theVenue.location.address;

                console.log(theVenue);
                console.log(theAddress);

                var infoWindowContent = '<div class="locationTitle">' + location.name + '<div class="information">' + 
                location.info + '</div>' + theAddress + '</div>';

                // Populates content of window with the following:
                infowindow.setContent(infoWindowContent);
                infowindow.open(map,location.marker);
            },
        });
    }
    getNewVenues();
}

// Adaptation to smaller screen sizes.
var menu = document.getElementById('menu');
var mapArea = document.getElementById('mapDiv');
var slider = document.getElementById('sidebar');
var listItem = document.getElementById('listElem');
// To show the sidebar
menu.addEventListener('click', function(e) {
    slider.classList.toggle('open');
    e.stopPropagation();
});
// To hide the sidebar
mapArea.addEventListener('click', function() {
    slider.classList.remove('open');
});

// Hides hamburger menu image on larger screens.
$(document).ready(
    function() {
    $("img").addClass("hide");
});

/*==== View Model Constructor ====*/
function viewModel() {
    var self = this;
    // Creates an empty observable array.  Also can store returned data from places api.
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
            // location.marker.setVisible();
            // Show every marker.
            for (var i = 0; i < self.locationsObservableArray().length; i++) {
                if (self.locationsObservableArray()[i].marker !== undefined) {
                    self.locationsObservableArray()[i].marker.setVisible(true); // Shows the marker
                }
            }
            return self.locationsObservableArray();
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