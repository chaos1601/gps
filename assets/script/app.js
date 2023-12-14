'use strict';

const overlay = document.querySelector('.overlay');

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhb3MxNiIsImEiOiJjbHEzd3pydmswMTBvMnJxbHVndmk2c2c4In0.cIfdBIcw-tte467qbZETYQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    pitch: 40,
    zoom: 16
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
    color: '#3898ff',
});

function getLocation(position) {
    const { latitude, longitude } = position.coords;

    if (longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        overlay.style.background = ('display: none', 5000);
    }
}

function errorHandler(error) {
    console.log(error.message);
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}
