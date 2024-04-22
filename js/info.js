document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    let fadeOverlay = document.querySelector('.fadeoverlay');
    
    // Funktion til at starte fadeOut animation
    function startupFade() {
        fadeOverlay.style.animation = 'fadeOut 2s ease forwards';
    }

    // Start fadeOut animationen
    startupFade();

    // Funktion til at starte en ny animation
    function zindex() {
        // Sætter z-index til -1
        fadeOverlay.style.zIndex = '-1';
    }

    // Lyt efter afslutningen af fadeOut animationen
    fadeOverlay.addEventListener('animationend', function() {
        zindex();
    });
});
