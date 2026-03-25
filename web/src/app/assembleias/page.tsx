"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  Eye,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assembliesApi, Assembly } from "@/lib/api-client";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "secondary" }> = {
  Draft: { label: "Rascunho", variant: "secondary" },
  Scheduled: { label: "Agendada", variant: "warning" },
  Completed: { label: "Realizada", variant: "success" },
  Cancelled: { label: "Cancelada", variant: "secondary" },
};

const typeConfig: Record<string, { label: string }> = {
  Ordinary: { label: "Ordinária" },
  Extraordinary: { label: "Extraordinária" },
};

export default function AssembliesPage() {
  const [assemblies, setAssemblies] = useState<Assembly[]>([]);
  const [filteredAssemblies, setFilteredAssemblies] = useState<Assembly[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssemblies() {
      try {
        setLoading(true);
        const data = await assembliesApi.getAll();
        setAssemblies(data);
        setFilteredAssemblies(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch assemblies:", err);
        setError("Erro ao carregar assembleias. A usar dados de demonstração.");
        const demoData: Assembly[] = [
          { id: "1", title: "Assembleia Ordinária 2024", assemblyDate: new Date().toISOString(), type: "Ordinary", status: "Completed", condominiumName: "Parque das Flores", decisionCount: 5, objectiveCount: 3, createdAt: new Date().toISOString() },
          { id: "2", title: "Assembleia Extraordinária - Elevadores", assemblyDate: new Date().toISOString(), type: "Extraordinary", status: "Scheduled", condominiumName: "Vista Mar", decisionCount: 2, objectiveCount: 2, createdAt: new Date().toISOString() },
          { id: "3", title: "Assembleia Ordinária 1º Trimestre", assemblyDate: new Date().toISOString(), type: "Ordinary", status: "Scheduled", condominiumName: "Solar Dourado", decisionCount: 0, objectiveCount: 0, createdAt: new Date().toISOString() },
        ];
        setAssemblies(demoData);
        setFilteredAssemblies(demoData);
      } finally {
        setLoading(false);
      }
    }
    fetchAssemblies();
  }, []);

  useEffect(() => {
    const filtered = assemblies.filter((assembly) => {
      const matchesSearch = 
        assembly.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assembly.condominiumName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || 
        (activeTab === "upcoming" && assembly.status === "Scheduled") ||
        (activeTab === "completed" && assembly.status === "Completed") ||
        (activeTab === "draft" && assembly.status === "Draft");
      return matchesSearch && matchesTab;
    });
    setFilteredAssemblies(filtered);
  }, [searchTerm, activeTab, assemblies]);

  const scheduledCount = assemblies.filter(a => a.status === "Scheduled").length;
  const completedCount = assemblies.filter(a => a.status === "Completed").length;
  const draftCount = assemblies.filter(a => a.status === "Draft").length;

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
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : assemblies.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agendadas</CardDescription>
              <CardTitle className="text-3xl">{scheduledCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Realizadas</CardDescription>
              <CardTitle className="text-3xl">{completedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rascunhos</CardDescription>
              <CardTitle className="text-3xl">{draftCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters and Tabs */}
        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Todas ({assemblies.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Agendadas ({scheduledCount})</TabsTrigger>
              <TabsTrigger value="completed">Realizadas ({completedCount})</TabsTrigger>
              <TabsTrigger value="draft">Rascunhos ({draftCount})</TabsTrigger>
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : filteredAssemblies.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma assembleia encontrada</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredAssemblies.map((assembly) => {
                  const status = statusConfig[assembly.status] || statusConfig.Draft;
                  const type = typeConfig[assembly.type] || { label: assembly.type };
                  
                  return (
                    <div key={assembly.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            assembly.status === "Completed" ? "bg-emerald-100" :
                            assembly.status === "Scheduled" ? "bg-amber-100" : "bg-slate-100"
                          }`}>
                            <FileText className={`w-6 h-6 ${
                              assembly.status === "Completed" ? "text-emerald-600" :
                              assembly.status === "Scheduled" ? "text-amber-600" : "text-slate-400"
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
                                {assembly.condominiumName}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(assembly.assemblyDate).toLocaleDateString("pt-PT")}
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {assembly.decisionCount} decisões
                              </div>
                              <div className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {assembly.objectiveCount} objetivos
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
        )}
      </main>
    </div>
  );
}
