# Neighborhood Map

## Description
This application uses the Google Maps javascript API to render a map, along with markers, indicating popular restaurant venues in the San Marcos, California area.  Using Foursquare, a third party API, additional venue information is returned when the user clicks on a venue.  [Knockout](http://knockoutjs.com/documentation/introduction.html) is implemented to automatically update the user interface when a search feature is used.

## Installation
Though one can run this application without an authentication api key, it is recommended to obtain a standard one for free on your own website. Directions for obtaining an API Key can be found [here](https://developers.google.com/maps/documentation/javascript/get-api-key).  Replace the existing key with your own at the bottome of the index.html file: ```...../js?key=YOUR KEY....```
When using the Foursquare API, please obtain your own Client ID and Client Secret at [Foursquare](https://foursquare.com/developers/app) by creating an App which involves filling out a few simple fields. Again, replace your own ID and Secret with the existing ones inside the app.js file.  In addition, you need to download all files/folders associated with this application packaging them together in a single folder.
To run the app, simply open up the index.html file inside your browser.

## Use and Tips
Make any changes or additions you like.  You can change the look of the map, its predefined locations, as well as the information about the venues by learning more at the following links:
* [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript/)
* [Foursquare Documentation](https://developer.foursquare.com/start)

### License
copyright &copy; 2016 by Brett Ludwick
