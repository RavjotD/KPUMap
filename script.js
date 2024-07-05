// Global data type to retrieve KPU Coordinates on Map

const kpuLibraryCoord = { lat: 49.13302466185951, lng: -122.87147855074468};
 
// Create a function to track distance 
        function calcDistance(lat1, lon1, lat2, lon2){

            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c ;
            
            return distance;
        
        
        }

// Create a function to showcase map content(map markers, text)
        function inMap(){

            const map = L.map('map').setView([0,0], 13);


            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);


            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    const userCoords = {
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude
                    };

                    // Marker to show current position
                    L.marker(userCoords).addTo(map).bindPopup('Your are here').openPopup();

                    // Marker to show KPU Library position
                    L.marker(kpuLibraryCoord).addTo(map).bindPopup('KPU Surrey Library').openPopup();


                    map.setView(userCoords, 13);

                    const distance = calcDistance(

                        userCoords.lat, userCoords.lng, kpuLibraryCoord.lat, kpuLibraryCoord.lng
                    );

                    document.getElementById('distance').innerText = `Distance to KPU Surrey Library: ${distance.toFixed(2)} km`;

                });
            } 
            
            else {

                alert("Geolocation is not supported, choose a different browser.");

            }

            }
        
            window.onload = inMap;
