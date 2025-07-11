import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Ticket, 
  Plus, 
  Settings, 
  Users, 
  BarChart3, 
  Building2,
  LogOut,
  Home
} from 'lucide-react';

interface AppSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const { getTicketsForUser } = useTickets();

  const tickets = getTicketsForUser();
  const openTickets = tickets.filter(t => t.status === 'open').length;

  const getMenuItems = () => {
    switch (user?.role) {
      case 'employee':
        return [
          {
            title: 'Dashboard',
            icon: Home,
            id: 'dashboard',
          },
          {
            title: 'Profilim',
            icon: User,
            id: 'profile',
          },
          {
            title: 'Ticketlarım',
            icon: Ticket,
            id: 'my-tickets',
            badge: tickets.length > 0 ? tickets.length : undefined,
          },
          {
            title: 'Yeni Ticket Oluştur',
            icon: Plus,
            id: 'create-ticket',
          },
        ];
      
      case 'support':
        return [
          {
            title: 'Dashboard',
            icon: Home,
            id: 'dashboard',
          },
          {
            title: 'Ticketlar',
            icon: Ticket,
            id: 'tickets',
            badge: openTickets > 0 ? openTickets : undefined,
          },
          {
            title: 'Profilim',
            icon: User,
            id: 'profile',
          },
        ];
      
      case 'admin':
        return [
          {
            title: 'Dashboard',
            icon: Home,
            id: 'dashboard',
          },
          {
            title: 'Tüm Ticketlar',
            icon: Ticket,
            id: 'all-tickets',
          },
          {
            title: 'Kullanıcılar',
            icon: Users,
            id: 'users',
          },
          {
            title: 'Şirketler',
            icon: Building2,
            id: 'companies',
          },
          {
            title: 'İstatistikler',
            icon: BarChart3,
            id: 'analytics',
          },
          {
            title: 'Ayarlar',
            icon: Settings,
            id: 'settings',
          },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Ticket className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Destek Sistemi</h2>
            <p className="text-xs text-sidebar-foreground/70">
              {user?.role === 'employee' && 'Çalışan Paneli'}
              {user?.role === 'support' && 'Destek Paneli'}
              {user?.role === 'admin' && 'Yönetici Paneli'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menü</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground line-clamp-1">
              {user?.name}
            </p>
            <p className="text-xs text-sidebar-foreground/70 line-clamp-1">
              {user?.department}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}