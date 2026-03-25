// Types
export interface DashboardStats {
  totalCondominiums: number;
  activeObjectives: number;
  overdueObjectives: number;
  blockedObjectives: number;
  openRFPs: number;
  pendingProposals: number;
  maintenanceDue: number;
  maintenanceOverdue: number;
}

export interface Activity {
  type: string;
  id: string;
  title: string;
  status: string;
  condominium: string;
  updatedAt: string;
}

export interface Condominium {
  id: string;
  name: string;
  fractionCount: number;
  elevatorCount: number;
  isActive: boolean;
  address?: string;
  city?: string;
  createdAt: string;
}

export interface Objective {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  ownerName?: string;
  targetDate?: string;
  progress: number;
  nextAction?: string;
  isPublic: boolean;
  condominiumName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Assembly {
  id: string;
  title: string;
  assemblyDate: string;
  type: string;
  status: string;
  condominiumName: string;
  decisionCount: number;
  objectiveCount: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  categoryName?: string;
  status: string;
  rating?: number;
  primaryContact?: string;
  proposalCount: number;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  categoryName?: string;
  status: string;
  condition: string;
  condominiumName: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  createdAt: string;
}

export interface MaintenanceEvent {
  id: string;
  title: string;
  type: string;
  status: string;
  assetName?: string;
  condominiumName: string;
  scheduledDate?: string;
  completedDate?: string;
  cost?: number;
  createdAt: string;
}

// API Client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Dashboard API
export const dashboardApi = {
  getStats: () => fetchApi<DashboardStats>(`${API_BASE_URL}/dashboard/stats`),
  getRecentActivity: (limit = 10) =>
    fetchApi<Activity[]>(`${API_BASE_URL}/dashboard/recent-activity?limit=${limit}`),
  getObjectivesByStatus: () =>
    fetchApi<{ status: string; count: number }[]>(`${API_BASE_URL}/dashboard/objectives-by-status`),
  getObjectivesByCondominium: () =>
    fetchApi<{ condominium: string; count: number }[]>(`${API_BASE_URL}/dashboard/objectives-by-condominium`),
};

// Condominiums API
export const condominiumsApi = {
  getAll: (search?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    const query = params.toString();
    return fetchApi<Condominium[]>(`${API_BASE_URL}/condominiums${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => fetchApi<Condominium>(`${API_BASE_URL}/condominiums/${id}`),
  create: (data: Partial<Condominium>) =>
    fetchApi<Condominium>(`${API_BASE_URL}/condominiums`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Condominium>) =>
    fetchApi<Condominium>(`${API_BASE_URL}/condominiums/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi<void>(`${API_BASE_URL}/condominiums/${id}`, { method: 'DELETE' }),
};

// Objectives API
export const objectivesApi = {
  getAll: (params?: { condominiumId?: string; status?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.condominiumId) queryParams.append('condominiumId', params.condominiumId);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    const query = queryParams.toString();
    return fetchApi<Objective[]>(`${API_BASE_URL}/objectives${query ? `?${query}` : ''}`);
  },
  getById: (id: string) => fetchApi<Objective>(`${API_BASE_URL}/objectives/${id}`),
  create: (data: Partial<Objective>) =>
    fetchApi<Objective>(`${API_BASE_URL}/objectives`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Objective>) =>
    fetchApi<Objective>(`${API_BASE_URL}/objectives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  addUpdate: (id: string, content: string, newProgress?: number, newStatus?: string) =>
    fetchApi<Objective>(`${API_BASE_URL}/objectives/${id}/updates`, {
      method: 'POST',
      body: JSON.stringify({ content, newProgress, newStatus }),
    }),
  delete: (id: string) =>
    fetchApi<void>(`${API_BASE_URL}/objectives/${id}`, { method: 'DELETE' }),
};

// Assemblies API
export const assembliesApi = {
  getAll: (condominiumId?: string) => {
    const query = condominiumId ? `?condominiumId=${condominiumId}` : '';
    return fetchApi<Assembly[]>(`${API_BASE_URL}/assemblies${query}`);
  },
  getById: (id: string) => fetchApi<Assembly>(`${API_BASE_URL}/assemblies/${id}`),
};

// Suppliers API
export const suppliersApi = {
  getAll: (search?: string) => {
    const query = search ? `?search=${search}` : '';
    return fetchApi<Supplier[]>(`${API_BASE_URL}/suppliers${query}`);
  },
  getById: (id: string) => fetchApi<Supplier>(`${API_BASE_URL}/suppliers/${id}`),
};

// Assets API
export const assetsApi = {
  getAll: (condominiumId?: string) => {
    const query = condominiumId ? `?condominiumId=${condominiumId}` : '';
    return fetchApi<Asset[]>(`${API_BASE_URL}/assets${query}`);
  },
  getById: (id: string) => fetchApi<Asset>(`${API_BASE_URL}/assets/${id}`),
};

export default {
  dashboard: dashboardApi,
  condominiums: condominiumsApi,
  objectives: objectivesApi,
  assemblies: assembliesApi,
  suppliers: suppliersApi,
  assets: assetsApi,
};
