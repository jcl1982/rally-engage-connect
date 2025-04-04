
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Schéma de validation pour le formulaire d'événement
const eventSchema = z.object({
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
  // Nouveaux champs pour les détails de l'épreuve - Correction du type pour max_participants et entry_fee
  max_participants: z.string().optional().transform(val => val === "" ? null : parseInt(val, 10)),
  entry_fee: z.string().optional().transform(val => val === "" ? null : parseFloat(val)),
  regulations_url: z.string().optional(),
  event_type: z.enum(["rally", "hillclimb", "circuit", "slalom", "other"]).optional(),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
  total_distance: z.string().optional(),
  contact_email: z.string().email("Email invalide").optional(),
  contact_phone: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
  onEventSaved: () => void;
}

const EventFormDialog = ({ open, onOpenChange, event, onEventSaved }: EventFormDialogProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Initialiser le formulaire avec react-hook-form et zod
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      status: "draft",
      image_url: "",
      max_participants: "",
      entry_fee: "",
      regulations_url: "",
      event_type: undefined,
      difficulty_level: undefined,
      total_distance: "",
      contact_email: "",
      contact_phone: "",
    },
  });

  // Mettre à jour les valeurs du formulaire lorsque l'événement change
  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      
      // Format YYYY-MM-DD pour les inputs de type date
      const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
      };

      form.reset({
        title: event.title,
        description: event.description || "",
        location: event.location,
        start_date: formatDateForInput(startDate),
        end_date: formatDateForInput(endDate),
        status: event.status,
        image_url: event.image_url || "",
        max_participants: event.max_participants !== null ? event.max_participants.toString() : "",
        entry_fee: event.entry_fee !== null ? event.entry_fee.toString() : "",
        regulations_url: event.regulations_url || "",
        event_type: event.event_type || undefined,
        difficulty_level: event.difficulty_level || undefined,
        total_distance: event.total_distance || "",
        contact_email: event.contact_email || "",
        contact_phone: event.contact_phone || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        location: "",
        start_date: "",
        end_date: "",
        status: "draft",
        image_url: "",
        max_participants: "",
        entry_fee: "",
        regulations_url: "",
        event_type: undefined,
        difficulty_level: undefined,
        total_distance: "",
        contact_email: "",
        contact_phone: "",
      });
    }
  }, [event, form]);

  const onSubmit = async (data: EventFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      const eventData = {
        title: data.title,
        description: data.description || null,
        location: data.location,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
        status: data.status,
        image_url: data.image_url || null,
        max_participants: data.max_participants,
        entry_fee: data.entry_fee,
        regulations_url: data.regulations_url || null,
        event_type: data.event_type || null,
        difficulty_level: data.difficulty_level || null,
        total_distance: data.total_distance || null,
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
      };

      if (event) {
        // Mise à jour d'un événement existant
        const { error } = await supabase
          .from("events" as any)
          .update(eventData as any)
          .eq("id", event.id);

        if (error) throw error;
      } else {
        // Création d'un nouvel événement
        const { error } = await supabase
          .from("events" as any)
          .insert({
            ...eventData,
            organizer_id: user.id,
          } as any);

        if (error) throw error;
      }

      toast.success(event ? "Événement mis à jour avec succès" : "Événement créé avec succès");
      onEventSaved();
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement de l'événement:", error);
      setError(error.message || "Une erreur est survenue");
      toast.error("Erreur lors de l'enregistrement de l'événement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Modifier l'événement" : "Créer un événement"}</DialogTitle>
          <DialogDescription>
            {event 
              ? "Modifiez les détails de votre événement ci-dessous." 
              : "Remplissez les détails pour créer un nouvel événement."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="basic">Infos de base</TabsTrigger>
                <TabsTrigger value="details">Détails de l'épreuve</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Rallye des Grandes Îles" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description détaillée de l'événement..." 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de fin</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Guadeloupe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="published">Publié</SelectItem>
                          <SelectItem value="cancelled">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="event_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'épreuve</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rally">Rallye</SelectItem>
                            <SelectItem value="hillclimb">Course de côte</SelectItem>
                            <SelectItem value="circuit">Circuit</SelectItem>
                            <SelectItem value="slalom">Slalom</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau de difficulté</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Débutant</SelectItem>
                            <SelectItem value="intermediate">Intermédiaire</SelectItem>
                            <SelectItem value="advanced">Avancé</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="max_participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre max. de participants</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="entry_fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frais d'inscription (€)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="150" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="total_distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance totale (km)</FormLabel>
                        <FormControl>
                          <Input placeholder="120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="regulations_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL du règlement</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/reglement.pdf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de contact</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@rallye.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone de contact</FormLabel>
                        <FormControl>
                          <Input placeholder="+590 123 456 789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-asag-red hover:bg-asag-red/90"
              >
                {isSubmitting ? "Enregistrement..." : event ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
