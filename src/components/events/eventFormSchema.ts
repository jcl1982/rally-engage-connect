
import { z } from "zod";

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
  max_participants: z.string().optional().transform(val => val === "" ? null : parseInt(val, 10)),
  entry_fee: z.string().optional().transform(val => val === "" ? null : parseFloat(val)),
  regulations_url: z.string().optional(),
  event_type: z.enum(["rally", "hillclimb", "circuit", "slalom", "other"]).optional(),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
  total_distance: z.string().optional(),
  contact_email: z.string().email("Email invalide").optional(),
  contact_phone: z.string().optional(),
});

export type EventFormValues = {
  title: string;
  description?: string;
  location: string;
  start_date: string;
  end_date: string;
  status: "draft" | "published" | "cancelled";
  image_url?: string;
  max_participants?: string;
  entry_fee?: string;
  regulations_url?: string;
  event_type?: "rally" | "hillclimb" | "circuit" | "slalom" | "other";
  difficulty_level?: "beginner" | "intermediate" | "advanced" | "expert";
  total_distance?: string;
  contact_email?: string;
  contact_phone?: string;
};

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  image_url: string | null;
  organizer_id: string;
  created_at: string;
  updated_at: string;
  max_participants?: number | null;
  entry_fee?: number | null;
  regulations_url?: string | null;
  event_type?: string | null;
  difficulty_level?: string | null;
  total_distance?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
}
