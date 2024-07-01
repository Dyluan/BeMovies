var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmU1ZjMxM2NmYWJhOWU1ZDM1MWU3ZGFiMWVjNWEwOSIsInN1YiI6IjY2NzNmZjFmNTY1OTE0NDJiYzE2YzZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LnqXZR36uWoFFHkLE7bS8VLZholRuhRAUuLJWB2jv4I'

search = document.getElementById('searchField');
resultsText = document.getElementsByClassName('movieName')[0];

resultats = document.getElementsByClassName('resultats')[0];

popUp = document.getElementsByClassName('popupMovie')[0];
closePopUp = document.getElementsByClassName('closePopUp')[0];
titlePopUp = document.getElementsByClassName('titlePopUp')[0];
yearPopUp = document.getElementsByClassName('yearPopUp')[0];
ratingPopUp = document.getElementsByClassName('ratingPopUp')[0];
genrePopUp = document.getElementsByClassName('genrePopUp')[0];
descPopUp = document.getElementsByClassName('descPopUp')[0];
imgPopUp = document.getElementsByClassName('imgPopUp')[0].firstElementChild;

releases = document.getElementsByClassName('releases')[0];
releasesImgContainers = releases.getElementsByClassName('imgContainer');

genres = document.getElementsByClassName('genres')[0];

genresMovies = document.getElementsByClassName('genresMovies')[0];
genresMoviesImgContainers = genresMovies.getElementsByClassName('imgContainer');

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmU1ZjMxM2NmYWJhOWU1ZDM1MWU3ZGFiMWVjNWEwOSIsInN1YiI6IjY2NzNmZjFmNTY1OTE0NDJiYzE2YzZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LnqXZR36uWoFFHkLE7bS8VLZholRuhRAUuLJWB2jv4I'
    }
};


//here we loop through the different genres of movies then we make an eventListener on each button to call the API to render the movies
for (let genre of genres.children) {
    genre.addEventListener('click', (e) => {
        e.stopPropagation();
        let thisId = genre.getAttribute('class');

        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&sort_by=popularity.asc&with_genres=${thisId}`, options)
        .then((response) => response.json())
        .then((response) => {

            liste = response.results;
            let cp = 0

            for (let elem of genresMoviesImgContainers) {
                
                let imgSrcToChange = elem.children[0];
                let imgSrc = `https://image.tmdb.org/t/p/original${liste[cp]['poster_path']}`; 

                if (liste[cp]['poster_path'] == null) {
                    //console.log('null')
                    imgSrc = "./images/parrain.jpg";
                }
    
                imgSrcToChange.setAttribute('src', imgSrc);


                let imgOverlay = elem.children[1];

                let overlayTitle = imgOverlay.children[0];
                let overlayYear = imgOverlay.children[1];
                let overlayGenre = imgOverlay.children[2];
                let overlayRanking = imgOverlay.children[3];

                let overlayNote = overlayRanking.getElementsByClassName('overlayNote')[0];

                overlayTitle.innerText = liste[cp]['title'];
                overlayYear.innerText = liste[cp]['release_date'].split('-')[0];
                overlayGenre.innerText = liste[cp]['genre_ids'];
                overlayNote.innerText = parseFloat(liste[cp]['vote_average']).toFixed(1);

                cp++;
            }

            let swipers = genresMovies.getElementsByClassName('swiper-slide');
            
            for (let swiper of swipers) {
                swiper.addEventListener('click', (e) => {
                    popUp.style.visibility = 'visible';
                        //e.target.children liste des sous classes; on peut accèder à leur html
                        console.log(e.target.children);
                        let CurrentoverlayTitle = e.target.children[0].innerText;
                        let CurrentoverlayYear = e.target.children[1].innerText;
                        let CurrentoverlayGenre = e.target.children[2].innerText;
                        let CurrentoverlayRanking = e.target.children[3].innerText;
                        let CurrentOverlayImg = e.target.offsetParent.firstElementChild;

                        titlePopUp.innerText = CurrentoverlayTitle;
                        yearPopUp.innerText = CurrentoverlayYear;
                        genrePopUp.innerText = CurrentoverlayGenre;
                        ratingPopUp.innerText = CurrentoverlayRanking;
                        imgPopUp.src = CurrentOverlayImg.src;
                })
                closePopUp.addEventListener('click', () => {
                    popUp.style.visibility = 'collapse';
                })
            }

        })
        .catch((err) => console.log('genres ', err));
    })
}


