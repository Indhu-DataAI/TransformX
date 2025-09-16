import React, { useState } from 'react';
import { ChevronRight, Code, Activity, Building, ShoppingCart, Banknote, Users, Server } from 'lucide-react';
import HomePage from './components/HomePage';
import VerticalPage from './components/VerticalPage';
import { ProjectLoader } from './components/ProjectLoader';
import { Project, Vertical } from './types/Project';
// import { ragEvaluatorProject } from './config/ragProject';

const verticals: Vertical[] = [
  {
    id: 'rai-hub',
    title: 'Responsible AI',
    icon: <Building className="w-8 h-8" />,
    description: 'From outputs to insights, Responsible AI made measurable.',
    image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
    projects: [
      // ragEvaluatorProject, // Your integrated RAG project
      {
        id: 'rai-hub-legacy',
        name: 'Responsible AI (RAI) Hub',
        description: 'AI-powered interface design and development assistant',
        image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
        appUrl: 'https://deep-eval.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['responsible-ai', 'legacy']
      }
    ]
  },
  {
    id: 'ai-sdlc',
    title: 'AI at SDLC',
    icon: <Code className="w-8 h-8" />,
    description: 'Accelerate software development with AI-powered tools',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    projects: [
      {
        id: 'ui-assistant',
        name: 'UI Code Refactorer',
        description: 'AI-powered interface design and development assistant',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        appUrl: 'https://ui-code-gen.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['ui', 'development']
      },
      {
        id: 'api-code-assistant',
        name: 'API Code Assistant',
        description: 'Intelligent API development and integration support',
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        appUrl: 'https://api-code-gen-azo4.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['api']
      },
      {
        id: 'ui-code-assistant',
        name: 'UI Code Generator',
        description: 'AI-powered interface design and development assistant',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        appUrl: ' https://ui-code-generator-7jmj.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['ui', 'development']
      }
    ]
  },
  {
    id: 'local_modlel',
    title: 'BCT AI Studio',
    icon: <Server className="w-8 h-8" />,
    description: 'Enabling AI innovation with secure,offline and local execution.',
    image: 'https://media.istockphoto.com/id/2154346292/photo/3d-icon-illustration-of-ai-server-with-chip.jpg?s=1024x1024&w=is&k=20&c=0cqRUg8SPRt1xcJDklifPeuFQyMKNZbRgaJmPgUXBP8=',
    projects: [
      // ragEvaluatorProject, // Your integrated RAG project
      {
        id: 'model',
        name: ' On-Premise LLM Service',
        description: 'Run and manage AI modls locally with full control and privacy',
        image: "/src/public/ai_studio.jpg",
        appUrl: 'https://on-prem-service.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['AI-studio', 'legacy']
      }
    ]
  },{
    id: 'ml-flow',
    title: 'BCT ML Studio',
    icon: <Server className="w-8 h-8" />,
    description: 'Build. Train. Experiment. Export.',
    image: '/src/public/ml_studio.jpg',
    projects: [
      // ragEvaluatorProject, // Your integrated RAG project
      {
        id: 'ML-FLOW',
        name: 'ML Platform',
        description: 'From data to model—ready for your use',
        image: "/src/public/ml_studio.jpg",
        appUrl: 'https://ml-platform-train.onrender.com',
        integrationType: 'iframe',
        status: 'active',
        tags: ['ML-studio', 'legacy']
      },
      {
        id: 'bottleneck',
        name: 'Service Performance Bottleneck Predictor',
        description: 'Track. Analyze. Optimize performance.',
        image: "/src/public/bottleneck.jpg",
        appUrl: 'http://localhost:8501',
        integrationType: 'iframe',
        status: 'active',
        tags: ['ML-studio', 'legacy']
      },
    
      {
        id: 'anamoly',
        name: 'Anamoly Detection',
        description: 'Track. Analyze. Optimize performance.',
        image: "/src/public/bottleneck.jpg",
        appUrl: 'https://anomaly-detection-pyto.onrender.com/',
        integrationType: 'iframe',
        status: 'active',
        tags: ['ML-studio', 'legacy']
      }
    ]
  },

  // {
  //   id: 'medtech',
  //   title: 'Medtech Accelerators',
  //   icon: <Activity className="w-8 h-8" />,
  //   description: 'Healthcare technology solutions powered by AI',
  //   image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
  //   projects: [
  //     {
  //       id: 'report-generator',
  //       name: 'Report Generator',
  //       description: 'Automated medical report generation and analysis',
  //       image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['medical', 'reports']
  //     },
  //     {
  //       id: 'image-classification',
  //       name: 'Image Classification',
  //       description: 'Advanced medical imaging analysis and diagnosis support',
  //       image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['medical', 'imaging']
  //     },
  //     {
  //       id: 'narrative-writing',
  //       name: 'Narrative Writing',
  //       description: 'AI-assisted clinical documentation and notes',
  //       image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['medical', 'documentation']
  //     },
  //     {
  //       id: 'med-gamma',
  //       name: 'Med Gamma',
  //       description: 'Comprehensive medical AI platform integration',
  //       image: 'https://images.pexels.com/photos/3825574/pexels-photo-3825574.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['medical', 'platform']
  //     }
  //   ]
  // },  {
  //   id: 'enterprise',
  //   title: 'Enterprise Accelerators',
  //   icon: <Building className="w-8 h-8" />,
  //   description: 'Enterprise-grade AI solutions for business operations',
  //   image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
  //   projects: [
  //     {
  //       id: 'image-search',
  //       name: 'Image Search',
  //       description: 'Intelligent visual content discovery and management',
  //       image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['enterprise', 'search']
  //     },
  //     {
  //       id: 'text-summarizer',
  //       name: 'Text Summarizer',
  //       description: 'Advanced document summarization and analysis',
  //       image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
  //       appUrl: '',
  //       integrationType: 'component',
  //       componentName: 'TextSummarizerComponent',
  //       status: 'active',
  //       tags: ['enterprise', 'nlp']
  //     },
  //     {
  //       id: 'invoice-extractor',
  //       name: 'Invoice Extractor',
  //       description: 'Automated invoice processing and data extraction',
  //       image: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['enterprise', 'extraction']
  //     },
  //     {
  //       id: 'code-generator',
  //       name: 'Code Generator',
  //       description: 'AI-powered code generation and optimization',
  //       image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['enterprise', 'code']
  //     },
  //     {
  //       id: 'document-generator',
  //       name: 'Document Generator',
  //       description: 'Intelligent document creation and formatting',
  //       image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['enterprise', 'documents']
  //     }
  //   ]
  // },
  // {
  //   id: 'retail',
  //   title: 'Retail Accelerators',
  //   icon: <ShoppingCart className="w-8 h-8" />,
  //   description: 'AI-driven retail optimization and customer experience',
  //   image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
  //   projects: [
  //     {
  //       id: 'store-navigator',
  //       name: 'Store Navigator',
  //       description: 'Intelligent store layout optimization and navigation',
  //       image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['retail', 'navigation']
  //     },
  //     {
  //       id: 'ai-bi',
  //       name: 'AI/BI',
  //       description: 'Advanced retail analytics and business intelligence',
  //       image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['retail', 'analytics']
  //     }
  //   ]
  // },
  // {
  //   id: 'banking',
  //   title: 'Banking Accelerators',
  //   icon: <Banknote className="w-8 h-8" />,
  //   description: 'Financial technology solutions with AI integration',
  //   image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg',
  //   projects: [
  //     {
  //       id: 'banking-chat-assistant',
  //       name: 'Chat Assistant',
  //       description: 'Intelligent banking customer service and support',
  //       image: 'https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['banking', 'chat']
  //     }
  //   ]
  // },
  // {
  //   id: 'public',
  //   title: 'Public Accelerators',
  //   icon: <Users className="w-8 h-8" />,
  //   description: 'AI solutions for public sector and citizen services',
  //   image: 'https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg',
  //   projects: [
  //     {
  //       id: 'public-chat-assistant',
  //       name: 'Chat Assistant',
  //       description: 'Public service chatbot for citizen inquiries and support',
  //       image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg',
  //       appUrl: '',
  //       integrationType: 'iframe',
  //       status: 'development',
  //       tags: ['public', 'chat']
  //     }
  //   ]
  // }
];

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleVerticalClick = (vertical: Vertical) => {
    setSelectedVertical(vertical);
    setCurrentPage('vertical');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedVertical(null);
    setSelectedProject(null);
  };

  const handleBackToVertical = () => {
    setCurrentPage('vertical');
    setSelectedProject(null);
  };

  // Project view
  if (currentPage === 'project' && selectedProject) {
    return (
      <ProjectLoader 
        project={selectedProject} 
        onBack={selectedVertical ? handleBackToVertical : handleBackToHome}
      />
    );
  }

  // Vertical view
  if (currentPage === 'vertical' && selectedVertical) {
    return (
      <VerticalPage 
        vertical={selectedVertical} 
        onBack={handleBackToHome} 
        onProjectClick={handleProjectClick}
      />
    );
  }

  // Home view
  return <HomePage verticals={verticals} onVerticalClick={handleVerticalClick} />;
}

export default App;
