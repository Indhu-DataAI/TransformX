import { Project } from '../types/Project';
import { Loader2, ArrowLeft } from 'lucide-react';
import React, { lazy } from "react";
import ErrorBoundary from './ErrorBoundary';

// Dynamic imports for better code splitting
const componentMap = {
  RAGEvaluatorComponent: lazy(() => 
    import('./projects/RAGEvaluatorComponent').then(m => ({ default: m.RAGEvaluatorComponent }))
  ),
  TextSummarizerComponent: lazy(() => 
    import('./projects/textSummarizer/SimpleTextSummarizer')
  ),
};

interface ProjectLoaderProps {
  project: Project;
  onBack: () => void;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center gap-3 text-gray-600">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span>Loading project...</span>
    </div>
  </div>
);

const ErrorFallback = ({ project }: { project: Project }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-red-800 mb-2">
        Failed to Load Project
      </h2>
      <p className="text-red-600 mb-4">
        Unable to load the {project.name} component.
      </p>
      <p className="text-sm text-red-500">
        Please check if the project API is running at {project.api?.baseUrl}
      </p>
    </div>
  </div>
);

export const ProjectLoader: React.FC<ProjectLoaderProps> = ({ project, onBack }) => {
  // Debug logging
  console.log('ProjectLoader - Project:', project);
  console.log('Integration Type:', project.integrationType);
  console.log('Component Name:', project.componentName);

  // Handle component integration
  if (project.integrationType === 'component' && project.componentName) {
    const Component = componentMap[project.componentName as keyof typeof componentMap];
    console.log('Found Component:', Component);
    
    if (!Component) {
      console.error('Component not found for:', project.componentName);
      return <ErrorFallback project={project} />;
    }

    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Platform
          </button>
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>
        
        {/* Component Content */}
        <div className="flex-1">
          <ErrorBoundary>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Component />
            </React.Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  }

  // Handle iframe integration for non-API projects
  if (project.integrationType === 'iframe') {
    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>
        
        {/* Iframe Content */}
        <iframe
          src={project.appUrl}
          className="flex-1 w-full border-0"
          title={project.name}
        />
      </div>
    );
  }

  // Handle API-based integration
  if (project.integrationType === 'api' && project.componentName) {
    const Component = componentMap[project.componentName as keyof typeof componentMap];
    
    if (!Component) {
      return <ErrorFallback project={project} />;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Platform
          </button>
          <h1 className="text-xl font-semibold">{project.name}</h1>
        </div>
        
        <React.Suspense fallback={<LoadingSpinner />}>
          <Component />
        </React.Suspense>
      </div>
    );
  }

  return <ErrorFallback project={project} />;
};