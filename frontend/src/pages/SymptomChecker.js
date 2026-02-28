import React, { useState } from 'react';
import { Heart, Send, AlertCircle, Loader2, AlertTriangle } from 'lucide-react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const validateSymptoms = (text) => {
    if (!text.trim()) {
      return 'Please describe your symptoms';
    }
    if (text.length < 10) {
      return 'Please provide more detail (minimum 10 characters)';
    }
    if (text.length > 1000) {
      return 'Please keep your description under 1000 characters';
    }
    
    // Check for emergency keywords
    const emergencyKeywords = [
      'chest pain', 'chest tightness', 'chest pressure', 'shortness of breath',
      'difficulty breathing', 'severe bleeding', 'loss of consciousness',
      'suicidal', 'self harm', 'overdose'
    ];
    
    const hasEmergency = emergencyKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasEmergency) {
      return '⚠️ EMERGENCY: Based on your symptoms, please call emergency services immediately or go to the nearest emergency room.';
    }
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateSymptoms(symptoms);
    if (validationError && !validationError.includes('EMERGENCY')) {
      setError(validationError);
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
              <div className="relative">
                <textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    setError(validateSymptoms(e.target.value));
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                    error && error.includes('EMERGENCY') 
                      ? 'border-red-500 bg-red-50' 
                      : error 
                      ? 'border-yellow-500' 
                      : 'border-gray-300'
                  }`}
                  rows="6"
                  placeholder="Please describe your symptoms in detail... For example: 'I have had a headache for 3 days, it's worse in the morning, and I also feel nauseous.'"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {symptoms.length}/1000
                </div>
              </div>
            </div>

            {error && (
              <div className={`flex items-start space-x-2 ${
                error.includes('EMERGENCY') ? 'text-red-600 bg-red-50 p-4 rounded-lg border border-red-200' : 'text-red-600'
              }`}>
                {error.includes('EMERGENCY') ? (
                  <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <span className={error.includes('EMERGENCY') ? 'font-semibold' : ''}>{error}</span>
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
            <div className={`mt-8 p-6 rounded-lg border ${
              result.emergency 
                ? 'bg-red-50 border-red-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                result.emergency ? 'text-red-900' : 'text-blue-900'
              }`}>
                {result.emergency ? '🚨 EMERGENCY ALERT' : 'Analysis Results'}
              </h3>
              
              {result.emergency && (
                <div className="mb-4 p-4 bg-red-100 rounded-lg border border-red-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <span className="font-bold text-red-800">IMMEDIATE ACTION REQUIRED</span>
                  </div>
                  <p className="text-red-700 font-semibold">{result.actionRequired}</p>
                </div>
              )}
              
              {result.windsurf_ai ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-md border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Windsurf AI Instructions:</h4>
                    <p className="text-sm text-gray-600 mb-3">{result.instructions}</p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs font-mono text-gray-700 mb-2">Press Ctrl+Shift+I to open Windsurf AI, then use this prompt:</p>
                      <div className="bg-white p-3 rounded border border-gray-300">
                        <code className="text-sm text-gray-800 whitespace-pre-wrap">{result.prompt}</code>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-md border ${
                    result.emergency 
                      ? 'bg-red-100 border-red-300' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className={`text-sm ${
                      result.emergency ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      <strong>Disclaimer:</strong> {result.disclaimer}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-blue max-w-none">
                  <div className={`whitespace-pre-wrap ${
                    result.emergency ? 'text-red-700 font-semibold' : 'text-gray-700'
                  }`}>
                    {result.analysis}
                  </div>
                  <div className={`mt-4 p-4 rounded-md border ${
                    result.emergency 
                      ? 'bg-red-100 border-red-300' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className={`text-sm ${
                      result.emergency ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      <strong>Disclaimer:</strong> {result.disclaimer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;