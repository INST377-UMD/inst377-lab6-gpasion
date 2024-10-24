var map = L.map('map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

    var marker1 = L.marker([getRandomInRange(30, 35, 3), getRandomInRange(-90, -100, 3)]).addTo(map);
    var marker2 = L.marker([getRandomInRange(30, 35, 3), getRandomInRange(-90, -100, 3)]).addTo(map);
    var marker3 = L.marker([getRandomInRange(30, 35, 3), getRandomInRange(-90, -100, 3)]).addTo(map);

    var markers = [marker1, marker2, marker3];

        // gets coords and locality
        function reverseGeocode(marker, index) {
            var url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.latitude}&longitude=${marker.longitude}&localityLanguage=en`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // api data
                    
                    var long = marker.getLatLng().lng;
                    var lat = marker.getLatLng().lat;
                    var coords = `Marker ${index + 1}: Latitude: ${lat}, Longitude: ${long}`;
                    
                    // marker displays
                    var outputElement = document.getElementById('output');
                    outputElement.innerHTML += `<p id = 'markers'>${coords}</p>`;
                    outputElement.innerHTML += `<p id = 'locality'>${data.locality}</p>`;
                })
                .catch(error => {
                    console.log(error);
                });
        }

        // display & iterate
        markers.forEach((marker, index) => reverseGeocode(marker, index));

