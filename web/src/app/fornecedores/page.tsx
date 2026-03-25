"use client";

import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
  FileText,
  Scale
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock data for suppliers
const mockSuppliers = [
  {
    id: "1",
    name: "Limpezas Total, Lda",
    category: "Limpeza",
    contacts: [
      { name: "João Santos", email: "joao@limpezastotal.pt", phone: "+351 912 345 678" }
    ],
    rating: 4.5,
    proposals: 8,
    accepted: 6,
    status: "active",
  },
  {
    id: "2",
    name: "Elevadores Portugal",
    category: "Elevadores",
    contacts: [
      { name: "Maria Costa", email: "contacto@elevadores.pt", phone: "+351 933 456 789" }
    ],
    rating: 4.8,
    proposals: 5,
    accepted: 4,
    status: "active",
  },
  {
    id: "3",
    name: "Pinturas & Acabamentos Silva",
    category: "Pintura",
    contacts: [
      { name: "António Silva", email: "silva.pinturas@mail.pt", phone: "+351 926 789 012" }
    ],
    rating: 4.2,
    proposals: 3,
    accepted: 2,
    status: "active",
  },
  {
    id: "4",
    name: "Segurança 24h",
    category: "Segurança",
    contacts: [
      { name: "Paulo Ferreira", email: "info@seguranca24h.pt", phone: "+351 217 890 123" }
    ],
    rating: 4.0,
    proposals: 2,
    accepted: 1,
    status: "active",
  },
  {
    id: "5",
    name: "Climatização Norte",
    category: "Climatização",
    contacts: [
      { name: "Rosa Mendes", email: "geral@climatizacaonorte.pt", phone: "+351 229 123 456" }
    ],
    rating: 3.8,
    proposals: 4,
    accepted: 2,
    status: "inactive",
  },
];

// Mock data for RFP requests
const mockRFPs = [
  {
    id: "1",
    title: "Limpeza Mensal - Parque das Flores",
    category: "Limpeza",
    condominium: "Parque das Flores",
    status: "partially_received",
    suppliersInvited: 3,
    proposalsReceived: 1,
    deadline: "2024-04-01",
  },
  {
    id: "2",
    title: "Manutenção Elevadores - Vista Mar",
    category: "Elevadores",
    condominium: "Vista Mar",
    status: "sent",
    suppliersInvited: 2,
    proposalsReceived: 0,
    deadline: "2024-04-15",
  },
  {
    id: "3",
    title: "Pintura Hall - Prédio Central",
    category: "Pintura",
    condominium: "Prédio Central",
    status: "decided",
    suppliersInvited: 3,
    proposalsReceived: 3,
    deadline: "2024-03-20",
  },
];

const rfpStatusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "secondary" | "info" }> = {
  draft: { label: "Rascunho", variant: "secondary" },
  sent: { label: "Enviado", variant: "default" },
  partially_received: { label: "Parcial", variant: "warning" },
  received: { label: "Recebido", variant: "success" },
  compared: { label: "Comparado", variant: "success" },
  decided: { label: "Decidido", variant: "success" },
  cancelled: { label: "Cancelado", variant: "secondary" },
};

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("suppliers");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              ←
            </Button>
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Fornecedores</h1>
              <p className="text-xs text-slate-500">Propostas e comparação estruturada</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Novo Pedido
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Fornecedor
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
            <TabsTrigger value="rfps">Pedidos de Proposta</TabsTrigger>
            <TabsTrigger value="comparison">Comparador</TabsTrigger>
          </TabsList>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar fornecedores..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSuppliers.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{supplier.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">{supplier.category}</Badge>
                        </div>
                      </div>
                      <Badge variant={supplier.status === "active" ? "success" : "secondary"}>
                        {supplier.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-lg ${star <= Math.round(supplier.rating) ? "text-amber-400" : "text-slate-200"}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-slate-500">{supplier.rating}/5</span>
                      </div>

                      {/* Contact */}
                      <div className="text-sm">
                        <p className="font-medium">{supplier.contacts[0].name}</p>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Mail className="w-3 h-3" />
                          {supplier.contacts[0].email}
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Phone className="w-3 h-3" />
                          {supplier.contacts[0].phone}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="text-center">
                          <p className="text-lg font-semibold">{supplier.proposals}</p>
                          <p className="text-xs text-slate-500">Propostas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-emerald-600">{supplier.accepted}</p>
                          <p className="text-xs text-slate-500">Aceites</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-amber-600">
                            {Math.round((supplier.accepted / supplier.proposals) * 100)}%
                          </p>
                          <p className="text-xs text-slate-500">Taxa</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* RFPs Tab */}
          <TabsContent value="rfps">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockRFPs.map((rfp) => {
                    const status = rfpStatusConfig[rfp.status];
                    const progress = (rfp.proposalsReceived / rfp.suppliersInvited) * 100;
                    
                    return (
                      <div key={rfp.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                              <Scale className="w-6 h-6 text-slate-500" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{rfp.title}</h3>
                                <Badge variant={status.variant}>{status.label}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {rfp.condominium}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Prazo: {new Date(rfp.deadline).toLocaleDateString("pt-PT")}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{rfp.proposalsReceived}/{rfp.suppliersInvited}</p>
                              <Progress value={progress} className="w-20 h-2 mt-1" />
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Comparador de Propostas</CardTitle>
                <CardDescription>
                  Compare propostas lado a lado com base comum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Scale className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Selecione um pedido de proposta para comparar propostas</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
