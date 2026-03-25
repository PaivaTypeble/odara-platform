"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Target,
  FileText,
  Users,
  Wrench,
  BarChart3,
  Settings,
  Eye,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Bell,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Condomínios", href: "/condominios", icon: Building2 },
  { name: "Assembleias", href: "/assembleias", icon: FileText },
  { name: "Objetivos", href: "/objetivos", icon: Target },
  { name: "Fornecedores", href: "/fornecedores", icon: Users },
  { name: "Manutenção", href: "/manutencao", icon: Wrench },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Portal", href: "/portal", icon: Eye },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(pathname.startsWith("/settings"));

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-odara-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ODARA</h1>
              <p className="text-xs text-slate-400">Gestão Operacional</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-odara-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}

          {/* Settings Section */}
          <div className="pt-4 mt-4 border-t border-slate-800">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
            >
              <span className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Configurações
              </span>
              {settingsOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {settingsOpen && (
              <div className="mt-1 ml-4 space-y-1">
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    pathname === "/settings"
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Configuração
                </Link>
                <Link
                  href="/settings/utilizadores"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    pathname === "/settings/utilizadores"
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Utilizadores
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-odara-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@odara.pt</p>
            </div>
            <button className="p-1 hover:bg-slate-800 rounded">
              <Bell className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
