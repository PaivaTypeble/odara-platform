"use client";

import { useState } from "react";
import { Eye, Building2, Target, FileText, Calendar, CheckCircle2, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from "lucide-react";

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const objectives = [
    { title: "Substituição de portas de entrada", status: "Em Progresso", progress: 60, priority: "Alta" },
    { title: "Pintura do hall de entrada", status: "Planeado", progress: 0, priority: "Média" },
    { title: "Limpeza de fachadas", status: "Concluído", progress: 100, priority: "Baixa" },
  ];

  const recentDecisions = [
    { title: "Aprovação substituição portas", date: "2024-03-15", approved: true },
    { title: "Novo contrato de limpeza", date: "2024-03-15", approved: true },
    { title: "Orçamento elevador", date: "2024-03-15", approved: true },
  ];

  const nextAssembly = {
    title: "Assembleia Ordinária 2º Trimestre",
    date: "2024-06-28",
    time: "18:00",
    type: "Presencial",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-odara-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Portal da Transparência</h1>
                <p className="text-sm text-slate-500">ODARA - Gestão de Condomínios</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Público
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Next Assembly Alert */}
        <Card className="mb-8 border-odara-200 bg-odara-50">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-odara-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Próxima Assembleia</p>
                <p className="text-slate-600">{nextAssembly.title}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-odara-600">{nextAssembly.date}</p>
              <p className="text-sm text-slate-500">{nextAssembly.time} - {nextAssembly.type}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                <Building className="w-4 h-4" /> Condomínios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                <Target className="w-4 h-4" /> Objetivos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Decisões (2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="objectives">Objetivos</TabsTrigger>
            <TabsTrigger value="decisions">Decisões</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Últimos Objetivos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {objectives.slice(0, 3).map((obj, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${obj.progress === 100 ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                              <CheckCircle2 className={`w-4 h-4 ${obj.progress === 100 ? 'text-emerald-600' : 'text-amber-600'}`} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{obj.title}</p>
                              <Badge variant={obj.progress === 100 ? "success" : "secondary"} className="text-xs mt-1">{obj.status}</Badge>
                            </div>
                          </div>
                          <span className="text-sm text-slate-500">{obj.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Últimas Decisões
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDecisions.map((decision, i) => (
                        <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${decision.approved ? 'bg-emerald-100' : 'bg-red-100'}`}>
                              <CheckCircle2 className={`w-4 h-4 ${decision.approved ? 'text-emerald-600' : 'text-red-600'}`} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{decision.title}</p>
                              <p className="text-xs text-slate-500">{new Date(decision.date).toLocaleDateString("pt-PT")}</p>
                            </div>
                          </div>
                          <Badge variant={decision.approved ? "success" : "destructive"} className="text-xs">
                            {decision.approved ? "Aprovada" : "Rejeitada"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "objectives" && (
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Objetivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {objectives.map((obj, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{obj.title}</h3>
                          <Badge variant={obj.progress === 100 ? "success" : obj.progress > 0 ? "default" : "secondary"}>{obj.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${obj.progress === 100 ? 'bg-emerald-500' : 'bg-odara-500'}`} style={{ width: `${obj.progress}%` }} />
                            </div>
                          </div>
                          <span className="text-sm text-slate-500 w-12">{obj.progress}%</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">Prioridade: {obj.priority}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "decisions" && (
              <Card>
                <CardHeader>
                  <CardTitle>Decisões de Assembleias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDecisions.map((decision, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{decision.title}</h3>
                          <Badge variant="success">Aprovada</Badge>
                        </div>
                        <p className="text-sm text-slate-500">
                          Assembleia de {new Date(decision.date).toLocaleDateString("pt-PT", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Plataforma ODARA - Portal da Transparência</p>
          <p className="mt-1">Dados atualizados em tempo real • © 2024 ODARA</p>
        </div>
      </main>
    </div>
  );
}
