// SET MAP
function initialize(){
    var mapOptions =    {
        // ZOOM OF MAP ON START
        zoom: 10,
        // INITIAL CENTER CORDINATES ON START (REGION METROPOLITANA)
        center: new google.maps.LatLng(40.7128, -74.0060),
        // TYPE OF MAP(ROADMAP, SATELLITE, HYBRID, TERRAIN)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // MINIMUM ZOOM OF MAP
        minZoom: 2
    };

    // CREATE A NEW MAP INSTANCE  USING PROVIDED OPTIONS
    var map =   new google.maps.Map(document.getElementById('map'), mapOptions);
}

// INITIALIZE THE MAP WHEN WINDOW LOADING FINISHED
google.maps.event.addDomListener(window, 'load', initialize);