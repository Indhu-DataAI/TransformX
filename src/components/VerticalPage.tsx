import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Project, Vertical } from '../types/Project';

interface VerticalPageProps {
  vertical: Vertical;
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}



function VerticalPage({ vertical, onBack, onProjectClick }: VerticalPageProps) {
  const handleProjectClick = (project: Project) => {
    if ((project.integrationType === "api" || project.integrationType === "component") &&
    project.componentName) {
      // Use our custom component integration
      onProjectClick(project);
    } else if (project.appUrl) {
      // For iframe projects or external links
      if (project.integrationType === 'iframe') {
        onProjectClick(project);
      } else {
        // External link - open in new tab
        window.open(project.appUrl, '_blank');
      }
    } else {
      alert('This project is currently under development');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'development':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">In Development</span>;
      case 'maintenance':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Maintenance</span>;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-indigo-950 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={onBack}
                className="mr-6 p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-4xl font-bold tracking-tight">TransformX</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Vertical Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img 
            src={vertical.image} 
            alt={vertical.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-950 text-white p-6 rounded-2xl">
              {vertical.icon}
            </div>
          </div>
          <h2 className="text-6xl font-bold mb-8 tracking-tight">{vertical.title}</h2>
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {vertical.description}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-indigo-950 mb-6">Our Projects</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the innovative AI solutions we've developed for {vertical.title.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vertical.projects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-indigo-950 group-hover:text-gray-800 transition-colors duration-300 flex-1">
                      {project.name}
                    </h4>
                    {project.integrationType === 'api' && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">API</span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <button
                    onClick={() => handleProjectClick(project)}
                    disabled={project.status === 'maintenance'}
                    className="w-full bg-indigo-950 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {project.status === 'maintenance' ? 'Under Maintenance' : 'Open Project'}
                    {project.integrationType !== 'api' && <ExternalLink className="h-4 w-4" />}
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default VerticalPage;
