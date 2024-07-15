let userLatitude = null;
let userLongitude = null;

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

const fileInput = document.getElementById('document-input');
const fileNameSpan = document.querySelector('.file-name');
const matriculaButton = document.getElementById('matricula-button');
const declararButton = document.getElementById('declarar-button');
const openCameraButton = document.getElementById('take-photo');
const cameraContainer = document.getElementById('camera-container');
const takePhotoButton = document.getElementById('take-photo-button');
const photo = document.getElementById('photo');
const context = canvas.getContext('2d');
const checkIcon = document.getElementsByClassName('fa-check');
const accordionPhoto = document.getElementById('accordion-photo');
const galleryImage = document.getElementById('gallery-image');
const cameraLocation = document.getElementById('camera-location');

const changeTakenPhotoSubmitButtonState = () => {
    if (checkIcon[0].style.display === 'inline-block' && checkIcon[1].style.display === 'inline-block') {
        declararButton.style.opacity = 1;
        declararButton.setAttribute('href', 'https://forms.gle/XaDzkb1vmb6S6DpPA');
        return;
    }
    declararButton.style.opacity = 0.5;
    declararButton.removeAttribute('href');
}

changeTakenPhotoSubmitButtonState();

fileInput.addEventListener('change', function () {
    const fileName = this.files[0] ? this.files[0].name : 'Nenhum arquivo selecionado';

    fileNameSpan.textContent = fileName;
    if (this.files[0]) {
        checkIcon[0].style.display = 'inline-block';
        changeTakenPhotoSubmitButtonState();
        matriculaButton.classList.add('active');
        matriculaButton.style.color = 'green';
    } else {
        matriculaButton.classList.remove('active');
        matriculaButton.style.color = 'black';
    }
});

openCameraButton.addEventListener('click', async () => {
    try {
        // Versão celular
        stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: 'environment' }} });
        // Versão PC
        //stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraContainer.style.display = 'block';
        video.srcObject = stream;
    } catch (err) {
        alert('Erro ao acessar a câmera: ', err);
    }
});

takePhotoButton.addEventListener('click', function () {
    cameraContainer.style.display = 'none';

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => {
            photo.src = reader.result;
            photo.style.display = 'block';

            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;

            if (userLatitude && userLongitude) {
                checkIcon[1].style.display = 'inline-block';
                accordionPhoto.style.color = 'green';
                cameraLocation.textContent = `Latitude: ${userLatitude}, Longitude: ${userLongitude}`;
                changeTakenPhotoSubmitButtonState();
            } else {
                alert("Por favor, ative sua geolocalização!");
                photo.style.display = 'none';
                cameraLocation.textContent = '';
            }
        };
        reader.readAsDataURL(blob);
    }, 'image/jpeg');
});

document.getElementById('take-gallery').addEventListener('click', function () {
    document.getElementById('gallery-input').click();
});

document.getElementById('gallery-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            galleryImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
        galleryImage.style.display = 'block';
        getExifData(file, photo);
    }
});

function getExifData(file, locationElement) {
    EXIF.getData(file, function () {
        const lat = EXIF.getTag(this, "GPSLatitude");
        const lon = EXIF.getTag(this, "GPSLongitude");
        if (lat && lon) {
            checkIcon[1].style.display = 'inline-block';
            accordionPhoto.style.color = 'green';
            changeTakenPhotoSubmitButtonState();
            const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
            const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W";
            const latitude = convertDMSToDD(lat, latRef);
            const longitude = convertDMSToDD(lon, lonRef);
            cameraLocation.textContent = `Geolocalização: Latitude: ${latitude}, Longitude: ${longitude}`;
        } else {
            // alert("Por favor, envie uma foto com geolocalização");
            const aElement = document.createElement('a');
            aElement.href = "locationTutorial.html";
            aElement.textContent = "aqui.";
            aElement.target = "_self";
            cameraLocation.textContent = 'Foto sem localização, saiba quais fotos tem localização ';
            cameraLocation.appendChild(aElement);
            checkIcon[1].style.display = 'none';
            changeTakenPhotoSubmitButtonState();
            galleryImage.style.display = 'block';
            galleryImage.style.opacity = 0.2;
        }
    });
}

function convertDMSToDD(dms, ref) {
    if (!dms) return NaN;
    const degrees = dms[0] || 0;
    const minutes = dms[1] || 0;
    const seconds = dms[2] || 0;
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (ref === "S" || ref === "W") {
        dd = dd * -1;
    }
    return dd;
}
