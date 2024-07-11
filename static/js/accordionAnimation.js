const accordionBtnArr = Array.from(document.getElementsByClassName("accordion-button"));

accordionBtnArr.forEach(btn => {
    btn.addEventListener("click", function () {
        let panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight == 0 ? panel.scrollHeight + "px" : null;
    });
});
