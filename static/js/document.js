const fileInput = document.getElementById('document-input');
const fileNameSpan = document.querySelector('.file-name');
const matriculaButton = document.getElementById('matricula-button');
const declararButton = document.getElementById('declarar-button');
const openCameraButton = document.getElementById('take-photo');
const cameraContainer = document.getElementById('camera-container');
const takePhotoButton = document.getElementById('take-photo-button');
const photo = document.getElementById('photo');
const context = canvas.getContext('2d');

const changeTakenPhotoSubmitButtonState = (isDisabled) => {
    if (isDisabled) {
        declararButton.style.opacity = 0.5;
        declararButton.removeAttribute('href');
        return
    }
    declararButton.style.opacity = 1;
    declararButton.setAttribute('href', 'step1.html');
}

changeTakenPhotoSubmitButtonState(true);

fileInput.addEventListener('change', function () {
    const fileName = this.files[0] ? this.files[0].name : 'Nenhum arquivo selecionado';

    fileNameSpan.textContent = fileName;
    if (this.files[0]) {
        changeTakenPhotoSubmitButtonState(false);
        matriculaButton.classList.add('active');
        matriculaButton.style.color = 'green';
    } else {
        matriculaButton.classList.remove('active');
        matriculaButton.style.color = 'black';
    }
});

openCameraButton.addEventListener('click', async () => {
    try {
        cameraContainer.style.display = 'block';
        // Versão celular
        //stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: { exact: 'environment' }} });
        // Versão PC
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch(err) {
        alert('Erro ao acessar a câmera: ', err);
    }
});

takePhotoButton.addEventListener('click', function(){
    cameraContainer.style.display = 'none';

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => {
            photo.src = reader.result;
            photo.style.display = 'block';
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;

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
