const genres = [
    { name: "Documentary", imgUrl: "genre_img/1Documentary.jpg" },
    { name: "IMAX", imgUrl: "genre_img/2IMAX.jpg" },
    { name: "Mystery", imgUrl: "genre_img/3Mystery.jpg" },
    { name: "Musical", imgUrl: "genre_img/4Musical.jpg" },
    { name: "Drama", imgUrl: "genre_img/5Drama.jpg" },
    { name: "War", imgUrl: "genre_img/6War.jpg" },
    { name: "Comedy", imgUrl: "genre_img/7Comedy.avif" },
    { name: "Film-Noir", imgUrl: "genre_img/8Film-Noir.jpg" },
    { name: "Animation", imgUrl: "genre_img/9Animation.jpg" },
    { name: "Crime", imgUrl: "genre_img/10Crime.jpg" },
    { name: "Action", imgUrl: "genre_img/11Action.jpg" },
    { name: "Thriller", imgUrl: "genre_img/12Thriller.jpg" },
    { name: "Sci-Fi", imgUrl: "genre_img/13Sci-fi.jpg" },
    { name: "Romance", imgUrl: "genre_img/14Romance.webp" },
    { name: "Children", imgUrl: "genre_img/15Children.jpg" },
    { name: "Adventure", imgUrl: "genre_img/16Adventure.jpg" },
    { name: "Horror", imgUrl: "genre_img/17Horror.jpg" },
    { name: "Fantasy", imgUrl: "genre_img/18Fantasy.webp" },
    { name: "Western", imgUrl: "genre_img/19Western.jpg" }
];

const gridContainer = document.getElementById("genre-grid");

genres.forEach(genre => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = genre.imgUrl || "https://via.placeholder.com/150"; // Placeholder image URL if no URL is specified
    img.alt = genre.name;

    const title = document.createElement("h3");
    title.textContent = genre.name;

    
    card.appendChild(img);
    card.appendChild(title);

    // Add event listener to each genre card
    card.addEventListener('click', function() {
        // Navigate to related_movies.html with genre as a query parameter
        window.location.href = `related_movies.html?genre=${genre.name}`;
    });

    gridContainer.appendChild(card);
});
