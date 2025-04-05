
import { z } from "zod";

// Schéma de validation pour le formulaire d'événement
export const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères"),
  description: z.string().optional(),
  location: z.string().min(3, "La localisation est requise"),
  start_date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Date de début invalide"
  }),
  end_date: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Date de fin invalide"
  }),
  status: z.enum(["draft", "published", "cancelled"]),
  image_url: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
