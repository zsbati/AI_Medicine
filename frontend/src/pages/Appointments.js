import React from 'react';
import { Calendar } from 'lucide-react';

const Appointments = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Calendar className="h-12 w-12 text-medical-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointments</h1>
          <p className="text-lg text-gray-600">
            Schedule and manage your doctor appointments
          </p>
        </div>
        
        <div className="medical-card">
          <p className="text-gray-600">Appointment scheduling coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Appointments;