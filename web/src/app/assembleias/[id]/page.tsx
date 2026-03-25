"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, ArrowLeft, Edit, Calendar, Building2, Target, CheckCircle2, XCircle, Plus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { assembliesApi, Assembly } from "@/lib/api-client";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "secondary" }> = {
  Draft: { label: "Rascunho", variant: "secondary" },
  Scheduled: { label: "Agendada", variant: "warning" },
  Completed: { label: "Realizada", variant: "success" },
  Cancelled: { label: "Cancelada", variant: "secondary" },
};

export default function AssembleiaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [assembly, setAssembly] = useState<Assembly | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await assembliesApi.getById(id);
        setAssembly(data);
      } catch {
        setAssembly({
          id, title: "Assembleia Ordinária 2024", assemblyDate: new Date().toISOString(), type: "Ordinary", status: "Completed", condominiumName: "Parque das Flores", decisionCount: 5, objectiveCount: 3, createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>;
  }

  if (!assembly) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold">Assembleia não encontrada</h2>
        <Link href="/assembleias"><Button className="mt-4">Voltar</Button></Link>
      </div>
    );
  }

  const status = statusConfig[assembly.status] || statusConfig.Draft;
  const decisions = [
    { description: "Aprovação de substituição das portas de entrada", approved: true, votesFor: 22, votesAgainst: 2 },
    { description: "Contratação de novo serviço de limpeza", approved: true, votesFor: 24, votesAgainst: 0 },
    { description: "Aprovação orçamento manutenção elevador", approved: true, votesFor: 20, votesAgainst: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/assembleias">
            <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{assembly.title}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4" />
                {assembly.condominiumName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar Ata</Button>
          <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Editar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Data</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-slate-400" /><span className="font-medium">{new Date(assembly.assemblyDate).toLocaleDateString("pt-PT")}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Tipo</CardTitle></CardHeader><CardContent><span className="font-medium">{assembly.type === "Ordinary" ? "Ordinária" : "Extraordinária"}</span></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Decisões</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-2xl font-bold">{assembly.decisionCount}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Objetivos</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><Target className="w-5 h-5 text-amber-500" /><span className="text-2xl font-bold">{assembly.objectiveCount}</span></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Decisões Tomadas</CardTitle>
          <Badge variant={status.variant}>{status.label}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decisions.map((decision, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <p className="font-medium">{decision.description}</p>
                  <Badge variant={decision.approved ? "success" : "destructive"}>
                    {decision.approved ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                    {decision.approved ? "Aprovada" : "Rejeitada"}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span>Votos a favor: <span className="font-medium text-emerald-600">{decision.votesFor}</span></span>
                  <span>Votos contra: <span className="font-medium text-red-600">{decision.votesAgainst}</span></span>
                  <span>Abstenções: <span className="font-medium">{decision.votesFor + decision.votesAgainst === 24 ? 0 : 24 - decision.votesFor - decision.votesAgainst}</span></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Objetivos Gerados</CardTitle>
          <Link href={`/objetivos/novo?assemblyId=${id}`}>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Criar Objetivo</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[{title: "Substituição portas entrada", progress: 60}, {title: "Contratar limpeza fachadas", progress: 30}].map((obj, i) => (
              <Link key={i} href={`/objetivos/${i+1}`} className="block">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{obj.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-odara-500" style={{ width: `${obj.progress}%` }} />
                    </div>
                    <span className="text-sm text-slate-500 w-12">{obj.progress}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
