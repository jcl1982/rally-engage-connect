
import React from "react";

interface OverviewTabProps {
  event: {
    title: string;
    location: string;
    distance: string;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({ event }) => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">À propos de l'événement</h2>
        <p className="text-muted-foreground mb-6">
          Le {event.title} est un rallye emblématique qui se déroule dans la magnifique région de {event.location}. 
          Ce rallye propose un parcours exigeant à travers des paysages spectaculaires, combinant sections 
          techniques et portions rapides pour tester les compétences des pilotes.
        </p>
        <p className="text-muted-foreground mb-6">
          L'événement accueille aussi bien les pilotes amateurs que professionnels, avec différentes catégories 
          pour tous les niveaux. Ne manquez pas cette opportunité de participer à l'un des rallyes les plus 
          appréciés de la saison.
        </p>
        <h3 className="text-lg font-medium mb-3">Points forts :</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Plus de {event.distance} de parcours</li>
          <li>Passage par des sites historiques et points de vue exceptionnels</li>
          <li>Assistance technique disponible tout au long du parcours</li>
          <li>Cérémonie de remise des prix et dîner de gala</li>
        </ul>
      </div>
      
      <div className="p-6 bg-card rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Catégories</h2>
        <div className="space-y-4">
          <div className="p-4 bg-accent rounded-md border">
            <h3 className="font-medium mb-1">Catégorie Pro</h3>
            <p className="text-sm text-muted-foreground">Pour les pilotes expérimentés avec véhicules homologués FIA.</p>
          </div>
          <div className="p-4 bg-accent rounded-md border">
            <h3 className="font-medium mb-1">Catégorie Amateur</h3>
            <p className="text-sm text-muted-foreground">Pour les pilotes amateurs avec véhicules modifiés.</p>
          </div>
          <div className="p-4 bg-accent rounded-md border">
            <h3 className="font-medium mb-1">Catégorie Classique</h3>
            <p className="text-sm text-muted-foreground">Pour les véhicules historiques de plus de 30 ans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