window.onload = () => {
    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc';    

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        console.log(response.results);

        let liste = response.results;

        let cp = 0;
        for (let imgContainer of releasesImgContainers) {
            //console.log(imgContainer)

            let imgSrcToChange = imgContainer.children[0];
            let imgSrc = `https://image.tmdb.org/t/p/original${liste[cp]['poster_path']}`;

            if (liste[cp]['poster_path'] == null) {
                //console.log('null')
                imgSrc = "./images/parrain.jpg";
            }

            imgSrcToChange.setAttribute('src', imgSrc);

            let imgOverlay = imgContainer.children[1];

            let overlayTitle = imgOverlay.children[0];
            let overlayYear = imgOverlay.children[1];
            let overlayGenre = imgOverlay.children[2];
            let overlayRanking = imgOverlay.children[3];

            let overlayNote = overlayRanking.getElementsByClassName('overlayNote')[0];

            overlayTitle.innerText = liste[cp]['title'];
            overlayYear.innerText = liste[cp]['release_date'].split('-')[0];
            overlayGenre.innerText = liste[cp]['genre_ids'];
            overlayNote.innerText = parseFloat(liste[cp]['vote_average']).toFixed(1);
            
            closePopUp.addEventListener('click', () => {
                popUp.style.visibility = 'collapse';
            })
            
            cp++;
        }

    })
    .catch((error) => console.log(error))
}

