window.onload = function() {
    const query = `
        query ($page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                media (sort: POPULARITY_DESC, type: ANIME) {
                    id
                    title {
                        english
                    }
                    coverImage {
                        large
                    }
                    description
                }
            }
        }
    `;

    const variables = {
        page: 1,
        perPage: 100
    };

    fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })
    .then(response => response.json())
    .then(data => {
        const animeList = data.data.Page.media;
        const animeListContainer = document.getElementById('anime-list');
        animeList.forEach((anime, index) => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';
        
            const animeRanking = document.createElement('h3');
            animeRanking.textContent = `Rank: ${index + 1}`;
            animeCard.appendChild(animeRanking);
        
            const animeTitle = document.createElement('h2');
            animeTitle.textContent = anime.title.english;
            animeCard.appendChild(animeTitle);
        
            const animeImage = document.createElement('img');
            animeImage.src = anime.coverImage.large;
            animeImage.alt = anime.title.english;
            animeCard.appendChild(animeImage);
        
            const animeSynopsis = document.createElement('p');
            animeSynopsis.textContent = anime.description;
            animeCard.appendChild(animeSynopsis);
        
            animeListContainer.appendChild(animeCard);
        });
    })
    .catch(error => {
        console.error(`There was an error retrieving the anime list: ${error}`);
    });
};