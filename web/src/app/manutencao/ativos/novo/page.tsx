"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Wrench, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { condominiumsApi, Condominium } from "@/lib/api-client";

function NovoAtivoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const condominiumId = searchParams.get("condominiumId");
  const [loading, setLoading] = useState(false);
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [formData, setFormData] = useState({
    condominiumId: condominiumId || "",
    name: "",
    category: "Elevadores",
    serialNumber: "",
    manufacturer: "",
    installationDate: "",
    nextMaintenanceDate: "",
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
      router.push("/manutencao");
    }, 1000);
  };

  const categories = ["Elevadores", "Automação", "Infraestrutura", "HVAC", "Eletricidade", "Canalização", "Contra Incêndios", "Comunicações", "Jardinagem", "Limpeza", "Segurança", "Geral"];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader><CardTitle>Informações do Ativo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="condominium">Condomínio *</Label>
            <select id="condominium" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.condominiumId} onChange={(e) => setFormData({ ...formData, condominiumId: e.target.value })} required>
              <option value="">Selecione um condomínio</option>
              {condominiums.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Ativo *</Label>
            <Input id="name" placeholder="Ex: Elevador Principal" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serial">Número de Série</Label>
              <Input id="serial" placeholder="Opcional" value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input id="manufacturer" placeholder="Opcional" value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installDate">Data de Instalação</Label>
              <Input id="installDate" type="date" value={formData.installationDate} onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextMaintenance">Próxima Manutenção</Label>
            <Input id="nextMaintenance" type="date" value={formData.nextMaintenanceDate} onChange={(e) => setFormData({ ...formData, nextMaintenanceDate: e.target.value })} />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4 mt-6">
        <Link href="/manutencao"><Button variant="outline" type="button">Cancelar</Button></Link>
        <Button type="submit" disabled={loading}><Save className="w-4 h-4 mr-2" />{loading ? "A guardar..." : "Guardar Ativo"}</Button>
      </div>
    </form>
  );
}

export default function NovoAtivoPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/manutencao"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Wrench className="w-5 h-5 text-purple-600" /></div>
          <h1 className="text-2xl font-bold">Novo Ativo</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex justify-center py-8"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>}>
        <NovoAtivoForm />
      </Suspense>
    </div>
  );
}
