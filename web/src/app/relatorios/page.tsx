"use client";

import { useState } from "react";
import { BarChart3, Download, Calendar, Filter, FileText, TrendingUp, Building2, Target, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reports = [
  { id: "1", title: "Relatório Mensal de Atividades", type: "monthly", date: new Date().toISOString(), status: "ready" },
  { id: "2", title: "Resumo Objetivos por Condomínio", type: "objectives", date: new Date().toISOString(), status: "ready" },
  { id: "3", title: "Custos de Manutenção", type: "costs", date: new Date().toISOString(), status: "ready" },
  { id: "4", title: "Propostas e Fornecedores", type: "suppliers", date: new Date().toISOString(), status: "generating" },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>←</Button>
            <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Relatórios</h1>
              <p className="text-xs text-slate-500">Reporting e auditoria operacional</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Relatórios</CardDescription>
              <CardTitle className="text-3xl">{reports.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Disponíveis</CardDescription>
              <CardTitle className="text-3xl text-emerald-600">{reports.filter(r => r.status === "ready").length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Em Geração</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{reports.filter(r => r.status === "generating").length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Este Mês</CardDescription>
              <CardTitle className="text-3xl">{reports.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            {["week", "month", "quarter", "year"].map((period) => (
              <Button key={period} variant={selectedPeriod === period ? "default" : "outline"} size="sm" onClick={() => setSelectedPeriod(period)}>
                {period === "week" ? "Semana" : period === "month" ? "Mês" : period === "quarter" ? "Trimestre" : "Ano"}
              </Button>
            ))}
          </div>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" />Tendências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end justify-around gap-2">
                {[40, 65, 45, 80, 70, 90, 85].map((height, i) => (
                  <div key={i} className="bg-odara-500 rounded-t w-full max-w-12" style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="flex justify-around mt-2 text-xs text-slate-500">
                <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" />Por Condomínio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Parque das Flores", "Vista Mar", "Solar Dourado", "Prédio Central"].map((name, i) => (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-sm">{name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${["bg-emerald-500", "bg-blue-500", "bg-amber-500", "bg-purple-500"][i]}`} style={{ width: `${70 - i * 10}%` }} />
                      </div>
                      <span className="text-sm text-slate-500 w-8 text-right">{70 - i * 10}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Relatórios Disponíveis</CardTitle>
            <CardDescription>Descarregue os relatórios mais recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.status === "ready" ? "bg-emerald-100" : "bg-amber-100"}`}>
                      <FileText className={`w-5 h-5 ${report.status === "ready" ? "text-emerald-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-slate-500">{new Date(report.date).toLocaleDateString("pt-PT")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === "ready" ? "success" : "warning"}>{report.status === "ready" ? "Disponível" : "A gerar..."}</Badge>
                    <Button variant="outline" size="sm" disabled={report.status !== "ready"}><Download className="w-4 h-4 mr-1" />Descarregar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
