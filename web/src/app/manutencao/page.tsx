"use client";

import { useState, useEffect } from "react";
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Bell,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { assetsApi, Asset, MaintenanceEvent } from "@/lib/api-client";

const conditionConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive"; icon: React.ElementType }> = {
  Good: { label: "Bom", variant: "success", icon: CheckCircle2 },
  NeedsAttention: { label: "Atenção", variant: "warning", icon: AlertTriangle },
  Critical: { label: "Crítico", variant: "destructive", icon: AlertTriangle },
};

const eventStatusConfig: Record<string, { label: string; variant: "secondary" | "warning" | "success" | "destructive" }> = {
  Scheduled: { label: "Agendada", variant: "secondary" },
  Due: { label: "Devida", variant: "warning" },
  Completed: { label: "Concluída", variant: "success" },
  Overdue: { label: "Vencida", variant: "destructive" },
  Cancelled: { label: "Cancelada", variant: "secondary" },
};

export default function MaintenancePage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [events, setEvents] = useState<MaintenanceEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("assets");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const assetsData = await assetsApi.getAll();
        const eventsData: MaintenanceEvent[] = [
          { id: "1", title: "Revisão Elevador Principal", type: "Preventive", status: "Scheduled", assetName: "Elevador Principal", condominiumName: "Parque das Flores", scheduledDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
          { id: "2", title: "Reparação Elevador", type: "Corrective", status: "Overdue", assetName: "Elevador Bloco B", condominiumName: "Vista Mar", scheduledDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
          { id: "3", title: "Manutenção Piscina", type: "Preventive", status: "Due", assetName: "Piscina", condominiumName: "Solar Dourado", scheduledDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
        ];
        setAssets(assetsData);
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Erro ao carregar dados. A usar dados de demonstração.");
        const demoAssets: Asset[] = [
          { id: "1", name: "Elevador Principal", categoryName: "Elevadores", status: "Operational", condition: "Good", condominiumName: "Parque das Flores", lastMaintenance: new Date().toISOString(), nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
          { id: "2", name: "Elevador Bloco B", categoryName: "Elevadores", status: "UnderMaintenance", condition: "NeedsAttention", condominiumName: "Vista Mar", lastMaintenance: new Date().toISOString(), nextMaintenance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
          { id: "3", name: "Portão Garagem", categoryName: "Automação", status: "Operational", condition: "Good", condominiumName: "Solar Dourado", lastMaintenance: new Date().toISOString(), nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
        ];
        setAssets(demoAssets);
        setEvents([
          { id: "1", title: "Revisão Elevador", type: "Preventive", status: "Scheduled", assetName: "Elevador", condominiumName: "Parque das Flores", scheduledDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), createdAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const overdueCount = events.filter(e => e.status === "Overdue").length;
  const scheduledCount = events.filter(e => e.status === "Scheduled" || e.status === "Due").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>←</Button>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Manutenção</h1>
              <p className="text-xs text-slate-500">Ativos, planos e conformidade</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Bell className="w-4 h-4 mr-2" />Alertas</Button>
            <Button><Plus className="w-4 h-4 mr-2" />Novo Ativo</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Ativos</CardDescription>
              <CardTitle className="text-3xl">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : assets.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Manutenções Vencidas</CardDescription>
              <CardTitle className="text-3xl text-red-600">{overdueCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Agendadas</CardDescription>
              <CardTitle className="text-3xl">{scheduledCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Estado Crítico</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{assets.filter(a => a.condition === "NeedsAttention" || a.condition === "Critical").length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="assets">Ativos</TabsTrigger>
            <TabsTrigger value="events">Intervenções</TabsTrigger>
            <TabsTrigger value="compliance">Conformidade</TabsTrigger>
          </TabsList>

          <TabsContent value="assets">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Pesquisar ativos..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ativo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Condomínio</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Estado</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Condição</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Próxima</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {assets.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((asset) => {
                        const condition = conditionConfig[asset.condition] || conditionConfig.Good;
                        const ConditionIcon = condition.icon;
                        return (
                          <tr key={asset.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Wrench className="w-5 h-5 text-purple-600" /></div>
                                <div>
                                  <p className="font-medium">{asset.name}</p>
                                  <Badge variant="outline" className="text-xs">{asset.categoryName}</Badge>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3"><div className="flex items-center gap-1 text-sm text-slate-600"><Building2 className="w-3 h-3" />{asset.condominiumName}</div></td>
                            <td className="px-4 py-3"><Badge variant="success">{asset.status}</Badge></td>
                            <td className="px-4 py-3"><Badge variant={condition.variant as "success" | "warning" | "destructive"}><ConditionIcon className="w-3 h-3 mr-1" />{condition.label}</Badge></td>
                            <td className="px-4 py-3 text-sm text-slate-500">{asset.nextMaintenance ? new Date(asset.nextMaintenance).toLocaleDateString("pt-PT") : "-"}</td>
                            <td className="px-4 py-3"><Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {events.length === 0 ? (
                      <div className="p-8 text-center text-slate-500"><Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Nenhuma intervenção encontrada</p></div>
                    ) : events.map((event) => {
                      const status = eventStatusConfig[event.status] || eventStatusConfig.Scheduled;
                      const isOverdue = event.status === "Overdue";
                      return (
                        <div key={event.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isOverdue ? "bg-red-100" : "bg-purple-100"}`}>
                                <Wrench className={`w-6 h-6 ${isOverdue ? "text-red-600" : "text-purple-600"}`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{event.title}</h3>
                                  <Badge variant={status.variant}>{status.label}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                  <div className="flex items-center gap-1"><Building2 className="w-3 h-3" />{event.condominiumName}</div>
                                  {event.scheduledDate && <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.scheduledDate).toLocaleDateString("pt-PT")}</div>}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon"><ChevronRight className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Conformidade e Obrigações</CardTitle>
                <CardDescription>Registos de inspeções e certificações obrigatórias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500"><CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-slate-300" /><p>Configure obrigações de conformidade para os seus condomínios</p></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
