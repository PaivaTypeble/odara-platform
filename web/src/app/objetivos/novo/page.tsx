"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Target, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { condominiumsApi, Condominium } from "@/lib/api-client";

function NovoObjetivoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const condominiumId = searchParams.get("condominiumId");
  const [loading, setLoading] = useState(false);
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [formData, setFormData] = useState({
    condominiumId: condominiumId || "",
    title: "",
    description: "",
    priority: "Medium",
    targetDate: "",
    ownerName: "",
  });

  useEffect(() => {
    async function fetchCondominiums() {
      try {
        const data = await condominiumsApi.getAll();
        setCondominiums(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    }
    fetchCondominiums();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/objetivos");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader><CardTitle>Informações do Objetivo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="condominium">Condomínio *</Label>
            <select id="condominium" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.condominiumId} onChange={(e) => setFormData({ ...formData, condominiumId: e.target.value })} required>
              <option value="">Selecione um condomínio</option>
              {condominiums.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" placeholder="Ex: Substituição de portas de entrada" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea id="description" className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Descreva o objetivo..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <select id="priority" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                <option value="Low">Baixa</option><option value="Medium">Média</option><option value="High">Alta</option><option value="Critical">Crítica</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetDate">Data Limite</Label>
              <Input id="targetDate" type="date" value={formData.targetDate} onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Responsável</Label>
            <Input id="owner" placeholder="Nome do responsável" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4 mt-6">
        <Link href="/objetivos"><Button variant="outline" type="button">Cancelar</Button></Link>
        <Button type="submit" disabled={loading}><Save className="w-4 h-4 mr-2" />{loading ? "A guardar..." : "Guardar Objetivo"}</Button>
      </div>
    </form>
  );
}

export default function NovoObjetivoPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/objetivos"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-emerald-600" /></div>
          <h1 className="text-2xl font-bold">Novo Objetivo</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>}>
        <NovoObjetivoForm />
      </Suspense>
    </div>
  );
}
