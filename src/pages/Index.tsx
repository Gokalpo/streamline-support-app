
import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { TicketProvider } from '../contexts/TicketContext';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <TicketProvider>
      <Dashboard />
    </TicketProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
