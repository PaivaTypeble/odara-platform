// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Dashboard
  dashboard: {
    stats: `${API_BASE_URL}/dashboard/stats`,
    recentActivity: `${API_BASE_URL}/dashboard/recent-activity`,
    objectivesByStatus: `${API_BASE_URL}/dashboard/objectives-by-status`,
    objectivesByCondominium: `${API_BASE_URL}/dashboard/objectives-by-condominium`,
  },
  // Condominiums
  condominiums: {
    list: `${API_BASE_URL}/condominiums`,
    byId: (id: string) => `${API_BASE_URL}/condominiums/${id}`,
  },
  // Objectives
  objectives: {
    list: `${API_BASE_URL}/objectives`,
    byId: (id: string) => `${API_BASE_URL}/objectives/${id}`,
    updates: (id: string) => `${API_BASE_URL}/objectives/${id}/updates`,
  },
  // Assemblies
  assemblies: {
    list: `${API_BASE_URL}/assemblies`,
    byId: (id: string) => `${API_BASE_URL}/assemblies/${id}`,
  },
  // Suppliers
  suppliers: {
    list: `${API_BASE_URL}/suppliers`,
    byId: (id: string) => `${API_BASE_URL}/suppliers/${id}`,
    rfp: `${API_BASE_URL}/suppliers/rfp`,
  },
  // Assets
  assets: {
    list: `${API_BASE_URL}/assets`,
    byId: (id: string) => `${API_BASE_URL}/assets/${id}`,
    maintenance: (id: string) => `${API_BASE_URL}/assets/${id}/maintenance`,
  },
};

export default API_ENDPOINTS;
