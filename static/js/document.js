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

const changeTakenPhotoSubmitButtonState = () => {
    if (checkIcon[0].style.display === 'inline-block' && checkIcon[1].style.display === 'inline-block') {
        declararButton.style.opacity = 1;
        declararButton.setAttribute('href', 'step1.html');
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
        changeTakenPhotoSubmitButtonState();
        checkIcon[0].style.display = 'inline-block'
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
        //stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: 'environment' }} });
        // Versão PC
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
            checkIcon[1].style.display = 'inline-block';
            accordionPhoto.style.color = 'green';
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            changeTakenPhotoSubmitButtonState();

            // //Usar a localização do navegador
            // if (userLatitude && userLongitude) {
            //     cameraLocation.textContent = `Geolocalização: Latitude: ${userLatitude}, Longitude: ${userLongitude}`;
            //     changeTakenPhotoSubmitButtonState(false);
            // } else {
            //     photo.style.display = 'none';
            //     cameraLocation.textContent = '';
            //     changeTakenPhotoSubmitButtonState(true);
            // }
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
        checkIcon[1].style.display = 'inline-block';
        accordionPhoto.style.color = 'green';
        const reader = new FileReader();
        reader.onload = function (e) {
            galleryImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
        galleryImage.style.display = 'block';
        changeTakenPhotoSubmitButtonState();
    }
});
