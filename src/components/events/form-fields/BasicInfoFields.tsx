
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventFormValues } from "../utils/eventSchema";

interface BasicInfoFieldsProps {
  control: Control<EventFormValues>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Description détaillée de l'événement..." 
                className="min-h-[100px]" 
                {...field} 
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d'événement</FormLabel>
              <FormControl>
                <Input placeholder="Rallye routier" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="difficulty_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de difficulté</FormLabel>
              <FormControl>
                <Input placeholder="Intermédiaire" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
