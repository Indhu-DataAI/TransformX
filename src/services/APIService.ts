// services/APIService.ts
import { ProjectAPI, APIEndpoint } from '../types/Project';

export class APIService {
  private static instance: APIService;
  private authTokens: Map<string, string> = new Map();

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  setAuthToken(projectId: string, token: string) {
    this.authTokens.set(projectId, token);
  }

  private buildHeaders(api: ProjectAPI, projectId: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (api.auth) {
      const token = this.authTokens.get(projectId);
      if (token) {
        switch (api.auth.type) {
          case 'bearer':
            headers['Authorization'] = `Bearer ${token}`;
            break;
          case 'apikey':
            headers[api.auth.headerName || 'X-API-Key'] = token;
            break;
        }
      }
    }

    return headers;
  }

  async callAPI(
    projectId: string,
    api: ProjectAPI,
    endpointName: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<any> {
    const endpoint = api.endpoints[endpointName];
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointName} not found`);
    }

    let url = `${api.baseUrl}${endpoint.url}`;
    
    // Replace URL parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`{${key}}`, encodeURIComponent(value));
      });
    }

    // Add query parameters for GET requests
    if (endpoint.method === 'GET' && data) {
      const queryParams = new URLSearchParams(data);
      url += `?${queryParams}`;
    }

    const headers = this.buildHeaders(api, projectId);

    const requestOptions: RequestInit = {
      method: endpoint.method,
      headers,
    };

    if (endpoint.method !== 'GET' && data) {
      if (data instanceof FormData) {
        // Remove Content-Type for FormData to let browser set boundary
        delete headers['Content-Type'];
        requestOptions.body = data;
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(`API call failed for ${projectId}.${endpointName}:`, error);
      throw error;
    }
  }

  // Specialized method for RAG evaluation
  async evaluateRAG(projectId: string, api: ProjectAPI, agentType: string, modelName: string, file: File) {
    const formData = new FormData();
    formData.append('agent_type', agentType);
    formData.append('model_name', modelName);
    formData.append('file', file);

    return this.callAPI(projectId, api, 'evaluate', formData);
  }

  async getResults(projectId: string, api: ProjectAPI) {
    return this.callAPI(projectId, api, 'download');
  }

  async healthCheck(projectId: string, api: ProjectAPI) {
    return this.callAPI(projectId, api, 'health');
  }
}
