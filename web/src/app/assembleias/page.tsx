"use client";

import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for assemblies
const mockAssemblies = [
  {
    id: "1",
    title: "Assembleia Ordinária 2024",
    condominium: "Parque das Flores",
    date: "2024-03-15",
    type: "ordinary",
    status: "completed",
    decisions: 5,
    objectives: 3,
    documents: 2,
  },
  {
    id: "2",
    title: "Assembleia Extraordinária - Elevadores",
    condominium: "Vista Mar",
    date: "2024-03-20",
    type: "extraordinary",
    status: "completed",
    decisions: 2,
    objectives: 2,
    documents: 4,
  },
  {
    id: "3",
    title: "Assembleia Ordinária 1º Trimestre",
    condominium: "Residencial Soleil",
    date: "2024-03-28",
    type: "ordinary",
    status: "scheduled",
    decisions: 0,
    objectives: 0,
    documents: 1,
  },
  {
    id: "4",
    title: "Assembleia Ordinária 2024",
    condominium: "Prédio Central",
    date: "2024-02-10",
    type: "ordinary",
    status: "completed",
    decisions: 4,
    objectives: 2,
    documents: 3,
  },
  {
    id: "5",
    title: "Assembleia Extraordinária - Urgente",
    condominium: "Parque das Flores",
    date: "2024-04-05",
    type: "extraordinary",
    status: "draft",
    decisions: 0,
    objectives: 0,
    documents: 0,
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "secondary" }> = {
  draft: { label: "Rascunho", variant: "secondary" },
  scheduled: { label: "Agendada", variant: "warning" },
  completed: { label: "Realizada", variant: "success" },
  cancelled: { label: "Cancelada", variant: "secondary" },
};

const typeConfig: Record<string, { label: string }> = {
  ordinary: { label: "Ordinária" },
  extraordinary: { label: "Extraordinária" },
};

export default function AssembliesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAssemblies = mockAssemblies.filter((assembly) => {
    const matchesSearch = 
      assembly.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assembly.condominium.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "upcoming" && assembly.status === "scheduled") ||
      (activeTab === "completed" && assembly.status === "completed") ||
      (activeTab === "draft" && assembly.status === "draft");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              ←
            </Button>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Assembleias</h1>
              <p className="text-xs text-slate-500">Gestão de assembleias e decisões</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Assembleia
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{mockAssemblies.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agendadas</CardDescription>
              <CardTitle className="text-3xl">{mockAssemblies.filter(a => a.status === "scheduled").length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Realizadas</CardDescription>
              <CardTitle className="text-3xl">{mockAssemblies.filter(a => a.status === "completed").length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Objetivos Gerados</CardDescription>
              <CardTitle className="text-3xl">{mockAssemblies.reduce((acc, a) => acc + a.objectives, 0)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todas ({mockAssemblies.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Agendadas ({mockAssemblies.filter(a => a.status === "scheduled").length})</TabsTrigger>
              <TabsTrigger value="completed">Realizadas ({mockAssemblies.filter(a => a.status === "completed").length})</TabsTrigger>
              <TabsTrigger value="draft">Rascunhos ({mockAssemblies.filter(a => a.status === "draft").length})</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Pesquisar assembleias..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Assemblies List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredAssemblies.map((assembly) => {
                const status = statusConfig[assembly.status];
                const type = typeConfig[assembly.type];
                
                return (
                  <div key={assembly.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          assembly.status === "completed" ? "bg-emerald-100" :
                          assembly.status === "scheduled" ? "bg-amber-100" : "bg-slate-100"
                        }`}>
                          <FileText className={`w-6 h-6 ${
                            assembly.status === "completed" ? "text-emerald-600" :
                            assembly.status === "scheduled" ? "text-amber-600" : "text-slate-400"
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{assembly.title}</h3>
                            <Badge variant={status.variant}>{status.label}</Badge>
                            <Badge variant="outline">{type.label}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {assembly.condominium}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(assembly.date).toLocaleDateString("pt-PT")}
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {assembly.decisions} decisões
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {assembly.objectives} objetivos
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
