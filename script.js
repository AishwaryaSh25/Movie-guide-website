const searchForm =document.querySelector('form');
const movieContainer =document.querySelector('.movie-container');
const inputBox =document.querySelector('.inputBox');
// Function to fetch movie details using OMBD API
const getMovieInfo =async (movie)=>{
    try{
     const myAPIKey="514f8f9c";
     const url= `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
     const response =await fetch(url);
     if(!response.ok){
throw new error("Unable to fetch movie data.")
     }
     const data=await response.json();
     console.log(data);
     showMovieData(data);
}catch(error){
     showErrorMessage("No movie found!!!");
}
}
// Function to show movie data on screen
const showMovieData =(data)=>{
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');
    //  Use Destructuring assignment to extract prop from data objects
    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} =data;
    const movieElement=document.createElement('div');
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;
    const movieGenreElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieGenreElement.classList.add('movie-genre');
    Genre.split(",").forEach(element => {
        const p= document.createElement('p');
        p.innerText=element;
        movieGenreElement.appendChild(p);
     });
     movieElement.appendChild(movieGenreElement);

      movieElement.innerHTML +=`<p><strong>Released Date:</strong>${Released}</p>
                              <p><strong>Duration:</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>`;
                // Create div for movie poster 
    const moviePosterElement=document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`;
     movieContainer.appendChild(moviePosterElement);           
     movieContainer.appendChild(movieElement);           

}
const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}
// Function to handle form submission
const handleFormSubmission=(e)=>{
    e.preventDefault();
    const movieName =inputBox.value.trim();
    if(movieName!=''){
        showErrorMessage("Fetching movie information...");
        getMovieInfo(movieName);
    }
    else{
       showErrorMessage("Enter movie name to get movie information");
    }
}
// Adding event listener to search form
searchForm.addEventListener('submit',handleFormSubmission);
