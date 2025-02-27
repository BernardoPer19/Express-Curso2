const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");
const { error } = require("node:console");
const { validateMovie } = require("./schema/movies-schema");
const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }

  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((mov) => mov.id === id);
  if (movie) {
    return res.json(movie);
  }
  res.status(400).json({ message: "movie no found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const res = validatePartialMovie(req.body);
  const movieIntex = movies.findIndex((mov) => mov.id == id);
  
  if (movieIntex == -1) {
    return res.status(404).json({ message: "no fount" });
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
