"use client";

import { useState } from "react";
import { Users, Plus, Search, MoreHorizontal, Shield, Mail, Trash2, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  { id: "1", name: "Admin User", email: "admin@odara.pt", role: "Admin", status: "Ativo", lastLogin: "2024-03-25" },
  { id: "2", name: "Maria Silva", email: "maria.silva@odara.pt", role: "Gestor", status: "Ativo", lastLogin: "2024-03-24" },
  { id: "3", name: "João Costa", email: "joao.costa@odara.pt", role: "Operador", status: "Ativo", lastLogin: "2024-03-23" },
  { id: "4", name: "Ana Santos", email: "ana.santos@email.pt", role: "Visualizador", status: "Inativo", lastLogin: "2024-03-10" },
];

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-800",
  Gestor: "bg-blue-100 text-blue-800",
  Operador: "bg-green-100 text-green-800",
  Visualizador: "bg-slate-100 text-slate-800",
};

export default function UtilizadoresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Utilizadores</h1>
            <p className="text-sm text-slate-500">{users.length} utilizadores registados</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Utilizador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todos os Utilizadores</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Pesquisar..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizador</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-odara-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-odara-700">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role] || "bg-slate-100"}>
                      {user.role === "Admin" && <Shield className="w-3 h-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Ativo" ? "success" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(user.lastLogin).toLocaleDateString("pt-PT")}
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

      <Card>
        <CardHeader>
          <CardTitle>Permissões por Função</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="font-medium">Admin</span>
              </div>
              <p className="text-sm text-slate-500">Acesso completo a todas as funcionalidades do sistema</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Gestor</span>
              </div>
              <p className="text-sm text-slate-500">Pode gerir condomínios, objetivos e assembleias</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Edit className="w-5 h-5 text-green-600" />
                <span className="font-medium">Operador</span>
              </div>
              <p className="text-sm text-slate-500">Pode criar e atualizar objetivos e manutenções</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
