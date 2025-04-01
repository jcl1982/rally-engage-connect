
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2 } from "lucide-react";

const EventStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    upcoming: {
      label: "À venir",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    ongoing: {
      label: "En cours",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    completed: {
      label: "Terminé",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
    registration: {
      label: "Inscriptions ouvertes",
      className: "bg-rally-orange/20 text-rally-orange border-rally-orange/30",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

interface EventHeaderProps {
  title: string;
  status: string;
  imageSrc: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({ title, status, imageSrc }) => {
  return (
    <div 
      className="h-64 md:h-96 relative flex items-end"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-rally-dark/80 to-transparent" />
      <div className="container relative z-10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <EventStatusBadge status={status} />
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
              <Heart className="h-4 w-4 mr-1" />
              <span>Favoris</span>
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
              <Share2 className="h-4 w-4 mr-1" />
              <span>Partager</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
