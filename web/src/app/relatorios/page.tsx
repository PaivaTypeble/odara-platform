"use client";

import { useState } from "react";
import { 
  BarChart3,
  Download,
  Filter,
  Calendar,
  Building2,
  Target,
  Users,
  AlertTriangle,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for reports
const mockDashboardStats = {
  totalCondominiums: 16,
  activeObjectives: 24,
  overdueObjectives: 3,
  blockedObjectives: 4,
  openRFPs: 8,
  pendingProposals: 5,
  maintenanceDue: 6,
  maintenanceOverdue: 2,
};

const mockObjectivesByStatus = [
  { status: "draft", count: 2 },
  { status: "planned", count: 5 },
  { status: "in_progress", count: 12 },
  { status: "waiting_external", count: 3 },
  { status: "blocked", count: 4 },
  { status: "completed", count: 18 },
];

const mockObjectivesByCondominium = [
  { name: "Parque das Flores", count: 8 },
  { name: "Vista Mar", count: 6 },
  { name: "Residencial Soleil", count: 12 },
  { name: "Prédio Central", count: 4 },
];

const mockRecentActivity = [
  { id: 1, action: "Objetivo criado", user: "Maria Silva", condo: "Parque das Flores", time: "há 2 horas" },
  { id: 2, action: "Proposta recebida", user: "João Costa", condo: "Vista Mar", time: "há 5 horas" },
  { id: 3, action: "Assembleia registada", user: "Ana Rodrigues", condo: "Prédio Central", time: "há 1 dia" },
  { id: 4, action: "Manutenção concluída", user: "Pedro Santos", condo: "Residencial Soleil", time: "há 1 dia" },
  { id: 5, action: "Documento carregado", user: "Maria Silva", condo: "Parque das Flores", time: "há 2 dias" },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              ←
            </Button>
            <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Relatórios</h1>
              <p className="text-xs text-slate-500">Reporting e auditoria operacional</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Selecionar Período
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="objectives">Objetivos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="audit">Auditoria</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription>Condomínios</CardDescription>
                      <Building2 className="w-4 h-4 text-slate-400" />
                    </div>
                    <CardTitle className="text-3xl">{mockDashboardStats.totalCondominiums}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription>Objetivos Ativos</CardDescription>
                      <Target className="w-4 h-4 text-emerald-400" />
                    </div>
                    <CardTitle className="text-3xl">{mockDashboardStats.activeObjectives}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className={mockDashboardStats.overdueObjectives > 0 ? "border-red-200" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription>Vencidos</CardDescription>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <CardTitle className={`text-3xl ${mockDashboardStats.overdueObjectives > 0 ? "text-red-600" : ""}`}>
                      {mockDashboardStats.overdueObjectives}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardDescription>Bloqueados</CardDescription>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <CardTitle className="text-3xl">{mockDashboardStats.blockedObjectives}</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Pedidos de Proposta Abertos</CardDescription>
                    <CardTitle className="text-2xl">{mockDashboardStats.openRFPs}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500">{mockDashboardStats.pendingProposals} aguardam resposta</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Manutenções</CardDescription>
                    <CardTitle className="text-2xl">{mockDashboardStats.maintenanceDue}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-500">{mockDashboardStats.maintenanceOverdue} vencidas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Propostas Recebidas</CardDescription>
                    <CardTitle className="text-2xl">45</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-emerald-600">78% taxa de aceitação</p>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Últimas ações na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <p className="font-medium text-sm">{activity.action}</p>
                            <p className="text-xs text-slate-500">
                              {activity.user} • {activity.condo}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objectives Tab */}
          <TabsContent value="objectives">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* By Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos por Estado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockObjectivesByStatus.map((item) => {
                      const total = mockObjectivesByStatus.reduce((acc, i) => acc + i.count, 0);
                      const percentage = Math.round((item.count / total) * 100);
                      
                      return (
                        <div key={item.status} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-24 text-sm capitalize">{item.status.replace("_", " ")}</div>
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div 
                                className="bg-odara-500 rounded-full h-2" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium ml-4 w-12 text-right">{item.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* By Condominium */}
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos por Condomínio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockObjectivesByCondominium.map((item) => {
                      const maxCount = Math.max(...mockObjectivesByCondominium.map(i => i.count));
                      const percentage = Math.round((item.count / maxCount) * 100);
                      
                      return (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-36 text-sm truncate">{item.name}</div>
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div 
                                className="bg-blue-500 rounded-full h-2" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-medium ml-4 w-12 text-right">{item.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Operacional</CardTitle>
                <CardDescription>
                  Métricas de eficiência e tempo de resposta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                    <p className="text-2xl font-bold">4.2</p>
                    <p className="text-sm text-slate-500">Dias médios até conclusão</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">2.8</p>
                    <p className="text-sm text-slate-500">Dias para primeira resposta</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-sm text-slate-500">Taxa de cumprimento prazo</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-slate-500">Gestores ativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Registo de Auditoria</CardTitle>
                <CardDescription>
                  Alterações e ações na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Histórico completo de auditoria disponível em breve</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
