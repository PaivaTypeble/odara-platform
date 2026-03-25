"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Target, ArrowLeft, Edit, Clock, Calendar, User, Building2, Plus, CheckCircle2, AlertCircle, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { objectivesApi, Objective } from "@/lib/api-client";

export default function ObjectiveDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await objectivesApi.getById(id);
        setObjective(data);
      } catch {
        setObjective({
          id,
          title: "Substituição portas de entrada",
          description: "Substituir 24 portas de entrada do prédio por novas portas de segurança",
          status: "InProgress",
          priority: "High",
          condominiumName: "Parque das Flores",
          progress: 60,
          isPublic: true,
          createdAt: new Date().toISOString(),
          targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!objective) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-600">Objetivo não encontrado</h2>
        <Link href="/objetivos">
          <Button className="mt-4">Voltar aos Objetivos</Button>
        </Link>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    Draft: "Rascunho",
    Planned: "Planeado",
    InProgress: "Em Progresso",
    WaitingExternal: "Aguarda Externo",
    Blocked: "Bloqueado",
    Completed: "Concluído",
  };

  const statusVariants: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
    Draft: "secondary",
    Planned: "secondary",
    InProgress: "default",
    WaitingExternal: "warning",
    Blocked: "destructive",
    Completed: "success",
  };

  const priorityLabels: Record<string, string> = {
    Low: "Baixa",
    Medium: "Média",
    High: "Alta",
    Critical: "Crítica",
  };

  const priorityVariants: Record<string, "default" | "warning" | "destructive"> = {
    Low: "default",
    Medium: "warning",
    High: "warning",
    Critical: "destructive",
  };

  const updates = [
    { content: "Iniciadas medições para encomenda", date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), user: "Sistema" },
    { content: "Encomenda realizada - prazo 3 semanas", date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), user: "Sistema" },
    { content: "Pintores iniciaram trabalhos de preparação", date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), user: "Sistema" },
    { content: "Portas instaladas no rés-do-chão", date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), user: "Sistema" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/objetivos">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{objective.title}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4" />
                {objective.condominiumName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descrição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{objective.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Histórico de Atualizações</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Nova Atualização
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm">{update.content}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span>{update.user}</span>
                        <span>•</span>
                        <span>{new Date(update.date).toLocaleDateString("pt-PT")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <Badge variant={statusVariants[objective.status] || "secondary"} className="text-sm px-3 py-1">
                  {statusLabels[objective.status] || objective.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Progresso</span>
                  <span className="font-medium">{objective.progress}%</span>
                </div>
                <Progress value={objective.progress} className="h-3" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-slate-500">Prioridade</span>
                <Badge variant={priorityVariants[objective.priority] || "default"}>
                  {priorityLabels[objective.priority] || objective.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">{objective.condominiumName}</span>
              </div>
              {objective.targetDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">
                    Prazo: {new Date(objective.targetDate).toLocaleDateString("pt-PT")}
                  </span>
                </div>
              )}
              {objective.ownerName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{objective.ownerName}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Tarefa
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Marcar como Concluído
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
