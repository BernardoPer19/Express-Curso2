import { randomUUID } from "crypto";
import { readJSON } from "../utils/readJSON.js";

const movies = await readJSON("../movies.json");

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getByID({ id }) {
    return movies.find((mov) => mov.id === id);
  }

  static async createMovie(input) {
    const newMovie = { id: randomUUID(), ...input };
    movies.push(newMovie);
    return newMovie;
  }

  static async deleteMovie(id) {
    const movieIndex = movies.findIndex((mov) => mov.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async updateMovie(id, input) {
    const movieIndex = movies.findIndex((mov) => mov.id === id);
    if (movieIndex === -1) return null;

    movies[movieIndex] = { ...movies[movieIndex], ...input };
    return movies[movieIndex];
  }
}
