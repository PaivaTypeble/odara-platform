"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Users, ArrowLeft, Edit, Mail, Phone, Globe, FileText, Scale, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { suppliersApi, Supplier } from "@/lib/api-client";

export default function SupplierDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await suppliersApi.getById(id);
        setSupplier(data);
      } catch {
        setSupplier({
          id, name: "Limpezas Total, Lda", categoryName: "Limpeza", status: "Active", rating: 4.5, proposalCount: 8, createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-odara-500 border-t-transparent rounded-full" /></div>;
  if (!supplier) return <div className="text-center py-12"><Users className="w-16 h-16 mx-auto text-slate-300 mb-4" /><h2 className="text-xl font-semibold">Fornecedor não encontrado</h2><Link href="/fornecedores"><Button className="mt-4">Voltar</Button></Link></div>;

  const proposals = [
    { title: "Serviço de Limpeza Mensal", condo: "Parque das Flores", date: "2024-03-15", status: "Aceita" },
    { title: "Limpeza Extraordinária", condo: "Vista Mar", date: "2024-03-10", status: "Pendente" },
    { title: "Limpeza Fachadas", condo: "Solar Dourado", date: "2024-02-28", status: "Rejeitada" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/fornecedores"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center"><Scale className="w-7 h-7 text-amber-600" /></div>
            <div>
              <h1 className="text-2xl font-bold">{supplier.name}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Badge variant="outline">{supplier.categoryName || "Geral"}</Badge>
                <Badge variant="success">Ativo</Badge>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline"><Edit className="w-4 h-4 mr-2" />Editar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Avaliação</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-2xl font-bold">{supplier.rating?.toFixed(1) || "N/A"}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Propostas</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /><span className="text-2xl font-bold">{supplier.proposalCount}</span></div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Tax ID</CardTitle></CardHeader><CardContent><span className="text-sm font-mono">PT987654321</span></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-slate-500">Contacto</CardTitle></CardHeader><CardContent><div className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-400" /><span className="text-sm">joao@limpezastotal.pt</span></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Propostas Enviadas</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proposals.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-slate-500">{p.condo} • {new Date(p.date).toLocaleDateString("pt-PT")}</p>
                  </div>
                </div>
                <Badge variant={p.status === "Aceita" ? "success" : p.status === "Pendente" ? "warning" : "secondary"}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
