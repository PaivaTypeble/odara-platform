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
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
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
              <CardTitle className="text-3xl">16</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">4 com elevadores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Objetivos Ativos</CardDescription>
              <CardTitle className="text-3xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-amber-600">3 vencidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Propostas Pendentes</CardDescription>
              <CardTitle className="text-3xl">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">5 aguardam resposta</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Manutenções</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">2 agendadas</p>
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
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div className="flex-1">
                  <p className="font-medium">Objetivo "Substituição portas entrada" atualizado</p>
                  <p className="text-sm text-slate-500">Condomínio Parque das Flores - há 2 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="font-medium">Proposta recebida de Limpezas Total</p>
                  <p className="text-sm text-slate-500">Serviço de limpeza comum - há 5 horas</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                <div className="flex-1">
                  <p className="font-medium">Assembleia agendada para 28 de Março</p>
                  <p className="text-sm text-slate-500">Condomínio Vista Mar - há 1 dia</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
