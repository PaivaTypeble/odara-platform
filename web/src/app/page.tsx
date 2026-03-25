"use client";

import Link from "next/link";
import {
  Building2,
  Target,
  FileText,
  Users,
  Wrench,
  BarChart3,
  Bell,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { dashboardApi, DashboardStats, Activity } from "@/lib/api-client";

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "há poucos minutos";
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  if (diffDays < 7) return `há ${diffDays} dia${diffDays > 1 ? "s" : ""}`;
  return date.toLocaleDateString("pt-PT");
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [statsData, activitiesData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentActivity(10),
        ]);
        setStats(statsData);
        setActivities(activitiesData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Erro ao carregar dados. A usar dados de demonstração.");
        // Use demo data on error
        setStats({
          totalCondominiums: 3,
          activeObjectives: 5,
          overdueObjectives: 1,
          blockedObjectives: 0,
          openRFPs: 2,
          pendingProposals: 3,
          maintenanceDue: 4,
          maintenanceOverdue: 1,
        });
        setActivities([
          { type: "objective", id: "1", title: "Substituição portas entrada", status: "InProgress", condominium: "Parque das Flores", updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
          { type: "assembly", id: "2", title: "Assembleia Ordinária", status: "Scheduled", condominium: "Vista Mar", updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
          { type: "maintenance", id: "3", title: "Manutenção elevador", status: "Scheduled", condominium: "Solar Dourado", updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-odara-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">ODARA</h1>
              <p className="text-xs text-slate-500">Gestão Operacional</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-odara-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-odara-700">L</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo à ODARA</h2>
          <p className="text-slate-600 mt-1">
            Gestão operacional transparente para condomínios
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Condomínios</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.totalCondominiums ?? 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">ativos no sistema</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Objetivos Ativos</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.activeObjectives ?? 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-600">{stats?.overdueObjectives ?? 0} vencidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Propostas Abertas</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.openRFPs ?? 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">{stats?.pendingProposals ?? 0} aguardam resposta</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Manutenções</CardDescription>
              <CardTitle className="text-3xl">
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.maintenanceDue ?? 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">{stats?.maintenanceOverdue ?? 0} em atraso</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/condominios" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-odara-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-odara-600" />
                </div>
                <CardTitle>Condomínios</CardTitle>
                <CardDescription>
                  Gestão da carteira, frações e contactos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-odara-600 p-0 h-auto font-normal">
                  Gerir condomínios <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/assembleias" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Assembleias</CardTitle>
                <CardDescription>
                  Atas, decisões e objetivos operacionais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-blue-600 p-0 h-auto font-normal">
                  Ver assembleias <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/objetivos" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Objetivos</CardTitle>
                <CardDescription>
                  Acompanhamento operacional e prazos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-emerald-600 p-0 h-auto font-normal">
                  Ver objetivos <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/fornecedores" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Fornecedores</CardTitle>
                <CardDescription>
                  Propostas e comparação estruturada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-amber-600 p-0 h-auto font-normal">
                  Gerir fornecedores <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/manutencao" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Manutenção</CardTitle>
                <CardDescription>
                  Ativos, planos e conformidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-purple-600 p-0 h-auto font-normal">
                  Ver manutenção <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/relatorios" className="group">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-slate-600" />
                </div>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>
                  Reporting e auditoria operacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:text-slate-600 p-0 h-auto font-normal">
                  Ver relatórios <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas atualizações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800">{error}</p>
              </div>
            )}
            <div className="space-y-4">
              {activities.length === 0 && !loading && (
                <p className="text-sm text-slate-500">Nenhuma atividade recente</p>
              )}
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
              ) : (
                activities.slice(0, 5).map((activity) => (
                  <div key={`${activity.type}-${activity.id}`} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "objective" ? "bg-emerald-500" :
                      activity.type === "assembly" ? "bg-blue-500" :
                      activity.type === "maintenance" ? "bg-purple-500" :
                      "bg-slate-500"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-slate-500">
                        {activity.type === "objective" ? "Objetivo" :
                         activity.type === "assembly" ? "Assembleia" :
                         activity.type === "maintenance" ? "Manutenção" : activity.type} - {activity.condominium} - {formatTimeAgo(activity.updatedAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
