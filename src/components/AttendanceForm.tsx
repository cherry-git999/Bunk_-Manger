import React, { useState } from 'react';
import { AttendanceRecord } from '../types';

interface AttendanceFormProps {
  onSubmit: (record: AttendanceRecord) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    totalClasses: '',
    attendedClasses: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = parseInt(formData.totalClasses);
    const attended = parseInt(formData.attendedClasses);
    const percentage = (attended / total) * 100;
    const deficit = percentage < 75 ? 75 - percentage : 0;
    const requiredClasses = deficit > 0 
      ? Math.ceil((0.75 * total - attended) / 0.25)
      : 0;

    const record: AttendanceRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      studentName: formData.studentName,
      totalClasses: total,
      attendedClasses: attended,
      percentage,
      deficit,
      requiredClasses,
    };

    onSubmit(record);
    setFormData({ studentName: '', totalClasses: '', attendedClasses: '' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Calculate Attendance</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Student Name
          </label>
          <input
            type="text"
            required
            value={formData.studentName}
            onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total Classes
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.totalClasses}
            onChange={(e) => setFormData(prev => ({ ...prev, totalClasses: e.target.value }))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter total number of classes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Classes Attended
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.attendedClasses}
            onChange={(e) => setFormData(prev => ({ ...prev, attendedClasses: e.target.value }))}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter number of classes attended"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Calculate Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;