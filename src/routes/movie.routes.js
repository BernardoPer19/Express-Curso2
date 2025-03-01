import { Router } from "express";
import { MovieController } from "../controllers/ControllersMovies.js";

export const movieRouter = Router();

movieRouter.get("/", MovieController.getAll);
movieRouter.get("/:id", MovieController.getByID);
movieRouter.post("/", MovieController.createMovie);
movieRouter.patch("/:id", MovieController.updateMovie);
movieRouter.delete("/:id", MovieController.deleteMovie);
