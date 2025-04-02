import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface AttendanceHistoryProps {
  records: AttendanceRecord[];
  onClearHistory: () => void;
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ records, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const filteredRecords = records.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ['Date', 'Student Name', 'Total Classes', 'Attended Classes', 'Percentage', 'Deficit', 'Required Classes'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        new Date(record.date).toLocaleDateString(),
        record.studentName,
        record.totalClasses,
        record.attendedClasses,
        record.percentage.toFixed(2) + '%',
        record.deficit.toFixed(2) + '%',
        record.requiredClasses
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_history.csv';
    link.click();
  };

  const handleClearHistory = () => {
    setShowConfirmDialog(true);
  };

  const confirmClearHistory = () => {
    onClearHistory();
    setShowConfirmDialog(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Attendance History</h2>
        <div className="flex space-x-2">
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClearHistory}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Clear History
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to clear all attendance history? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearHistory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Student</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Attendance</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {record.studentName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                  {record.attendedClasses}/{record.totalClasses} ({record.percentage.toFixed(2)}%)
                </td>
                <td className="px-4 py-3 text-sm">
                  {record.percentage >= 75 ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Adequate
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Need {record.requiredClasses} more classes
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;