"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Search, Filter, MoreHorizontal, Building2, Mail, Phone, CheckCircle2, Clock, XCircle, ChevronRight, FileText, Scale, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { suppliersApi, Supplier } from "@/lib/api-client";

const statusConfig: Record<string, { label: string; variant: "success" | "secondary" | "destructive"; icon: React.ElementType }> = {
  Active: { label: "Ativo", variant: "success", icon: CheckCircle2 },
  Inactive: { label: "Inativo", variant: "secondary", icon: Clock },
  Blocked: { label: "Bloqueado", variant: "destructive", icon: XCircle },
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        setLoading(true);
        const data = await suppliersApi.getAll();
        setSuppliers(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
        setError("Erro ao carregar fornecedores. A usar dados de demonstração.");
        const demoData: Supplier[] = [
          { id: "1", name: "Limpezas Total, Lda", categoryName: "Limpeza", status: "Active", rating: 4.5, proposalCount: 8, createdAt: new Date().toISOString() },
          { id: "2", name: "Elevadores Portugal", categoryName: "Elevadores", status: "Active", rating: 4.8, proposalCount: 5, createdAt: new Date().toISOString() },
          { id: "3", name: "Pinturas Silva & Filhos", categoryName: "Pintura", status: "Active", rating: 4.2, proposalCount: 3, createdAt: new Date().toISOString() },
          { id: "4", name: "Segurança 24h", categoryName: "Segurança", status: "Active", rating: 4.0, proposalCount: 2, createdAt: new Date().toISOString() },
          { id: "5", name: "Climatização Norte", categoryName: "Climatização", status: "Active", rating: 4.6, proposalCount: 4, createdAt: new Date().toISOString() },
        ];
        setSuppliers(demoData);
      } finally {
        setLoading(false);
      }
    }
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesTab = activeTab === "all" || (activeTab === "active" && s.status === "Active") || (activeTab === "blocked" && s.status === "Blocked");
    return matchesSearch && matchesTab;
  });

  const activeCount = suppliers.filter(s => s.status === "Active").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>←</Button>
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Fornecedores</h1>
              <p className="text-xs text-slate-500">{suppliers.length} fornecedores registados</p>
            </div>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" />Novo Fornecedor</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Fornecedores</CardDescription>
              <CardTitle className="text-3xl">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : suppliers.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ativos</CardDescription>
              <CardTitle className="text-3xl text-emerald-600">{activeCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Propostas Recebidas</CardDescription>
              <CardTitle className="text-3xl">{suppliers.reduce((acc, s) => acc + s.proposalCount, 0)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos ({suppliers.length})</TabsTrigger>
            <TabsTrigger value="active">Ativos ({activeCount})</TabsTrigger>
            <TabsTrigger value="blocked">Bloqueados</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Pesquisar fornecedores..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
          </div>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
            ) : filteredSuppliers.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-slate-500"><Users className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Nenhum fornecedor encontrado</p></CardContent></Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuppliers.map((supplier) => {
                  const status = statusConfig[supplier.status] || statusConfig.Active;
                  const StatusIcon = status.icon;
                  return (
                    <Card key={supplier.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Scale className="w-6 h-6 text-amber-600" />
                          </div>
                          <Badge variant={status.variant}><StatusIcon className="w-3 h-3 mr-1" />{status.label}</Badge>
                        </div>
                        <CardTitle className="text-base mt-3">{supplier.name}</CardTitle>
                        {supplier.categoryName && <Badge variant="outline">{supplier.categoryName}</Badge>}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Avaliação</span>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium">{supplier.rating?.toFixed(1) || "N/A"}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Propostas</span>
                            <span className="font-medium">{supplier.proposalCount}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                          <Button variant="outline" size="sm" className="flex-1"><FileText className="w-3 h-3 mr-1" />Propostas</Button>
                          <Button variant="outline" size="sm" className="flex-1"><ChevronRight className="w-3 h-3 mr-1" />Ver</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
