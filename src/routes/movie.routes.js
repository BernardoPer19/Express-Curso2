import { Router } from "express";
import { MovieController } from "../controllers/ControllersMovies.js";

export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router();

  // Cambiar a MovieModel (con mayúscula) para que coincida con el controlador
  const movieController = new MovieController({ MovieModel: movieModel });

  movieRouter.get("/", movieController.getAll);
  movieRouter.get("/:id", movieController.getByID);
  movieRouter.post("/", movieController.createMovie);
  movieRouter.patch("/:id", movieController.updateMovie);

  return movieRouter;
};
