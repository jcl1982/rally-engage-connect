
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
  difficulty_level: z.string().optional(),
  event_type: z.string().optional(),
  total_distance: z.string().optional(),
  entry_fee: z.number().optional(),
  max_participants: z.number().optional(),
  contact_email: z.string().email("Email invalide").optional(),
  contact_phone: z.string().optional(),
  regulations_url: z.string().url("URL invalide").optional().or(z.literal("")),
});

export type EventFormValues = z.infer<typeof eventSchema>;
