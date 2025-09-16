import React, { useState, useRef } from 'react';
import { Upload, Play, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { APIService } from '../../services/APIService';
import { Project } from '../../types/Project';

interface RAGEvaluatorProps {
  project: Project;
}

interface EvaluationResults {
  status: string;
  results?: any[];
  metrics?: Record<string, number>;
  error?: string;
}

export const RAGEvaluatorComponent: React.FC<RAGEvaluatorProps> = ({ project }) => {
  const [agentType, setAgentType] = useState('qa');
  const [modelName, setModelName] = useState('gpt-4o-mini');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<EvaluationResults | null>(null);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiService = APIService.getInstance();

  // Check if backend is healthy
  const checkHealth = async () => {
    if (!project.api) return;
    
    try {
      await apiService.healthCheck(project.id, project.api);
      setIsHealthy(true);
    } catch (error) {
      setIsHealthy(false);
      console.error('Health check failed:', error);
    }
  };

  React.useEffect(() => {
    checkHealth();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/json') {
        setSelectedFile(file);
      } else {
        alert('Please select a JSON file');
      }
    }
  };

  const handleEvaluation = async () => {
    if (!selectedFile || !project.api) return;

    setLoading(true);
    setResults(null);

    try {
      const response = await apiService.evaluateRAG(
        project.id,
        project.api,
        agentType,
        modelName,
        selectedFile
      );
      setResults(response);
    } catch (error) {
      setResults({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResults = async () => {
    if (!project.api) return;

    try {
      const response = await apiService.getResults(project.id, project.api);
      const blob = new Blob([JSON.stringify(response, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'evaluation_results.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const formatMetricValue = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">RAG Evaluator</h2>
        <p className="text-gray-600">
          Evaluate your RAG (Retrieval-Augmented Generation) systems with comprehensive metrics
        </p>
        
        {/* Health Status */}
        <div className="mt-4 flex items-center gap-2">
          {isHealthy === true && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Backend service is running</span>
            </div>
          )}
          {isHealthy === false && (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="h-4 w-4" />
              <span className="text-sm">Backend service is not available</span>
            </div>
          )}
          {isHealthy === null && (
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Checking backend status...</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Evaluation Configuration</h3>
          
          <div className="space-y-4">
            {/* Agent Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Type
              </label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="qa">Question Answering</option>
                <option value="summarization">Text Summarization</option>
                <option value="multiturn">Multi-turn Conversation</option>
              </select>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Name
              </label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dataset File (JSON)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">Click to upload JSON dataset</p>
                      <p className="text-xs text-gray-400">Supports .json files</p>
                    </div>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Run Evaluation Button */}
            <button
              onClick={handleEvaluation}
              disabled={!selectedFile || loading || isHealthy !== true}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              {loading ? 'Running Evaluation...' : 'Run Evaluation'}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Evaluation Results</h3>
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>Running evaluation...</span>
              </div>
            </div>
          )}

          {!loading && !results && (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Results will appear here after running evaluation</p>
            </div>
          )}

          {results && results.status === 'success' && (
            <div className="space-y-6">
              {/* Metrics Summary */}
              {results.metrics && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(results.metrics).map(([metric, value]) => (
                      <div key={metric} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {metric.replace(/_/g, ' ')}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatMetricValue(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Table Preview */}
              {results.results && results.results.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium">Detailed Results ({results.results.length} items)</h4>
                    <button
                      onClick={downloadResults}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(results.results[0]).slice(0, 4).map((key) => (
                              <th
                                key={key}
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {key.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.results.slice(0, 5).map((row, index) => (
                            <tr key={index}>
                              {Object.values(row).slice(0, 4).map((value: any, colIndex) => (
                                <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                                  {typeof value === 'number' ? 
                                    formatMetricValue(value) : 
                                    String(value).length > 50 ? 
                                      String(value).substring(0, 50) + '...' : 
                                      String(value)
                                  }
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {results.results.length > 5 && (
                      <div className="bg-gray-50 px-4 py-3 text-sm text-gray-500 text-center">
                        Showing first 5 of {results.results.length} results. Download for complete data.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {results && results.status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center gap-3 text-red-800 mb-2">
                <XCircle className="h-5 w-5" />
                <h4 className="font-semibold">Evaluation Failed</h4>
              </div>
              <p className="text-red-700">{results.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
