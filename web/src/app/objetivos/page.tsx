"use client";

import { useState } from "react";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Pause,
  ChevronRight,
  Building2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for objectives
const mockObjectives = [
  {
    id: "1",
    title: "Substituição portas de entrada",
    description: "Substituir 24 portas de entrada do prédio",
    condominium: "Parque das Flores",
    assembly: "Assembleia 2024-03-15",
    status: "in_progress",
    priority: "high",
    owner: "Maria Silva",
    deadline: "2024-04-30",
    progress: 60,
    updates: 3,
  },
  {
    id: "2",
    title: "Limpeza fachadas",
    description: "Contratar serviço de limpeza de fachadas",
    condominium: "Vista Mar",
    assembly: "Assembleia 2024-02-20",
    status: "waiting_external",
    priority: "medium",
    owner: "João Costa",
    deadline: "2024-05-15",
    progress: 30,
    updates: 2,
  },
  {
    id: "3",
    title: "Reparação elevador",
    description: "Reparação do elevador do bloco B",
    condominium: "Residencial Soleil",
    assembly: "Assembleia 2024-01-10",
    status: "blocked",
    priority: "critical",
    owner: "Pedro Santos",
    deadline: "2024-03-20",
    progress: 20,
    updates: 5,
  },
  {
    id: "4",
    title: "Instalação câmaras segurança",
    description: "Instalar sistema de CCTV no rés-do-chão",
    condominium: "Prédio Central",
    assembly: "Assembleia 2024-03-15",
    status: "planned",
    priority: "medium",
    owner: "Ana Rodrigues",
    deadline: "2024-06-01",
    progress: 0,
    updates: 1,
  },
  {
    id: "5",
    title: "Pintura hall entrada",
    description: "Renovar pintura do hall de entrada",
    condominium: "Parque das Flores",
    assembly: "Assembleia 2024-02-20",
    status: "completed",
    priority: "low",
    owner: "Maria Silva",
    deadline: "2024-03-10",
    progress: 100,
    updates: 4,
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" | "secondary"; icon: React.ElementType }> = {
  draft: { label: "Rascunho", variant: "secondary", icon: Clock },
  planned: { label: "Planeado", variant: "secondary", icon: Calendar },
  in_progress: { label: "Em Progresso", variant: "default", icon: Clock },
  waiting_external: { label: "Aguarda Externo", variant: "warning", icon: Pause },
  blocked: { label: "Bloqueado", variant: "destructive", icon: AlertCircle },
  completed: { label: "Concluído", variant: "success", icon: CheckCircle2 },
  cancelled: { label: "Cancelado", variant: "secondary", icon: AlertCircle },
};

const priorityConfig: Record<string, { label: string; variant: "default" | "destructive" | "warning" }> = {
  low: { label: "Baixa", variant: "default" },
  medium: { label: "Média", variant: "warning" },
  high: { label: "Alta", variant: "warning" },
  critical: { label: "Crítica", variant: "destructive" },
};

export default function ObjectivesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredObjectives = mockObjectives.filter((obj) => {
    const matchesSearch = 
      obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obj.condominium.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "active" && !["completed", "cancelled"].includes(obj.status)) ||
      (activeTab === "completed" && obj.status === "completed") ||
      (activeTab === "blocked" && obj.status === "blocked");
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
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Objetivos Operacionais</h1>
              <p className="text-xs text-slate-500">24 objetivos ativos</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Objetivo
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters and Tabs */}
        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todos (24)</TabsTrigger>
              <TabsTrigger value="active">Em Progresso (19)</TabsTrigger>
              <TabsTrigger value="blocked">Bloqueados (3)</TabsTrigger>
              <TabsTrigger value="completed">Concluídos (5)</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Pesquisar objetivos..."
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

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredObjectives.map((objective) => {
            const status = statusConfig[objective.status];
            const priority = priorityConfig[objective.priority];
            const StatusIcon = status.icon;
            const isOverdue = new Date(objective.deadline) < new Date() && objective.status !== "completed";

            return (
              <Card key={objective.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant={priority.variant as "default" | "destructive" | "warning"} className="mb-2">
                        {priority.label}
                      </Badge>
                      <CardTitle className="text-base">{objective.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{objective.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <Building2 className="w-3 h-3" />
                    {objective.condominium}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Progresso</span>
                      <span className="font-medium">{objective.progress}%</span>
                    </div>
                    <Progress value={objective.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Badge variant={status.variant}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-600" : "text-slate-500"}`}>
                      <Calendar className="w-3 h-3" />
                      {new Date(objective.deadline).toLocaleDateString("pt-PT")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
