import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Calendar, Shield, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MedScan AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered medical diagnosis assistant for preliminary health insights
          </p>
          <Link
            to="/symptom-checker"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Start Symptom Check</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="medical-card text-center">
            <Brain className="h-12 w-12 text-medical-blue mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">Advanced AI-powered symptom analysis</p>
          </div>
          
          <div className="medical-card text-center">
            <Heart className="h-12 w-12 text-medical-green mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
            <p className="text-gray-600">Monitor your medical history</p>
          </div>
          
          <div className="medical-card text-center">
            <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">Book doctor appointments</p>
          </div>
          
          <div className="medical-card text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">HIPAA Secure</h3>
            <p className="text-gray-600">Your data is protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;