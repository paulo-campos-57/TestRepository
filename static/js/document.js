const fileInput = document.getElementById('document-input');
const fileNameSpan = document.querySelector('.file-name');
const matriculaButton = document.getElementById('matricula-button');
const declararButton = document.getElementById('declarar-button');


const changeTakenPhotoSubmitButtonState = (isDisabled) => {
    if(isDisabled){
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