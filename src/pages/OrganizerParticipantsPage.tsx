
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileSpreadsheet, UserPlus } from "lucide-react";

const OrganizerParticipantsPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des participants</h1>
          <p className="text-muted-foreground">
            Suivez les inscriptions à vos événements
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-asag-red hover:bg-asag-red/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un participant
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Rechercher des participants</CardTitle>
          <CardDescription>Filtrez par nom, email ou événement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un participant..."
                className="pl-8"
              />
            </div>
            <Button type="submit">Rechercher</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Tous les participants</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="validated">Validés</TabsTrigger>
          <TabsTrigger value="rejected">Refusés</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="bg-white rounded-md border border-border p-6 text-center">
            <p>Cette fonctionnalité sera bientôt disponible.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Vous pourrez y gérer les inscriptions à vos événements.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <div className="bg-white rounded-md border border-border p-6 text-center">
            <p>Cette fonctionnalité sera bientôt disponible.</p>
          </div>
        </TabsContent>
        <TabsContent value="validated" className="mt-6">
          <div className="bg-white rounded-md border border-border p-6 text-center">
            <p>Cette fonctionnalité sera bientôt disponible.</p>
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <div className="bg-white rounded-md border border-border p-6 text-center">
            <p>Cette fonctionnalité sera bientôt disponible.</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrganizerParticipantsPage;
