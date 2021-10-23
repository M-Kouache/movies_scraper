const container = document.querySelector('.container')

window.addEventListener("load",fetchInfo)

function fetchInfo () {
    fetch('http://localhost:8000/') 
      .then(response => response.json())
      .then(jsonObj => displayMovies(jsonObj) )
      .catch(() => alert('API Could not be reached at this time'))
}

function displayMovies(movies){

    movies.forEach(movie => {
        const movieLink = movie.link
        let anchor = document.createElement('a')
        anchor.href = '#'
        anchor.addEventListener('click', () =>{
            const data = { link: movieLink };
            

            fetch('http://localhost:8000/movie', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        })
        container.appendChild(anchor)
    
        let h1 = document.createElement('h3')
        h1.innerText = movie.title
        anchor.appendChild(h1) 
    
        let img = document.createElement('img')
        img.src = movie.image
        anchor.appendChild(img)
    })

}


  