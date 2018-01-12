var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPostMarkers(map){
  $.get('/posts', function(posts){
    var markers = post.map(function(post, i) {

        if(post.address != ''){
          codeAddress(post.address, function(addressPos){
            var marker = new google.maps.Marker({
                position: {lat : addressPos.lat(), lng : addressPos.lng()},
                label: labels[i % labels.length],
                map: map
            });
            addInfoWindow(marker, function(newMarker){
              return newMarker;
            });
          });
        }else{
          var marker = new google.maps.Marker({
              position: {lat : Number(activity.latitude), lng : Number(activity.longitude)},
              label: labels[i % labels.length],
              map: map
          });
          addInfoWindow(marker, function(newMarker){
            return newMarker;
          });
        }

        function addInfoWindow(marker, cb){
          var infowindow = new google.maps.InfoWindow({
            content: activity.body
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
          cb(marker);
        }
    });

    // Add a marker clusterer to manage the markers.
    // var markerCluster = new MarkerClusterer(map, markers, {imagePath: './m'});
  });
}

function initMap(zoom, pos) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: pos
    });
    getActivityMarkers(map)
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    initMap(15, pos)
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
// https://developers.google.com/maps/documentation/javascript/marker-clustering
// https://developers.google.com/maps/documentation/javascript/geolocation
// Create an array of alphabetical characters used to label the markers


// FOR GEO LOCATION START

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            initMap(14, pos)
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

//Get Latitude / Longitude of address
function codeAddress(address, cb) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        //console.log(results[0].geometry.location);
        cb(results[0].geometry.location);
      }
        // map.setCenter(results[0].geometry.location);
        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location
        // });
      // } else {
      //   alert('Geocode was not successful for the following reason: ' + status);
      // }
    });
  }

getLocation()
