
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
  onEventDeleted: () => void;
}

const DeleteEventDialog = ({ open, onOpenChange, event, onEventDeleted }: DeleteEventDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!event) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // Use type assertion to tell TypeScript this is valid
      const { error } = await supabase
        .from("events" as any)
        .delete()
        .eq("id", event.id);

      if (error) throw error;
      
      toast.success("Événement supprimé avec succès");
      onEventDeleted();
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      setError(error.message || "Une erreur est survenue lors de la suppression");
      toast.error("Erreur lors de la suppression de l'événement");
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer l'événement</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="font-medium">{event?.title}</p>
          <p className="text-muted-foreground text-sm mt-1">{event?.location}</p>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Annuler
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
