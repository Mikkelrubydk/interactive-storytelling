document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    let content = document.querySelector('.content');
    let fallingBomb = document.querySelector('.fallingBomb');
    let bombeEksplosion = document.querySelector('.eksplosion');
    let hvidOverlay = document.querySelector('.overlay');
    let starttekst = document.querySelector('.starttekst h1');
    let startknap = document.querySelector('.startknap');
    let flyLyd = document.querySelector('.flyLyd');
    let fly = document.querySelector('.bombefly img')

    // Funktion som ruller til toppen af siden
    function scrollTilTop() {
        window.scrollTo(0, 0); // Rul til toppen af siden
    }

    // Funktion der udføres ved sidenindlæsning
    window.onload = function() {
        scrollTilTop();
    };

    // Funktion der udføres hver gang siden opdateres
    window.onbeforeunload = scrollTilTop;

    // Funktion for at starte animationen
    function startAnimation() {
        // Startpositionen
        let startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        // Højden af dokumentet
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        // Antal skridt før den når bunden
        let steps = 600;
        // Beregning af skridtlængde
        let stepLength = (scrollHeight - startPosition) / steps;

        // Start animationen
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
        content.style.animation = 'combinedAnimation 6s ease forwards';

        // Afspil lyden af den falende bombe
        fallingBomb.play();

        // Vent på, at combinedAnimation er færdig
        setTimeout(() => {
            // Start bombeEksplosion animationen
            bombeEksplosion.style.animation = 'fadeIn .8s ease forwards';
        }, 4000); // 7 sekunder er varigheden af combinedAnimation, justeret med varigheden af bombeEksplosion

        setTimeout(() => {
            // Start fadeIn animationen for hvidOverlay
            hvidOverlay.style.animation = 'fadeIn 3s ease forwards';
            hvidOverlay.style.zIndex = '9999';
        }, 5000); // 6 sekunder er varigheden af combinedAnimation, justeret med varigheden af bombeEksplosion

        hvidOverlay.addEventListener('animationend', function() {
            // Når animationen "hvidOverlay" er afsluttet = omdiriger brugeren til en anden side
            window.location.href = '/pages/atombombeinfo.html';
        });
    }

    // Eventlistener for klik på startknappen
startknap.addEventListener('click', function() {

    flyLyd.play();

    fly.style.animation = 'shake 2s infinite';

    setTimeout(() => {
        starttekst.textContent = "Hiroshima, 1945";
    }, 1000); // 1000 ms = 1 sekund forsinkelse

    setTimeout(() => {
        starttekst.textContent = "6. august, 08:15";
    }, 3000); // 3000 ms = 3 sekunders forsinkelse

    setTimeout(() => {
        starttekst.textContent = "";
        // Start animationen
        startAnimation(); // Start animationen efter sidste timeout
    }, 5000); // 7000 ms = 7 sekunders forsinkelse
});


});
