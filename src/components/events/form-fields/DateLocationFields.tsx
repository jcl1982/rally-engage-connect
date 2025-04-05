
import React from "react";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormValues } from "../utils/eventSchema";

interface DateLocationFieldsProps {
  control: Control<EventFormValues>;
}

const DateLocationFields: React.FC<DateLocationFieldsProps> = ({ control }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
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
          control={control}
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
        control={control}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="total_distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance totale</FormLabel>
              <FormControl>
                <Input placeholder="250 km" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="entry_fee"
          render={({ field: { onChange, ...field }}) => (
            <FormItem>
              <FormLabel>Frais d'inscription</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="150" 
                  {...field} 
                  value={field.value === undefined ? "" : field.value}
                  onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="max_participants"
        render={({ field: { onChange, ...field }}) => (
          <FormItem>
            <FormLabel>Nombre maximum de participants</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="100" 
                {...field}
                value={field.value === undefined ? "" : field.value}
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DateLocationFields;
