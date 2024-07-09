const accordionBtn = document.getElementsByClassName("accordion-button")

for (let i = 0; i < accordionBtn.length; i++) {
    
    accordionBtn[i].addEventListener("click", function () {
        console.log("entrei");
        let panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
}