import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, User, Activity } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-medical-blue" />
              <span className="text-xl font-bold text-gray-900">MedScan AI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'bg-medical-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/symptom-checker"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/symptom-checker') ? 'bg-medical-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Symptom Checker</span>
            </Link>
            
            <Link
              to="/medical-history"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/medical-history') ? 'bg-medical-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Medical History</span>
            </Link>
            
            <Link
              to="/appointments"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/appointments') ? 'bg-medical-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;