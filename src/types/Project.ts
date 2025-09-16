// types/Project.ts
export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  params?: string[];
  headers?: Record<string, string>;
}

export interface ProjectAPI {
  baseUrl: string;
  endpoints: {
    [key: string]: APIEndpoint;
  };
  auth?: {
    type: 'bearer' | 'apikey' | 'basic';
    headerName?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  appUrl: string;
  api?: ProjectAPI;
  integrationType: 'iframe' | 'api' | 'hybrid' | 'component';
  status: 'active' | 'development' | 'maintenance';
  tags: string[];
  componentName?: string; // For dynamic component loading
}

export interface Vertical {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  projects: Project[];
}
