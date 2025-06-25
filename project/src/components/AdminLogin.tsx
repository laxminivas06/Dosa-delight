// components/AdminLogin.tsx
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const { mode } = useTheme();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded credentials for demo purposes
    // In production, use proper authentication
    if (credentials.username === 'admin' && credentials.password === '123') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-screen flex items-center justify-center p-4 ${
        mode === 'lovable'
          ? 'bg-gradient-to-b from-pink-50 to-purple-50'
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
        mode === 'lovable'
          ? 'bg-white border-2 border-pink-100'
          : 'bg-white border-2 border-orange-100'
      }`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
        }`}>
          Admin Login
        </h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 mb-4 rounded-lg text-sm ${
              mode === 'lovable'
                ? 'bg-pink-100 text-pink-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              mode === 'lovable' ? 'text-gray-700' : 'text-gray-800'
            }`}>
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className={`w-full px-4 py-2 border-2 rounded-lg ${
                mode === 'lovable'
                  ? 'border-pink-200 focus:border-pink-400'
                  : 'border-orange-200 focus:border-orange-400'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              mode === 'lovable' ? 'text-gray-700' : 'text-gray-800'
            }`}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className={`w-full px-4 py-2 border-2 rounded-lg ${
                mode === 'lovable'
                  ? 'border-pink-200 focus:border-pink-400'
                  : 'border-orange-200 focus:border-orange-400'
              }`}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg font-medium ${
              mode === 'lovable'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
            }`}
          >
            Login
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;