function initMap() {
  var element = document.querySelector('.contacts__map');
  var positionMapLat = 57.8165;
  var positionMapLng = 28.317;
  var positionOne = {lat: 57.817728, lng: 28.278518};
  var textOne = 'улица Западная, 16';

  var positionTwo = {lat: 57.812468, lng: 28.347291};
  var textTwo = 'Октябрьский пр.19A';

  var WIDTH_DESKOP = 1024;
  var WIDTH_MOBILE = 749;
  var ZOOM_DESKTOP = 13.65;
  var ZOOM_TABLET = 13.6;
  var ZOOM_MOBILE = 12.75;
  var myMap;
  var centerLatLng;
  var options;

  var removeBg = function () {
    var currentElement = document.querySelectorAll('.gm-style-iw');
    Array.from(currentElement).forEach(function (item, index) {
      item.parentNode.firstChild.classList.add('contacts__map-bg');
      item.classList.add('gm-style-iw--' + index);
    });
  };


  var addMarker = function (coordinates, text) {
    var marker = new google.maps.Marker({
      position: coordinates,
      map: myMap
    });

    var infowindow = new google.maps.InfoWindow({
      content: text,
      disableAutoPan: true,
      position: coordinates
    });
    infowindow.open(myMap);
  };


  var setMapForWidth = function () {
    var currentWidth = document.documentElement.clientWidth;
    if (WIDTH_DESKOP < currentWidth) {
      centerLatLng = new google.maps.LatLng(positionMapLat, positionMapLng);
      options = {
        zoom: ZOOM_DESKTOP,
        center: centerLatLng,
        disableDefaultUI: true,
        disableAutoPan: false
      };
      myMap = new google.maps.Map(element, options);
      addMarker(positionOne, textOne);
      addMarker(positionTwo, textTwo);
    }
    if (WIDTH_DESKOP >= currentWidth) {
      centerLatLng = new google.maps.LatLng(positionMapLat, positionMapLng);
      options = {
        zoom: ZOOM_TABLET,
        center: centerLatLng,
        disableDefaultUI: true,
        disableAutoPan: false
      };
      myMap = new google.maps.Map(element, options);
      addMarker(positionOne, textOne);
      addMarker(positionTwo, textTwo);
    }
    if (WIDTH_MOBILE >= currentWidth) {
      centerLatLng = new google.maps.LatLng(positionMapLat, positionMapLng);
      options = {
        zoom: ZOOM_MOBILE,
        center: centerLatLng,
        disableDefaultUI: true,
        disableAutoPan: false
      };
      myMap = new google.maps.Map(element, options);
      addMarker(positionOne, textOne);
      addMarker(positionTwo, textTwo);
    }

    setTimeout(function () {
      removeBg();
    }, 300);
  };
  setMapForWidth();
  window.addEventListener('resize', setMapForWidth);
}

window.addEventListener('load', initMap);
