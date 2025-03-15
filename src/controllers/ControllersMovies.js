import { MovieModel } from "../PostgresSQL/Postgress.js";
import {
  validateMovie,
  validatePartialMovie,
} from "../schema/movies-schema.js";

export class MovieController {
  static async getAll(req, res) {
    try {
      // const { genre } = req.query;
      const movies = await MovieModel.getAll();
      res.json(movies);
    } catch (error) {
      console.error("Error en getAll:", error.message);
      res.status(500).json({
        message: "Error al obtener películas acaaa",
        error: error.message,
      });
    }
  }

  // Obtener una película por su ID
  static async getByID(req, res) {
    const { id } = req.params;
    try {
      const movie = await MovieModel.getByID({ id });

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
  }

  static async createMovie(req, res) {
    try {
      // Validación de los datos de la película
      const result = validateMovie(req.body);
  
      // Si la validación falla, retorna los errores
      if (!result.success) {
        return res.status(400).json({
          error: result.error.errors,  // Aquí retornamos los errores directamente
        });
      }
  
      // Crear la nueva película usando el modelo
      const newMovie = await MovieModel.createMovie({ input: result.data });
  
      return res.status(201).json(newMovie);
    } catch (error) {
      console.error("Error en createMovie:", error.message);
      res.status(500).json({
        message: "Error al crear la película",
        error: error.message,
      });
    }
  }
  
  
  // Actualizar una película por su ID
  static async updateMovie(req, res) {
    const { id } = req.params;
    try {
      const result = validatePartialMovie(req.body);

      if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
      }

      const updatedMovie = await MovieModel.updateMovie(id, result.data);
      if (!updatedMovie) {
        return res.status(404).json({ message: "Película no encontrada" });
      }

      res.json(updatedMovie); // Retorna la película actualizada
    } catch (error) {
      console.error("Error en updateMovie:", error.message);
      res.status(500).json({
        message: "Error al actualizar la película",
        error: error.message,
      });
    }
  }

  // Eliminar una película por su ID
  static async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      const result = await MovieModel.deleteMovie(id);

      if (!result) {
        return res.status(404).json({ message: "Película no encontrada" });
      }

      res.status(204).send(); // Respuesta con código 204 (sin contenido)
    } catch (error) {
      console.error("Error en deleteMovie:", error.message);
      res.status(500).json({
        message: "Error al eliminar la película",
        error: error.message,
      });
    }
  }
}
