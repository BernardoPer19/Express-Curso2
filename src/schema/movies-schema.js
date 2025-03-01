import z from "zod";

const genresEnum = z.enum(["Action", "Adventure", "Comedy", "Drama", "Romance"]);

export const movieSchema = z.object({
  title: z.string().min(1, "Movie title is required"),
  year: z.number().int().min(1850).max(2025),
  director: z.string().optional(),
  rate: z.number().min(1).max(10).optional(),
  poster: z.string().url(),
  genre: z.array(genresEnum).nonempty("At least one genre is required"),
});

export const validateMovie = (obj) => movieSchema.safeParse(obj);

export const validatePartialMovie = (obj) => movieSchema.partial().safeParse(obj);
