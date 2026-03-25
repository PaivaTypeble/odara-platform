"use client";

import { useState } from "react";
import { Building2, Plus, Search, Filter, MoreHorizontal, MapPin, Users, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

// Mock data for condominiums
const mockCondominiums = [
  {
    id: "1",
    name: "Condomínio Parque das Flores",
    address: "Rua das Flores, 123",
    city: "Lisboa",
    fractions: 24,
    elevators: 1,
    manager: "Maria Silva",
    objectives: 5,
    pendingActions: 2,
    status: "active",
  },
  {
    id: "2",
    name: "Condomínio Vista Mar",
    address: "Av. Marginal, 456",
    city: "Cascais",
    fractions: 32,
    elevators: 2,
    manager: "João Costa",
    objectives: 8,
    pendingActions: 3,
    status: "active",
  },
  {
    id: "3",
    name: "Prédio Central",
    address: "Rua Principal, 78",
    city: "Porto",
    fractions: 16,
    elevators: 0,
    manager: "Ana Rodrigues",
    objectives: 3,
    pendingActions: 1,
    status: "active",
  },
  {
    id: "4",
    name: "Residencial Soleil",
    address: "Rua do Sol, 200",
    city: "Faro",
    fractions: 48,
    elevators: 3,
    manager: "Pedro Santos",
    objectives: 12,
    pendingActions: 5,
    status: "active",
  },
];

export default function CondominiumsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCondominiums = mockCondominiums.filter(
    (condo) =>
      condo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condo.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <p className="text-xs text-slate-500">16 condomínios sob gestão</p>
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
                  <TableHead>Gestor</TableHead>
                  <TableHead>Objetivos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCondominiums.map((condo) => (
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
                        {condo.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {condo.fractions}
                      </div>
                    </TableCell>
                    <TableCell>{condo.elevators}</TableCell>
                    <TableCell>{condo.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{condo.objectives} objetivos</Badge>
                        {condo.pendingActions > 0 && (
                          <Badge variant="warning">{condo.pendingActions} pendentes</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">Ativo</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
