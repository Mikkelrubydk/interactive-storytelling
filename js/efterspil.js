document.addEventListener('DOMContentLoaded', function () {
    const startKnap = document.getElementById('start-knap');
    const spilStatus = document.getElementById('spil-status');
    const mand = document.getElementById('mand');
    const bombe = document.getElementById('bombe');
    const levelDisplay = document.getElementById('level');
    const græs = document.getElementById('græs');
    const baggrund = document.getElementById('baggrund');
    const fail = document.getElementById('fail')
    const levelUp = document.getElementById('levelup')
    const baggrundMusik = document.getElementById('baggrundsmusik')
    
    let score = 0;
    let level = 1;
    let speed = 5;
    let mandX = window.innerWidth / 2; // Startpositionen for mand
    let undvigedeBomber = 0;

    startKnap.addEventListener('click', startSpil);

    function startSpil() {
        startKnap.style.display = 'none';
        spilStatus.innerText = ''; // Nulstil indholdet af spil-status
        spilStatus.style.display = 'block';
        mand.style.display = 'block';
        bombe.style.display = 'block'; // Gør bomben synlig
        levelDisplay.style.display = 'block';
        levelDisplay.innerText = 'Niveau: ' + level;
        græs.style.display = 'block'
        baggrund.style.display = 'block'
        baggrundMusik.play();
        baggrundMusik.volume = 0.05;
        
        // Placer bombe-elementet tilfældigt vandret og øverst på skærmen
        bombe.style.top = '-100px';
        bombe.style.left = Math.floor(Math.random() * (window.innerWidth - 50)) + 'px';
        
        dropBomb();
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            mandX -= 50;
            if (mandX < 0) mandX = 0; // Sørg for at mand ikke går uden for venstre kant
            mand.style.left = mandX + 'px';
        } else if (event.key === 'ArrowRight') {
            mandX += 50;
            if (mandX + mand.offsetWidth > window.innerWidth) mandX = window.innerWidth - mand.offsetWidth; // Sørg for at mand ikke går uden for højre kant
            mand.style.left = mandX + 'px';
        }
    });

    function dropBomb() {
        const mandPosition = mand.getBoundingClientRect();
        const bombePosition = bombe.getBoundingClientRect();
        
        bombe.style.top = bombePosition.top + speed + 'px';

        if (bombePosition.top > window.innerHeight) {
            bombe.style.top = '-100px';
            bombe.style.left = Math.floor(Math.random() * (window.innerWidth - 50)) + 'px'; // Tilfældig position vandret
            
            // Øg scoren når bomben undgås
            score += 1;
            undvigedeBomber++;

            // Hvis spilleren har undgået 10 bomber, øg niveauet og hastigheden
            if (undvigedeBomber === 10) {
                level++;
                speed += 2;
                levelUp.play()
                levelUp.volume = 0.1
                levelDisplay.innerText = 'Niveau: ' + level;
                undvigedeBomber = 0; // Nulstil tælleren for undvigede bomber
            }
        }

        if (collision(mandPosition, bombePosition)) {
            gameOver();
            fail.play();
            fail.volume = 0.1
            baggrundMusik.pause();
            baggrundMusik.currentTime = 0;
        } else {
            requestAnimationFrame(dropBomb);
        }
    }

    function collision(mandPos, bombePos) {
        return !(
            mandPos.bottom < bombePos.top ||
            mandPos.top > bombePos.bottom ||
            mandPos.right < bombePos.left ||
            mandPos.left > bombePos.right
        );
    }

    function gameOver() {
        spilStatus.innerText = 'Game Over! Din score: ' + score;
        startKnap.style.display = 'block';
        mand.style.display = 'none';
        score = 0;
        level = 1;
        speed = 5;
        undvigedeBomber = 0; // Nulstil tælleren for undvigede bomber
    }
});
