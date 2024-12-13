let data = [];

fetch('movies.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(fetchedData => {
    data = fetchedData;

    console.log('Data fetched from JSON file:', data);

    const movieListDiv = document.getElementById('movie-ratings');

    const titleList = document.createElement('ul');
    data.forEach((record, index) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = "#";
      link.textContent = record.title;
      link.onclick = () => displayMovieDetails(index);
      listItem.appendChild(link);
      titleList.appendChild(listItem);
    });

    movieListDiv.appendChild(titleList);

    const detailsDiv = document.createElement('div');
    detailsDiv.id = 'movie-details';
    movieListDiv.appendChild(detailsDiv);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

// Function to display movie details when a title is clicked
function displayMovieDetails(index) {
  const movie = data[index];
  const detailsDiv = document.getElementById('movie-details');

  // Convert availability to "Yes" or "No"
  const availability = movie.isAvailableForStreaming ? "Yes" : "No";

  // Update the content of the details div
  detailsDiv.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Director:</strong> ${movie.director}</p>
    <p><strong>Year:</strong> ${movie.releaseYear}</p>
    <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
    <p><strong>Available for Streaming:</strong> ${availability}</p>
    <p><strong>Rating:</strong> ${movie.rating.averageRating}</p>
    <p><strong>Votes:</strong> ${movie.rating.votes}</p>
  `;
}

// Function to display the top 3 movies by rating
function displayTop3Movies(movies) {
  const sortedMovies = movies.sort((a, b) => b.rating.averageRating - a.rating.averageRating).slice(0, 3);
  displayMovies(sortedMovies, 'Top 3 Rated Movies');
}

// Function to display the oldest movie
function displayOldestMovie(movies) {
  const oldestMovie = movies.reduce((oldest, current) => (current.releaseYear < oldest.releaseYear ? current : oldest));
  displayMovies([oldestMovie], 'Oldest Movie');
}

// Function to display the newest movie
function displayNewestMovie(movies) {
  const newestMovie = movies.reduce((newest, current) => (current.releaseYear > newest.releaseYear ? current : newest));
  displayMovies([newestMovie], 'Newest Movie');
}

function displayMovies(movies, title) {
  const outputDiv = document.getElementById('movie-ratings');
  outputDiv.innerHTML = `<h2>${title}</h2>`;
  const movieList = document.createElement('ul');
  
  movies.forEach(movie => {
    const availability = movie.isAvailableForStreaming ? "Yes" : "No";
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Rating:</strong> ${movie.rating.averageRating}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Year:</strong> ${movie.releaseYear}</p>
      <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
      <p><strong>Available for Streaming:</strong> ${availability}</p>
    `;
    movieList.appendChild(listItem);
  });

  outputDiv.appendChild(movieList);
}