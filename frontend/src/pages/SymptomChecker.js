import React, { useState } from 'react';
import { Heart, Send, AlertCircle, Loader2 } from 'lucide-react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Symptom Checker</h1>
          <p className="text-lg text-gray-600">
            Describe your symptoms and get AI-powered preliminary analysis
          </p>
        </div>

        <div className="medical-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your symptoms
              </label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                rows="6"
                placeholder="Please describe your symptoms in detail... For example: 'I have had a headache for 3 days, it's worse in the morning, and I also feel nauseous.'"
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analyzing symptoms...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Analyze Symptoms</span>
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Analysis Results</h3>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700">{result.analysis}</p>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Disclaimer:</strong> This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;