search.addEventListener('keypress', (e) => {
    let movieName = search.value;
    if (e.key === 'Enter') {
        resultsText.innerText = movieName;
        // reset de la zone de texte
        search.value = '';
        let url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`

        fetch(url, options)
        .then(response => response.json())
        .then(response => {

            // liste des films résultant du fetch
            let liste = response.results;

            //on loop through la liste de films résultant du call api
            for (let i=0; i<liste.length; i++) {

                let x = resultats.getElementsByClassName('imgContainer')[i];

                //liste[i]['title']
                //['overview']
                //['release_date']
                //['vote_average']
                //['id']
                //['genre_ids']

                let swipers = resultats.getElementsByClassName('swiper-slide');

                for (let j=0; j<swipers.length; j++) {
                    let swiper = swipers[j];

                    let imgUrl = `https://image.tmdb.org/t/p/original${liste[i]['poster_path']}`;
                    let imgUrl2 = `https://image.tmdb.org/t/p/original${liste[i+1]['poster_path']}`;
                    let imgUrl3 = `https://image.tmdb.org/t/p/original${liste[i+2]['poster_path']}`;
                    let imgUrl4 = `https://image.tmdb.org/t/p/original${liste[i+3]['poster_path']}`;

                    let overView = liste[i]['overview'];
                    let overView2 = liste[i+1]['overview'];
                    let overView3 = liste[i+2]['overview'];
                    let overView4 = liste[i+3]['overview'];

                    swiper.innerHTML = 
                        `<div class="moviesTest">
                            <div class="imgContainer">
                                <img src="${imgUrl}" alt="un bon film">
                                <div class="imgOverlay">
                                    <div class="overlayTitle">${liste[i]['title']}</div>
                                    <div class="overlayYear">${liste[i]['release_date']}</div>
                                    <div class="overlayGenre">${liste[i]['genre_ids']}</div>
                                    <div class="overlayRanking">
                                    <div class="rankingImgContainer">
                                            <img src="./images/star.png" alt="star">
                                        </div>
                                        <div class="overlayNote">${parseFloat(liste[i]['vote_average']).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>
                        <div class="moviesTest">
                            <div class="imgContainer">
                                <img src="${imgUrl2}" alt="un bon film">
                                <div class="imgOverlay">
                                    <div class="overlayTitle">${liste[i+1]['title']}</div>
                                    <div class="overlayYear">${liste[i+1]['release_date']}</div>
                                    <div class="overlayGenre">${liste[i+1]['genre_ids']}</div>
                                    <div class="overlayRanking">
                                    <div class="rankingImgContainer">
                                            <img src="./images/star.png" alt="star">
                                        </div>
                                        <div class="overlayNote">${parseFloat(liste[i+1]['vote_average']).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="moviesTest">
                            <div class="imgContainer">
                                <img src="${imgUrl3}" alt="un bon film">
                                <div class="imgOverlay">
                                    <div class="overlayTitle">${liste[i+2]['title']}</div>
                                    <div class="overlayYear">${liste[i+2]['release_date']}</div>
                                    <div class="overlayGenre">${liste[i+2]['genre_ids']}</div>
                                    <div class="overlayRanking">
                                    <div class="rankingImgContainer">
                                            <img src="./images/star.png" alt="star">
                                        </div>
                                        <div class="overlayNote">${parseFloat(liste[i+2]['vote_average']).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="moviesTest">
                            <div class="imgContainer">
                                <img src="${imgUrl4}" alt="un bon film">
                                <div class="imgOverlay">
                                    <div class="overlayTitle">${liste[i+3]['title']}</div>
                                    <div class="overlayYear">${liste[i+3]['release_date']}</div>
                                    <div class="overlayGenre">${liste[i+3]['genre_ids']}</div>
                                    <div class="overlayRanking">
                                    <div class="rankingImgContainer">
                                            <img src="./images/star.png" alt="star">
                                        </div>
                                        <div class="overlayNote">${parseFloat(liste[i+3]['vote_average']).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>
                        `;

                    swiper.addEventListener('click', (e) => {
                        popUp.style.visibility = 'visible';
                        //e.target.children liste des sous classes; on peut accèder à leur html
                        //on est dans imgoverlay
                        //console.log(e.target.children);
                        let CurrentoverlayTitle = e.target.children[0].innerText;
                        let CurrentoverlayYear = e.target.children[1].innerText;
                        let CurrentoverlayGenre = e.target.children[2].innerText;
                        let CurrentoverlayRanking = e.target.children[3].innerText;
                        let CurrentOverlayImg = e.target.offsetParent.firstElementChild;

                        titlePopUp.innerText = CurrentoverlayTitle;
                        yearPopUp.innerText = CurrentoverlayYear;
                        genrePopUp.innerText = CurrentoverlayGenre;
                        ratingPopUp.innerText = CurrentoverlayRanking;
                        imgPopUp.src = CurrentOverlayImg.src;
                        
                    });
                    closePopUp.addEventListener('click', () => {
                        popUp.style.visibility = 'collapse';
                    })

                    // changer cette ligne, ne tient pas compte de la valeur max de la liste
                    i+=4;    
                }
            }
        })
        .catch(err => console.error(err));
    }
    
})

const idsTranslator = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let liste = response.genres;

        return response.genres;

        for (let elem of liste) {
            console.log(elem['id'], ' = ', elem['name']);
        }
    })
    .catch((err) => console.log('Genre  ===', err));
}


let hardCoded = {
    '28' : 'Action',
    '12' : 'Adventure',
    '16' : 'Animation',
    '35' : 'Comedy',
    '80' : 'Crime',
    '99' : 'Documentary',
    '18' : 'Drama',
    '10751' : 'Family',

}


//   {
//     "id": 14,
//     "name": "Fantasy"
//   },
//   {
//     "id": 36,
//     "name": "History"
//   },
//   {
//     "id": 27,
//     "name": "Horror"
//   },
//   {
//     "id": 10402,
//     "name": "Music"
//   },
//   {
//     "id": 9648,
//     "name": "Mystery"
//   },
//   {
//     "id": 10749,
//     "name": "Romance"
//   },
//   {
//     "id": 878,
//     "name": "Science Fiction"
//   },
//   {
//     "id": 10770,
//     "name": "TV Movie"
//   },
//   {
//     "id": 53,
//     "name": "Thriller"
//   },
//   {
//     "id": 10752,
//     "name": "War"
//   },
//   {
//     "id": 37,
//     "name": "Western"
//   }