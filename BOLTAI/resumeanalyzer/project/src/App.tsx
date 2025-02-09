import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';
import { uploadResume, AnalysisResult } from './services/api';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadResume(file);
      setAnalysis(result);
    } catch (err) {
      setError('Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">ATS Resume Analyzer</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-3" />
                <span className="text-gray-600">
                  {file ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {file.name}
                    </div>
                  ) : (
                    'Drop your resume here or click to browse'
                  )}
                </span>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>

          {analysis && (
            <div className="mt-8 space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                  <CheckCircle className="h-5 w-5" />
                  Analysis Complete
                </div>
                <div className="text-lg font-semibold mb-4">
                  ATS Score: {analysis.score.toFixed(2)}
                </div>
                
                <h3 className="font-medium mb-2">Keyword Matches:</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(analysis.keywordMatches).map(([keyword, count]) => (
                    <div
                      key={keyword}
                      className="flex justify-between items-center bg-white p-2 rounded"
                    >
                      <span className="font-medium">{keyword}</span>
                      <span className="text-gray-600">{count} matches</span>
                    </div>
                  ))}
                </div>

                {analysis.suggestions.length > 0 && (
                  <>
                    <h3 className="font-medium mb-2">Suggestions:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-gray-700">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;