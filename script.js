document.addEventListener("DOMContentLoaded", function () {
  const moviesPerPage = 6; // Number of movies per page
  const genres = [
    { name: "Documentary", imgUrl: "genre_img/1Documentary.jpg" },
    { name: "IMAX", imgUrl: "genre_img/2IMAX.jpg" },
    { name: "Mystery", imgUrl: "genre_img/3Mystery.jpg" },
    { name: "Musical", imgUrl: "genre_img/4Musical.jpg" },
    { name: "Drama", imgUrl: "genre_img/5Drama.jpg" },
  ];

  const movieContainer = document.getElementById("movieContainer");
  const pagination = document.getElementById("pagination");
  const viewMoreButton = document.getElementById("viewMoreGenres");

  function displayGenres() {
    movieContainer.innerHTML = ""; // Clear previous content

    moviesData.forEach((movie) => {
      const card = document.createElement("li");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = movie.imgUrl || "https://via.placeholder.com/150";
      img.alt = movie.name;

      const h3 = document.createElement("h3");
      h3.textContent = movie.name;

      card.appendChild(img);
      card.appendChild(h3);

      movieContainer.appendChild(card);
    });
  }

  viewMoreButton.addEventListener("click", function (event) {
    // Navigate to more_genres.html
    window.location.href = "more_genres.html";
  });
});

function createPaginationButtons() {
  pagination.innerHTML = "";
  const numPages = Math.ceil(moviesData.length / moviesPerPage);
  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", function () {
      displayMovies(i);
    });
    pagination.appendChild(button);
  }
}

// Initial display
displayGenres();
createPaginationButtons();


