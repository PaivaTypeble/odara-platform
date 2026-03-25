"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { condominiumsApi, Condominium } from "@/lib/api-client";

function NovaAssembleiaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const condominiumId = searchParams.get("condominiumId");
  const [loading, setLoading] = useState(false);
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [formData, setFormData] = useState({
    condominiumId: condominiumId || "",
    title: "",
    assemblyDate: "",
    type: "Ordinary",
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
      router.push("/assembleias");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader><CardTitle>Informações da Assembleia</CardTitle></CardHeader>
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
            <Input id="title" placeholder="Ex: Assembleia Ordinária 2024" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data da Assembleia *</Label>
              <Input id="date" type="date" value={formData.assemblyDate} onChange={(e) => setFormData({ ...formData, assemblyDate: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="Ordinary">Ordinária</option>
                <option value="Extraordinary">Extraordinária</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4 mt-6">
        <Link href="/assembleias"><Button variant="outline" type="button">Cancelar</Button></Link>
        <Button type="submit" disabled={loading}><Save className="w-4 h-4 mr-2" />{loading ? "A guardar..." : "Guardar Assembleia"}</Button>
      </div>
    </form>
  );
}

export default function NovaAssembleiaPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/assembleias"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><FileText className="w-5 h-5 text-blue-600" /></div>
          <h1 className="text-2xl font-bold">Nova Assembleia</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>}>
        <NovaAssembleiaForm />
      </Suspense>
    </div>
  );
}
