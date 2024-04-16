document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    let content = document.querySelector('.content');
    let fallingBomb = document.querySelector('.fallingBomb');
    let bombeEksplosion = document.querySelector('.eksplosion');
    let hvidOverlay = document.querySelector('.overlay');

    // Funktion som ruller til toppen af siden
    function scrollTilTop() {
        window.scrollTo(0, 0); // Rul til toppen af siden
    }

    // Funktion der udføres ved sidenindlæsning
    window.onload = scrollTilTop;

    // Funktion der udføres hver gang siden opdateres
    window.onbeforeunload = scrollTilTop;

    content.addEventListener('click', function() {
        // Startpositionen
        let startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        // Højden af dokumentet
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // Beregning af varighed baseret på dokumentets højde (3000px per sekund)
        let durationInSeconds = scrollHeight / 580;
        // Antal skridt
        let steps = durationInSeconds * 60; // 60 frames per sekund
        // Beregning af skridtlængde
        let stepLength = (scrollHeight - startPosition) / steps;

        // Start animation
        function animateScroll(currentPosition) {
            if (currentPosition < scrollHeight) {
                // Beregn næste position
                let newPosition = currentPosition + stepLength;
                // Scroll til næste position
                window.scrollTo(0, newPosition);
                // Fortsæt animationen indtil slutningen er nået
                requestAnimationFrame(function() {
                    animateScroll(newPosition);
                });
            }
        }

        // Start animationen
        animateScroll(startPosition);

        // Tilføj animationsegenskab for shake og slideDown til content elementet
        this.style.animation = 'combinedAnimation ' + durationInSeconds + 's ease forwards';

        // Afspil lyden af den falende bombe
        fallingBomb.play();

        // Vent på, at combinedAnimation er færdig
        setTimeout(() => {
            // Start bombeEksplosion animationen
            bombeEksplosion.style.animation = 'fadeIn .8s ease forwards';
        }, durationInSeconds * 1000 - 3200); // Justeret med varigheden af combinedAnimation

        setTimeout(() => {
            // Start fadeIn animationen for hvidOverlay
            hvidOverlay.style.animation = 'fadeIn 3s ease forwards';
            hvidOverlay.style.zIndex = '9999';
        }, durationInSeconds * 1000 - 2000); // Justeret med varigheden af combinedAnimation minus 1 sekund

        hvidOverlay.addEventListener('animationend', function() {
            // Når animationen "hvidOverlay" er afsluttet = omdiriger brugeren til en anden side
            window.location.href = '/pages/atombombeinfo.html';
        });
    });
});
