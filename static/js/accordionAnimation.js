const accordionBtnArr = Array.from(document.getElementsByClassName("accordion-button"));


accordionBtnArr.forEach(btn => {
    
    btn.addEventListener("click", function () {
        const chevron = btn.lastChild;
        const panel = this.nextElementSibling;
        const chevronComputed = window.getComputedStyle(chevron, null);

        chevron.style.transform = chevronComputed.getPropertyValue('transform') === 'none' ? 'rotate(90deg)' : 'none';
        panel.style.maxHeight = panel.style.maxHeight == 0 ? panel.scrollHeight + "px" : null;
    });
});
