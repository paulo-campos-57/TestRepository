function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
        }, error => {
            console.error('Erro ao acessar a geolocalização: ', error);
        });
    } else {
        console.error('Geolocalização não é suportada por este navegador.');
    }
}

document.addEventListener('DOMContentLoaded', requestLocation);