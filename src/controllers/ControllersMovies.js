import { MovieModel } from "../model/movieModels.js";
import {
  validateMovie,
  validatePartialMovie,
} from "../schema/movies-schema.js";



export class MovieController {
  static async getAll(req, res) {
    try {
      const { genre } = req.query;
      const movies = await MovieModel.getAll({ genre });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByID(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getByID({ id });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  }

  static async createMovie(req, res) {
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const newMovie = await MovieModel.createMovie(result.data);
    res.status(201).json(newMovie);
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const updatedMovie = await MovieModel.updateMovie(id, result.data);
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;
    const result = await MovieModel.deleteMovie(id);

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
  }
}
