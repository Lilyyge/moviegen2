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

    genres.forEach((genre) => {
      const card = document.createElement("li");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = genre.imgUrl || "https://via.placeholder.com/150";
      img.alt = genre.name;

      const h3 = document.createElement("h3");
      h3.textContent = genre.name;

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



// Initial display
displayGenres();
createPaginationButtons();


