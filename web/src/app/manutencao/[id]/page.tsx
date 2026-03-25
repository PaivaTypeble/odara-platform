"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Wrench, ArrowLeft, Edit, Calendar, CheckCircle2, AlertTriangle, Building2, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { assetsApi, Asset } from "@/lib/api-client";

export default function AssetDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await assetsApi.getById(id);
        setAsset(data);
      } catch {
        setAsset({
          id, name: "Elevador Principal", categoryName: "Elevadores", status: "Operational", condition: "Good", condominiumName: "Parque das Flores", lastMaintenance: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>;
  if (!asset) return <div className="text-center py-12"><Wrench className="w-16 h-16 mx-auto text-slate-300 mb-4" /><h2 className="text-xl font-semibold">Ativo não encontrado</h2><Link href="/manutencao"><Button className="mt-4">Voltar</Button></Link></div>;

  const maintenanceEvents = [
    { title: "Revisão anual", date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), status: "Concluída", cost: 450 },
    { title: "Substituição botoeiras", date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), status: "Concluída", cost: 320 },
    { title: "Inspeção DGERT", date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), status: "Concluída", cost: 200 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/manutencao"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center"><Wrench className="w-7 h-7 text-purple-600" /></div>
            <div>
              <h1 className="text-2xl font-bold">{asset.name}</h1>
              <div className="flex items-center gap-2 text-slate-500"><Building2 className="w-4 h-4" />{asset.condominiumName}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Editar</Button>
          <Button><Plus className="w-4 h-4 mr-2" />Nova Intervenção</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Estado</CardTitle></CardHeader><CardContent><Badge variant="success" className="text-sm"><CheckCircle2 className="w-4 h-4 mr-1" />Operacional</Badge></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Condição</CardTitle></CardHeader><CardContent><Badge variant="success" className="text-sm">Bom</Badge></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Última Manutenção</CardTitle></CardHeader><CardContent><span className="font-medium">{new Date(asset.lastMaintenance || "").toLocaleDateString("pt-PT")}</span></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Próxima Manutenção</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /><span className="font-medium text-amber-600">{new Date(asset.nextMaintenance || "").toLocaleDateString("pt-PT")}</span></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Histórico de Manutenções</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString("pt-PT")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="success">{event.status}</Badge>
                  <span className="font-medium">€{event.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Conformidade</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /><span className="text-emerald-800">Inspeção DGERT em dia</span></div>
              <Badge variant="success">Conforme</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-amber-600" /><span className="text-amber-800">Manutenção preventiva pendente</span></div>
              <Badge variant="warning">Pendente</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
