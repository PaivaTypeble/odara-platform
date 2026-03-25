"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, Search, Filter, MoreHorizontal, MapPin, Users, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { condominiumsApi, Condominium } from "@/lib/api-client";

export default function CondominiumsPage() {
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [filteredCondos, setFilteredCondos] = useState<Condominium[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCondominiums() {
      try {
        setLoading(true);
        const data = await condominiumsApi.getAll();
        setCondominiums(data);
        setFilteredCondos(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch condominiums:", err);
        setError("Erro ao carregar condomínios. A usar dados de demonstração.");
        // Demo data on error
        const demoData: Condominium[] = [
          { id: "1", name: "Condomínio Parque das Flores", fractionCount: 24, elevatorCount: 1, isActive: true, address: "Rua das Flores, 123", city: "Lisboa", createdAt: new Date().toISOString() },
          { id: "2", name: "Condomínio Vista Mar", fractionCount: 32, elevatorCount: 2, isActive: true, address: "Av. Marginal, 456", city: "Cascais", createdAt: new Date().toISOString() },
          { id: "3", name: "Prédio Central", fractionCount: 16, elevatorCount: 0, isActive: true, address: "Rua Principal, 78", city: "Porto", createdAt: new Date().toISOString() },
        ];
        setCondominiums(demoData);
        setFilteredCondos(demoData);
      } finally {
        setLoading(false);
      }
    }
    fetchCondominiums();
  }, []);

  useEffect(() => {
    const filtered = condominiums.filter(
      (condo) =>
        condo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (condo.city?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    );
    setFilteredCondos(filtered);
  }, [searchTerm, condominiums]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              ←
            </Button>
            <div className="w-10 h-10 bg-odara-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Condomínios</h1>
              <p className="text-xs text-slate-500">{condominiums.length} condomínios sob gestão</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Condomínio
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Pesquisar condomínio..."
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

        {/* Condominiums Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condomínio</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Frações</TableHead>
                  <TableHead>Elevadores</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : filteredCondos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Nenhum condomínio encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCondos.map((condo) => (
                    <TableRow key={condo.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{condo.name}</p>
                          <p className="text-sm text-slate-500">{condo.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <MapPin className="w-3 h-3" />
                          {condo.city || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          {condo.fractionCount}
                        </div>
                      </TableCell>
                      <TableCell>{condo.elevatorCount}</TableCell>
                      <TableCell>
                        <Badge variant={condo.isActive ? "success" : "secondary"}>
                          {condo.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
