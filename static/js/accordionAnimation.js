const accordionBtnArr = Array.from(document.getElementsByClassName("accordion-button"));

accordionBtnArr.forEach(btn => {
    btn.addEventListener("click", function () {
        let panel = this.nextElementSibling;
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
});