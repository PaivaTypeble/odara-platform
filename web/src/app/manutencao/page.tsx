"use client";

import { useState } from "react";
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for assets
const mockAssets = [
  {
    id: "1",
    name: "Elevador Principal",
    category: "Elevadores",
    condominium: "Parque das Flores",
    status: "active",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-05-15",
    condition: "good",
  },
  {
    id: "2",
    name: "Elevador Bloco B",
    category: "Elevadores",
    condominium: "Residencial Soleil",
    status: "active",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-04-10",
    condition: "warning",
  },
  {
    id: "3",
    name: "Portão Garagem",
    category: "Automação",
    condominium: "Vista Mar",
    status: "active",
    lastMaintenance: "2024-03-01",
    nextMaintenance: "2024-06-01",
    condition: "good",
  },
  {
    id: "4",
    name: "CCTV Sistema",
    category: "Segurança",
    condominium: "Prédio Central",
    status: "inactive",
    lastMaintenance: "2023-12-01",
    nextMaintenance: "2024-03-01",
    condition: "critical",
  },
  {
    id: "5",
    name: "Bomba Água",
    category: "Infraestrutura",
    condominium: "Parque das Flores",
    status: "active",
    lastMaintenance: "2024-02-20",
    nextMaintenance: "2024-05-20",
    condition: "good",
  },
];

// Mock data for maintenance events
const mockEvents = [
  {
    id: "1",
    title: "Revisão Elevador Principal",
    asset: "Elevador Principal",
    condominium: "Parque das Flores",
    status: "scheduled",
    date: "2024-05-15",
    type: "preventive",
  },
  {
    id: "2",
    title: "Reparação Elevador Bloco B",
    asset: "Elevador Bloco B",
    condominium: "Residencial Soleil",
    status: "due",
    date: "2024-04-10",
    type: "corrective",
  },
  {
    id: "3",
    title: "Manutenção Portão Garagem",
    asset: "Portão Garagem",
    condominium: "Vista Mar",
    status: "scheduled",
    date: "2024-06-01",
    type: "preventive",
  },
  {
    id: "4",
    title: "Substituição Sistema CCTV",
    asset: "CCTV Sistema",
    condominium: "Prédio Central",
    status: "overdue",
    date: "2024-03-01",
    type: "corrective",
  },
];

const assetStatusConfig: Record<string, { label: string; variant: "success" | "secondary" | "destructive" }> = {
  active: { label: "Ativo", variant: "success" },
  inactive: { label: "Inativo", variant: "secondary" },
  removed: { label: "Removido", variant: "destructive" },
};

const conditionConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive"; icon: React.ElementType }> = {
  good: { label: "Bom", variant: "success", icon: CheckCircle2 },
  warning: { label: "Atenção", variant: "warning", icon: AlertTriangle },
  critical: { label: "Crítico", variant: "destructive", icon: AlertTriangle },
};

const eventStatusConfig: Record<string, { label: string; variant: "secondary" | "warning" | "success" | "destructive" }> = {
  scheduled: { label: "Agendada", variant: "secondary" },
  due: { label: "Devida", variant: "warning" },
  completed: { label: "Concluída", variant: "success" },
  overdue: { label: "Vencida", variant: "destructive" },
  cancelled: { label: "Cancelada", variant: "secondary" },
};

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("assets");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              ←
            </Button>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Manutenção</h1>
              <p className="text-xs text-slate-500">Ativos, planos e conformidade</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Alertas
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Ativo
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Ativos</CardDescription>
              <CardTitle className="text-3xl">{mockAssets.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Manutenções Vencidas</CardDescription>
              <CardTitle className="text-3xl text-red-600">
                {mockEvents.filter(e => e.status === "overdue").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agendadas</CardDescription>
              <CardTitle className="text-3xl">
                {mockEvents.filter(e => e.status === "scheduled" || e.status === "due").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Estado Crítico</CardDescription>
              <CardTitle className="text-3xl text-amber-600">
                {mockAssets.filter(a => a.condition === "critical").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="assets">Ativos</TabsTrigger>
            <TabsTrigger value="events">Intervenções</TabsTrigger>
            <TabsTrigger value="compliance">Conformidade</TabsTrigger>
          </TabsList>

          {/* Assets Tab */}
          <TabsContent value="assets">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar ativos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Assets Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ativo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Condomínio</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Estado</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Condição</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Última</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Próxima</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {mockAssets.map((asset) => {
                        const status = assetStatusConfig[asset.status];
                        const condition = conditionConfig[asset.condition];
                        const ConditionIcon = condition.icon;
                        
                        return (
                          <tr key={asset.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <Wrench className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{asset.name}</p>
                                  <Badge variant="outline" className="text-xs">{asset.category}</Badge>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 text-sm text-slate-600">
                                <Building2 className="w-3 h-3" />
                                {asset.condominium}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant={status.variant}>{status.label}</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant={condition.variant}>
                                <ConditionIcon className="w-3 h-3 mr-1" />
                                {condition.label}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-500">
                              {new Date(asset.lastMaintenance).toLocaleDateString("pt-PT")}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-500">
                              {new Date(asset.nextMaintenance).toLocaleDateString("pt-PT")}
                            </td>
                            <td className="px-4 py-3">
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockEvents.map((event) => {
                    const status = eventStatusConfig[event.status];
                    const isOverdue = event.status === "overdue";
                    
                    return (
                      <div key={event.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isOverdue ? "bg-red-100" : "bg-purple-100"
                            }`}>
                              <Wrench className={`w-6 h-6 ${isOverdue ? "text-red-600" : "text-purple-600"}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant={status.variant}>{status.label}</Badge>
                                <Badge variant="outline">{event.type}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {event.condominium}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(event.date).toLocaleDateString("pt-PT")}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Conformidade e Obrigações</CardTitle>
                <CardDescription>
                  Registos de inspeções e certificações obrigatórias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Configure obrigações de conformidade para os seus condomínios</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
