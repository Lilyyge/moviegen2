const genres = [
    { name: "Documentary", imgUrl: "genre_img/documentary.jpg" },
    { name: "IMAX", imgUrl: "genre_img/imax.jpg" },
    { name: "Mystery", imgUrl: "genre_img/mystery.jpg" },
    { name: "Musical", imgUrl: "genre_img/musical.jpg" },
    { name: "Drama", imgUrl: "genre_img/drama.jpg" },
    { name: "War", imgUrl: "genre_img/war.jpg" },
    { name: "Comedy", imgUrl: "genre_img/comedy.jpg" },
    { name: "Film-Noir", imgUrl: "genre_img/film_noir.png" },
    { name: "Animation", imgUrl: "genre_img/animation.jpg" },
    { name: "Crime", imgUrl: "genre_img/crime.jpg" },
    { name: "Action", imgUrl: "genre_img/action.jpg" },
    { name: "Thriller", imgUrl: "genre_img/thriller.jpg" },
    { name: "Sci-Fi", imgUrl: "genre_img/sci_fi.jpg" },
    { name: "Romance", imgUrl: "genre_img/romance.jpg" },
    { name: "Children", imgUrl: "genre_img/children.jpg" },
    { name: "Adventure", imgUrl: "genre_img/adventure.jpg" },
    { name: "Horror", imgUrl: "genre_img/horror.jpg" },
    { name: "Fantasy", imgUrl: "genre_img/fantasy.jpg" },
    { name: "Western", imgUrl: "genre_img/western.jpg" }
];

const gridContainer = document.getElementById("genre-grid");

genres.forEach(genre => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    // img.src = genre.imgUrl || "https://via.placeholder.com/150"; // Placeholder image URL if no URL is specified
    img.alt = genre.name;

    const title = document.createElement("h3");
    title.textContent = genre.name;

    const description = document.createElement("p");
    //description.textContent = "Description of " + genre.name + " genre";

    // card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);

    gridContainer.appendChild(card);
});
