"use client";

import { useState, useEffect } from "react";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Pause,
  ChevronRight,
  Building2,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { objectivesApi, Objective } from "@/lib/api-client";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" | "secondary"; icon: React.ElementType }> = {
  Draft: { label: "Rascunho", variant: "secondary", icon: Clock },
  Planned: { label: "Planeado", variant: "secondary", icon: Calendar },
  InProgress: { label: "Em Progresso", variant: "default", icon: Clock },
  WaitingExternal: { label: "Aguarda Externo", variant: "warning", icon: Pause },
  Blocked: { label: "Bloqueado", variant: "destructive", icon: AlertCircle },
  Completed: { label: "Concluído", variant: "success", icon: CheckCircle2 },
  Cancelled: { label: "Cancelado", variant: "secondary", icon: AlertCircle },
};

const priorityConfig: Record<string, { label: string; variant: "default" | "destructive" | "warning" }> = {
  Low: { label: "Baixa", variant: "default" },
  Medium: { label: "Média", variant: "warning" },
  High: { label: "Alta", variant: "warning" },
  Critical: { label: "Crítica", variant: "destructive" },
};

export default function ObjectivesPage() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [filteredObjectives, setFilteredObjectives] = useState<Objective[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchObjectives() {
      try {
        setLoading(true);
        const data = await objectivesApi.getAll();
        setObjectives(data);
        setFilteredObjectives(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch objectives:", err);
        setError("Erro ao carregar objetivos. A usar dados de demonstração.");
        const demoData: Objective[] = [
          { id: "1", title: "Substituição portas de entrada", description: "Substituir 24 portas de entrada", status: "InProgress", priority: "High", condominiumName: "Parque das Flores", progress: 60, isPublic: true, createdAt: new Date().toISOString() },
          { id: "2", title: "Limpeza fachadas", description: "Contratar serviço de limpeza", status: "InProgress", priority: "Medium", condominiumName: "Vista Mar", progress: 30, isPublic: true, createdAt: new Date().toISOString() },
          { id: "3", title: "Reparação elevador", description: "Reparação do elevador", status: "Blocked", priority: "Critical", condominiumName: "Solar Dourado", progress: 20, isPublic: true, createdAt: new Date().toISOString() },
        ];
        setObjectives(demoData);
        setFilteredObjectives(demoData);
      } finally {
        setLoading(false);
      }
    }
    fetchObjectives();
  }, []);

  useEffect(() => {
    const filtered = objectives.filter((obj) => {
      const matchesSearch = 
        obj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.condominiumName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || 
        (activeTab === "active" && !["Completed", "Cancelled"].includes(obj.status)) ||
        (activeTab === "completed" && obj.status === "Completed") ||
        (activeTab === "blocked" && obj.status === "Blocked");
      return matchesSearch && matchesTab;
    });
    setFilteredObjectives(filtered);
  }, [searchTerm, activeTab, objectives]);

  const activeCount = objectives.filter(o => !["Completed", "Cancelled"].includes(o.status)).length;
  const blockedCount = objectives.filter(o => o.status === "Blocked").length;
  const completedCount = objectives.filter(o => o.status === "Completed").length;

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
              <p className="text-xs text-slate-500">{objectives.length} objetivos</p>
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
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        {/* Filters and Tabs */}
        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todos ({objectives.length})</TabsTrigger>
              <TabsTrigger value="active">Em Progresso ({activeCount})</TabsTrigger>
              <TabsTrigger value="blocked">Bloqueados ({blockedCount})</TabsTrigger>
              <TabsTrigger value="completed">Concluídos ({completedCount})</TabsTrigger>
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : filteredObjectives.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum objetivo encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredObjectives.map((objective) => {
              const status = statusConfig[objective.status] || statusConfig.Draft;
              const priority = priorityConfig[objective.priority] || priorityConfig.Medium;
              const StatusIcon = status.icon;
              const isOverdue = objective.targetDate && new Date(objective.targetDate) < new Date() && objective.status !== "Completed";

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
                      {objective.condominiumName}
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
                      {objective.targetDate && (
                        <div className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-600" : "text-slate-500"}`}>
                          <Calendar className="w-3 h-3" />
                          {new Date(objective.targetDate).toLocaleDateString("pt-PT")}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
