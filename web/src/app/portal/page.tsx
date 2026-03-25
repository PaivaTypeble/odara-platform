"use client";

import { useState } from "react";
import { 
  Building2,
  Bell,
  FileText,
  Target,
  Calendar,
  Download,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for portal
const mockPortalData = {
  condominium: {
    name: "Condomínio Parque das Flores",
    address: "Rua das Flores, 123, Lisboa",
    fractions: 24,
    manager: "Maria Silva",
  },
  objectives: [
    {
      id: "1",
      title: "Substituição portas de entrada",
      status: "in_progress",
      progress: 60,
      lastUpdate: "2024-03-20",
    },
    {
      id: "2",
      title: "Pintura hall de entrada",
      status: "completed",
      progress: 100,
      lastUpdate: "2024-03-10",
    },
    {
      id: "3",
      title: "Limpeza fachadas",
      status: "waiting",
      progress: 30,
      lastUpdate: "2024-03-15",
    },
  ],
  documents: [
    {
      id: "1",
      title: "Acta Assembleia 2024-03-15",
      date: "2024-03-15",
      type: "assembly",
    },
    {
      id: "2",
      title: "Orçamento Limpeza 2024",
      date: "2024-03-18",
      type: "proposal",
    },
    {
      id: "3",
      title: "Contrato Elevadores Portugal",
      date: "2024-02-01",
      type: "contract",
    },
  ],
  maintenance: [
    {
      id: "1",
      title: "Revisão Elevador Principal",
      date: "2024-05-15",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Inspeção INCREE",
      date: "2024-06-30",
      status: "pending",
    },
  ],
};

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "default" | "secondary"; icon: React.ElementType }> = {
  completed: { label: "Concluído", variant: "success", icon: CheckCircle2 },
  in_progress: { label: "Em Progresso", variant: "default", icon: Clock },
  waiting: { label: "Aguarda", variant: "warning", icon: Clock },
  blocked: { label: "Bloqueado", variant: "warning", icon: AlertCircle },
  scheduled: { label: "Agendada", variant: "secondary", icon: Calendar },
  pending: { label: "Pendente", variant: "secondary", icon: Clock },
};

export default function PortalPage() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Portal Header */}
      <header className="bg-odara-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{mockPortalData.condominium.name}</h1>
                <p className="text-sm text-odara-200">{mockPortalData.condominium.address}</p>
              </div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex gap-1 mt-6">
            {[
              { id: "overview", label: "Visão Geral" },
              { id: "objectives", label: "Objetivos" },
              { id: "documents", label: "Documentos" },
              { id: "maintenance", label: "Manutenção" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-white text-odara-600"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Portal Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeSection === "overview" && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo ao Portal do Condómino</CardTitle>
                <CardDescription>
                  Acompanhe o estado operacional do seu condomínio em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Gestora: {mockPortalData.condominium.manager}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{mockPortalData.condominium.fractions} frações</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Objetivos em Curso</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockPortalData.objectives.filter(o => o.status !== "completed").length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Concluídos</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockPortalData.objectives.filter(o => o.status === "completed").length}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Documentos</CardDescription>
                  <CardTitle className="text-3xl">
                    {mockPortalData.documents.length}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPortalData.objectives.slice(0, 2).map((objective) => {
                    const status = statusConfig[objective.status];
                    const StatusIcon = status.icon;
                    
                    return (
                      <div key={objective.id} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            objective.status === "completed" ? "bg-emerald-100" : "bg-blue-100"
                          }`}>
                            <StatusIcon className={`w-4 h-4 ${
                              objective.status === "completed" ? "text-emerald-600" : "text-blue-600"
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{objective.title}</p>
                            <p className="text-xs text-slate-500">Atualizado em {new Date(objective.lastUpdate).toLocaleDateString("pt-PT")}</p>
                          </div>
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "objectives" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Objetivos Operacionais</h2>
            {mockPortalData.objectives.map((objective) => {
              const status = statusConfig[objective.status];
              const StatusIcon = status.icon;
              
              return (
                <Card key={objective.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          objective.status === "completed" ? "bg-emerald-100" : "bg-blue-100"
                        }`}>
                          <Target className={`w-5 h-5 ${
                            objective.status === "completed" ? "text-emerald-600" : "text-blue-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{objective.title}</h3>
                          <p className="text-sm text-slate-500">
                            Última atualização: {new Date(objective.lastUpdate).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                      </div>
                      <Badge variant={status.variant}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Progresso</span>
                        <span className="font-medium">{objective.progress}%</span>
                      </div>
                      <Progress value={objective.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {activeSection === "documents" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Documentos</h2>
            {mockPortalData.documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-sm text-slate-500">
                          {new Date(doc.date).toLocaleDateString("pt-PT")}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descarregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === "maintenance" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Manutenção e Eventos</h2>
            {mockPortalData.maintenance.map((item) => {
              const status = statusConfig[item.status];
              const StatusIcon = status.icon;
              
              return (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-slate-500">
                            {new Date(item.date).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                      </div>
                      <Badge variant={status.variant}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Portal Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm text-slate-500">
          <p>Portal do Condómino • ODARA © 2024</p>
          <p className="mt-1">Gestão Operacional de Condomínios</p>
        </div>
      </footer>
    </div>
  );
}
