import { pool } from "../db/db.js";

export class MovieModel {
  // Obtener todas las películas
  static async getAll() {
    try {
      const { rows } = await pool.query("SELECT * FROM movies");
      return rows;
    } catch (error) {
      console.error("Error en getAll:", error.stack);
      throw error;
    }
  }

  // Obtener una película por ID
  static async getByID(id) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM movies WHERE movie_id = $1",
        [id]
      );
      if (rows.length === 0) throw new Error("Película no encontrada");
      return rows[0];
    } catch (error) {
      console.error("Error en getByID:", error.stack);
      throw error;
    }
  }

  static async createMovie({ input }) {
    try {
      const { title, year, duration, director, rate, poster } = input;

      const { rows } = await pool.query(
        "INSERT INTO movies (title, year, duration, director, rate, poster) VALUES ($1, $2, $3, $4, $5, $6) RETURNING title, year, duration, director, rate, poster",
        [title, year, duration, director, rate, poster]
      );

      return rows[0];
    } catch (error) {
      console.error("Error en createMovie:", error.stack);
      throw error;
    }
  }

  // Eliminar una película
  static async deleteMovie(id) {
    try {
      const { rows } = await pool.query(
        "DELETE FROM public.movies WHERE movie_id = $1 RETURNING movie_id",
        [id]
      );
      if (rows.length === 0) throw new Error("Película no encontrada");
      return { message: `Película con ID ${id} eliminada correctamente` };
    } catch (error) {
      console.error("Error en deleteMovie:", error.stack);
      throw error;
    }
  }

  // Actualizar una película
  static async updateMovie(id, { title, genre }) {
    try {
      const { rows } = await pool.query(
        "UPDATE public.movies SET title = $1, genre = $2 WHERE movie_id = $3 RETURNING movie_id, title, genre",
        [title, genre, id]
      );
      if (rows.length === 0) throw new Error("Película no encontrada");
      return rows[0];
    } catch (error) {
      console.error("Error en updateMovie:", error.stack);
      throw error;
    }
  }   




   //AAAAAA
}
