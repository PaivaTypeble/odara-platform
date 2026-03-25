"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Building2, MapPin, Users, Target, FileText, Wrench, ChevronRight, Edit, ArrowLeft, Plus, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { condominiumsApi, Condominium } from "@/lib/api-client";

export default function CondominiumDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [condominium, setCondominium] = useState<Condominium | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await condominiumsApi.getById(id);
        setCondominium(data);
      } catch {
        setCondominium({ id, name: "Condomínio Parque das Flores", fractionCount: 24, elevatorCount: 1, isActive: true, address: "Rua das Flores, 123", city: "Lisboa", createdAt: new Date().toISOString() });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>;
  if (!condominium) return <div className="text-center py-12"><Building2 className="w-16 h-16 mx-auto text-slate-300 mb-4" /><h2 className="text-xl font-semibold">Condomínio não encontrado</h2><Link href="/condominios"><Button className="mt-4">Voltar</Button></Link></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/condominios"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-odara-100 rounded-lg flex items-center justify-center"><Building2 className="w-7 h-7 text-odara-600" /></div>
            <div>
              <h1 className="text-2xl font-bold">{condominium.name}</h1>
              <div className="flex items-center gap-2 text-slate-500"><MapPin className="w-4 h-4" />{condominium.address}, {condominium.city}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Editar</Button>
          <Link href={`/assembleias/novo?condominiumId=${id}`}><Button><Plus className="w-4 h-4 mr-2" />Nova Assembleia</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Frações</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" /><span className="text-2xl font-bold">{condominium.fractionCount}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Elevadores</CardTitle></CardHeader><CardContent><span className="text-2xl font-bold">{condominium.elevatorCount}</span></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Objetivos</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500" /><span className="text-2xl font-bold">3</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Assembleias</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /><span className="text-2xl font-bold">2</span></div></CardContent></Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList><TabsTrigger value="overview">Visão Geral</TabsTrigger><TabsTrigger value="objectives">Objetivos</TabsTrigger><TabsTrigger value="assemblies">Assembleias</TabsTrigger><TabsTrigger value="assets">Ativos</TabsTrigger><TabsTrigger value="contacts">Contactos</TabsTrigger></TabsList>

        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle>Informações</CardTitle></CardHeader><CardContent className="space-y-3">
                <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Nome</span><span className="font-medium">{condominium.name}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Morada</span><span className="font-medium">{condominium.address || "N/A"}</span></div>
                <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Cidade</span><span className="font-medium">{condominium.city || "N/A"}</span></div>
                <div className="flex justify-between py-2"><span className="text-slate-500">Estado</span><Badge variant={condominium.isActive ? "success" : "secondary"}>{condominium.isActive ? "Ativo" : "Inativo"}</Badge></div>
              </CardContent></Card>
              <Card><CardHeader><CardTitle>Atividade Recente</CardTitle></CardHeader><CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" /><div><p className="text-sm">Objetivo atualizado</p><p className="text-xs text-slate-500">há 2 horas</p></div></div>
                  <div className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-blue-500 mt-2" /><div><p className="text-sm">Nova assembleia criada</p><p className="text-xs text-slate-500">há 1 dia</p></div></div>
                </div>
              </CardContent></Card>
            </div>
          )}
          {activeTab === "objectives" && (
            <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Objetivos</CardTitle><Link href={`/objetivos/novo?condominiumId=${id}`}><Button size="sm"><Plus className="w-4 h-4 mr-1" />Novo</Button></Link></CardHeader><CardContent>
              {[{title: "Substituição portas", status: "Em Progresso", progress: 60}, {title: "Pintura hall", status: "Concluído", progress: 100}].map((o, i) => (
                <Link key={i} href={`/objetivos/${i+1}`} className="block"><div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 mb-2"><div className="flex items-center gap-3"><Target className="w-5 h-5 text-emerald-500" /><span className="font-medium">{o.title}</span></div><div className="flex items-center gap-3"><span className="text-sm text-slate-500">{o.progress}%</span><ChevronRight className="w-5 h-5 text-slate-400" /></div></div></Link>
              ))}
            </CardContent></Card>
          )}
          {activeTab === "assemblies" && (
            <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Assembleias</CardTitle><Link href={`/assembleias/novo?condominiumId=${id}`}><Button size="sm"><Plus className="w-4 h-4 mr-1" />Nova</Button></Link></CardHeader><CardContent>
              {[{title: "Assembleia Ordinária 2024", date: "2024-03-15", status: "Realizada"}, {title: "Assembleia 1º Trimestre", date: "2024-06-28", status: "Agendada"}].map((a, i) => (
                <Link key={i} href={`/assembleias/${i+1}`} className="block"><div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 mb-2"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-blue-500" /><span className="font-medium">{a.title}</span></div><div className="flex items-center gap-3"><Badge variant={a.status === "Realizada" ? "success" : "warning"}>{a.status}</Badge><ChevronRight className="w-5 h-5 text-slate-400" /></div></div></Link>
              ))}
            </CardContent></Card>
          )}
          {activeTab === "assets" && (
            <Card><CardHeader><CardTitle>Ativos</CardTitle></CardHeader><CardContent>
              {[{name: "Elevador Principal", status: "Operacional"}, {name: "Portão Garagem", status: "Operacional"}].map((a, i) => (
                <Link key={i} href={`/manutencao/${i+1}`} className="block"><div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 mb-2"><div className="flex items-center gap-3"><Wrench className="w-5 h-5 text-purple-500" /><span className="font-medium">{a.name}</span></div><div className="flex items-center gap-3"><Badge variant="success">{a.status}</Badge><ChevronRight className="w-5 h-5 text-slate-400" /></div></div></Link>
              ))}
            </CardContent></Card>
          )}
          {activeTab === "contacts" && (
            <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Contactos</CardTitle><Button size="sm"><Plus className="w-4 h-4 mr-1" />Adicionar</Button></CardHeader><CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg"><div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><span className="font-medium">MS</span></div><div><p className="font-medium">Maria Silva</p><p className="text-sm text-slate-500">Gestora</p></div></div><div className="space-y-2 text-sm"><div className="flex items-center gap-2"><Mail className="w-4 h-4" />maria@odara.pt</div><div className="flex items-center gap-2"><Phone className="w-4 h-4" />+351 912 345 678</div></div></div>
              </div>
            </CardContent></Card>
          )}
        </div>
      </Tabs>
    </div>
  );
}
