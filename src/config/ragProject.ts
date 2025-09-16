import { Project } from '../types/Project';
import { Code } from 'lucide-react';

export const ragEvaluatorProject: Project = {
  id: 'rag-evaluator',
  name: 'RAG Evaluator',
  description: 'Comprehensive evaluation toolkit for RAG systems with metrics like contextual relevancy, precision, and recall',
  image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  appUrl: 'http://localhost:5173/', // Your RAG frontend URL
  integrationType: 'api',
  status: 'active',
  tags: ['responsible-ai', 'evaluation', 'rag', 'nlp'],
  componentName: 'RAGEvaluatorComponent',
  api: {
    baseUrl: 'http://localhost:8000', // Your FastAPI backend URL
    endpoints: {
      health: {
        method: 'GET',
        url: '/health',
      },
      evaluate: {
        method: 'POST',
        url: '/evaluate',
        headers: { 'Content-Type': 'multipart/form-data' }
      },
      download: {
        method: 'GET',
        url: '/download',
      }
    }
  }
};
