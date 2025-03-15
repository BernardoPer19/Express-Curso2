import {
  validateMovie,
  validatePartialMovie,
} from "../schema/movies-schema.js";

export class MovieController {
  constructor({ MovieModel }) {
    this.MovieModel = MovieModel;
  }

  getAll = async (req, res) => {
    try {
      // const { genre } = req.query;
      const movies = await this.MovieModel.getAll();
      res.json(movies);
    } catch (error) {
      console.error("Error en getAll:", error.message);
      res.status(500).json({
        message: "Error al obtener películas acaaa",
        error: error.message,
      });
    }
  };
  
  getByID = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await this.MovieModel.getByID({ id });

      if (!movie) {
        return res.status(404).json({ message: "Película no encontrada" });
      }

      res.json(movie); // Retorna la película
    } catch (error) {
      console.error("Error en getByID:", error.message);
      res.status(500).json({
        message: "Error al obtener la película",
        error: error.message,
      });
    }
  };

  createMovie = async (req, res) => {
    try {
      const result = validateMovie(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: result.error.errors, 
        });
      }
      const newMovie = await this.MovieModel.createMovie({
        input: result.data,
      });
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error("Error en createMovie:", error.message);
      res.status(500).json({
        message: "Error al crear la película",
        error: error.message,
      });
    }
  };
  updateMovie = async (req, res) => {
    const { id } = req.params;
    try {
      const result = validatePartialMovie(req.body);

      if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
      }

      const updatedMovie = await this.MovieModel.updateMovie(id, result.data);
      if (!updatedMovie) {
        return res.status(404).json({ message: "Película no encontrada" });
      }

      res.json(updatedMovie); 
    } catch (error) {
      console.error("Error en updateMovie:", error.message);
      res.status(500).json({
        message: "Error al actualizar la película",
        error: error.message,
      });
    }
  };
   deleteMovie = async (req, res)  => {
    const { id } = req.params;
    try {
      const result = await this.MovieModel.deleteMovie(id);

      if (!result) {
        return res.status(404).json({ message: "Película no encontrada" });
      }

      res.status(204).send(); 
    } catch (error) {
      console.error("Error en deleteMovie:", error.message);
      res.status(500).json({
        message: "Error al eliminar la película",
        error: error.message,
      });
    }
  }
}
