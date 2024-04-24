document.addEventListener('DOMContentLoaded', function () {
    // Hent JSON-dataene ved hjælp af fetch
    fetch('../json/data.json')
    .then(response => response.json())
    .then(data => {
        // Gennemløb dataene og opret HTML-elementer
        data.forEach(item => {
            const article = document.createElement('article');
            const div = document.createElement('div');
            div.classList.add('cirkel', item.color);
            const h2 = document.createElement('h2');
            h2.textContent = item.radius;
            const p = document.createElement('p');
            p.textContent = item.description;

            article.appendChild(div);
            article.appendChild(h2);
            article.appendChild(p);

            // Tilføj 'article' til DOM'en
            document.querySelector('.nukeinfo').appendChild(article);
        });
    })
    .catch(error => {
        console.error('Fejl ved hentning af JSON-data:', error);
    });
});
