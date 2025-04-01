import React, { useState, useEffect } from 'react';
import { Calculator, History, Moon, Sun, User } from 'lucide-react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceHistory from './components/AttendanceHistory';
import { AttendanceRecord } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('attendanceRecords');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [records, darkMode]);

  const handleNewRecord = (record: AttendanceRecord) => {
    setRecords(prev => [record, ...prev]);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bunk Manger</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AttendanceForm onSubmit={handleNewRecord} />
          <AttendanceHistory records={records} />
        </div>
      </div>
      
      <footer className="py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ by{' A SRI SAI CHARAN'}
          
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;