
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema
const personalInfoSchema = z.object({
  firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Format d'email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(5, { message: "Adresse trop courte" }),
  zip: z.string().min(5, { message: "Code postal invalide" }),
  city: z.string().min(2, { message: "Ville invalide" }),
  license: z.string().min(1, { message: "Numéro de licence requis" }),
  experience: z.string(),
  copilot: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const PersonalInfoStep = ({ onDataChange }: { onDataChange?: (data: PersonalInfoFormValues) => void }) => {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      license: "",
      experience: "beginner",
      copilot: "",
    },
  });

  // Update parent component when form values change
  const handleFormChange = (values: PersonalInfoFormValues) => {
    if (onDataChange) {
      onDataChange(values);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Veuillez saisir vos informations de pilote
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onChange={form.handleSubmit(handleFormChange)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Votre prénom" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Votre nom" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="votre@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+33 6 XX XX XX XX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Votre adresse" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Code postal" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ville" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de licence</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Numéro de licence FFSA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expérience en rallye</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau d'expérience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Débutant (0-2 rallyes)</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire (3-10 rallyes)</SelectItem>
                      <SelectItem value="experienced">Expérimenté (11-20 rallyes)</SelectItem>
                      <SelectItem value="professional">Professionnel (20+ rallyes)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="copilot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations du copilote (optionnel)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nom et prénom du copilote" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default PersonalInfoStep;
