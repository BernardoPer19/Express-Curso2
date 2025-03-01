import express from "express";
import { movieRouter } from "./routes/movie.routes.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(corsMiddleware())

app.use("/movies", movieRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
