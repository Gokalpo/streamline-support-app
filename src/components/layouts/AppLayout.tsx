import React, { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '../AppSidebar';
import { useAuth } from '../../contexts/AuthContext';

// Employee Views
import EmployeeDashboard from '../views/employee/EmployeeDashboard';
import EmployeeProfile from '../views/employee/EmployeeProfile';
import EmployeeTickets from '../views/employee/EmployeeTickets';
import CreateTicketForm from '../CreateTicketForm';

// Support Views
import SupportDashboard from '../views/support/SupportDashboard';
import SupportTickets from '../views/support/SupportTickets';
import SupportProfile from '../views/support/SupportProfile';

// Admin Views
import AdminDashboard from '../views/admin/AdminDashboard';
import AdminTickets from '../views/admin/AdminTickets';
import AdminUsers from '../views/admin/AdminUsers';
import AdminCompanies from '../views/admin/AdminCompanies';
import AdminAnalytics from '../views/admin/AdminAnalytics';
import AdminSettings from '../views/admin/AdminSettings';

export default function AppLayout() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (user?.role) {
      case 'employee':
        switch (activeView) {
          case 'dashboard':
            return <EmployeeDashboard />;
          case 'profile':
            return <EmployeeProfile />;
          case 'my-tickets':
            return <EmployeeTickets />;
          case 'create-ticket':
            return <CreateTicketForm onSuccess={() => setActiveView('my-tickets')} />;
          default:
            return <EmployeeDashboard />;
        }
      
      case 'support':
        switch (activeView) {
          case 'dashboard':
            return <SupportDashboard />;
          case 'tickets':
            return <SupportTickets />;
          case 'profile':
            return <SupportProfile />;
          default:
            return <SupportDashboard />;
        }
      
      case 'admin':
        switch (activeView) {
          case 'dashboard':
            return <AdminDashboard />;
          case 'all-tickets':
            return <AdminTickets />;
          case 'users':
            return <AdminUsers />;
          case 'companies':
            return <AdminCompanies />;
          case 'analytics':
            return <AdminAnalytics />;
          case 'settings':
            return <AdminSettings />;
          default:
            return <AdminDashboard />;
        }
      
      default:
        return <div>Geçersiz rol</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}