const accordionBtnArr = Array.from(document.getElementsByClassName("accordion-button"));

accordionBtnArr.forEach(btn => {
    btn.addEventListener("click", function () {
        let panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight == 0 ? panel.scrollHeight + "px" : null;
    });
});


// accordionBtnArr.forEach(btn => {
//     btn.addEventListener("click", function () {
//         let panel = this.nextElementSibling;
//         let panelComputerStyle = window.getComputedStyle(panel);

//         const panelTotalHeight = Number(panel.scrollHeight) + Number(panelComputerStyle.paddingTop.substring(0, 2));

        

//         panel.style.maxHeight = panel.style.maxHeight == 0 ? panelTotalHeight.toString() + "px" : null;
//     });
// });