const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().positive().min(1850).max(2025),
  director: z.string().optional(),
  rate: z.number().min(1).max(10).optional(),
  poster: z.string().url(),
  genre: z.array(
    z.enum(["Action", "Adventure", "Comedy", "Drama","Romance"]).optional()
  ),
});

const validateMovie = (obj) => movieSchema.safeParse(obj);

const validatePartialMovie =  (obj) => {
return movieSchema.partial().safeParse(obj)
}

module.exports = { validateMovie,validatePartialMovie };
