// Vælg alle elementer med klassen 'faktakort'
const faktakortElements = document.querySelectorAll('.faktakort');

// Definér, hvad der skal ske, når et element er synligt på skærmen
const options = {
  threshold: 0.5 // Bestemmer hvor meget af elementet der skal være synligt for at udløse en handling
};

// Opret en observer, der holder øje med, hvornår elementer er synlige på skærmen
const observer = new IntersectionObserver((entries, observer) => {
  // Gennemgå hver synlige indgang (entry)
  entries.forEach((entry, index) => {
    // Hvis elementet er synligt på skærmen
    if (entry.isIntersecting) {
      // Gør tekstboksen (faktabody) synlig ved at ændre gennemsigtigheden til 1
      const faktabody = entry.target.querySelector('.faktabody');
      faktabody.style.opacity = 1;

      // Vis tilsvarende pil ved at ændre opacity
      const pilIndex = parseInt(entry.target.dataset.pilindex); // Hent pilens indeks fra data-attributten
      const pil = document.querySelector(`.pil${pilIndex}`);
      if (pil) {
        pil.style.opacity = 1;
      }

      // Hvis pilindex'et er 4, og animationen ikke allerede er tilføjet, tilføj green-pulse animation til det første billede i "image-container"
      if (pilIndex === 4) {
        const firstImage = document.querySelector('.image-container img:first-child');
        firstImage.style.animation = 'green-pulse 2s infinite';
      }

      // Stop med at observere dette element, når det er blevet synligt
      observer.unobserve(entry.target);
    }
  });
}, options);

// Observer hvert faktakort-element for at se, om de bliver synlige på skærmen
faktakortElements.forEach(faktakort => {
  observer.observe(faktakort);
});

// Opret en ny observer, der holder øje med, hvornår elementer er synlige på skærmen, når man scroller op
const reverseObserver = new IntersectionObserver((entries, observer) => {
  // Gennemgå hver synlige indgang (entry)
  entries.forEach((entry, index) => {
    // Hvis elementet er synligt på skærmen
    if (entry.isIntersecting) {
      // Vis tilsvarende pil, hvis det ikke allerede er synligt
      const pilIndex = parseInt(entry.target.dataset.pilindex); // Hent pilens indeks fra data-attributten
      const pil = document.querySelector(`.pil${pilIndex}`);
      if (pil && pil.style.opacity !== "1") {
        pil.style.opacity = 1;
      }
    } else {
      // Skjul tilsvarende pil, hvis det ikke længere er synligt
      const pilIndex = parseInt(entry.target.dataset.pilindex); // Hent pilens indeks fra data-attributten
      const pil = document.querySelector(`.pil${pilIndex}`);
      if (pil && pil.style.opacity === "1") {
        pil.style.opacity = 0;
      }
    }
  });
}, options);

// Observer hvert faktakort-element for at se, om de bliver synlige på skærmen, når man scroller op
faktakortElements.forEach(faktakort => {
  reverseObserver.observe(faktakort);
});
