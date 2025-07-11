import React from 'react';
import { useTickets } from '../../../contexts/TicketContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, 
  Users, 
  Building2, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
  const { getTicketsForUser } = useTickets();
  const allTickets = getTicketsForUser(); // In real app, admin would get all tickets

  const stats = {
    totalTickets: allTickets.length,
    openTickets: allTickets.filter(t => t.status === 'open').length,
    inProgressTickets: allTickets.filter(t => t.status === 'in-progress').length,
    closedTickets: allTickets.filter(t => t.status === 'closed').length,
    totalUsers: 25, // Mock data
    totalCompanies: 3, // Mock data
  };

  const departmentStats = [
    { name: 'IT', tickets: 8, avgResponse: '2.1h' },
    { name: 'İnsan Kaynakları', tickets: 5, avgResponse: '3.2h' },
    { name: 'Muhasebe', tickets: 3, avgResponse: '1.8h' },
    { name: 'Pazarlama', tickets: 2, avgResponse: '4.1h' },
  ];

  const recentActivity = [
    { action: 'Yeni kullanıcı eklendi', user: 'Mehmet Öz', time: '5 dakika önce' },
    { action: 'Ticket kapatıldı', user: 'Ayşe Demir', time: '15 dakika önce' },
    { action: 'Yeni departman oluşturuldu', user: 'Admin', time: '1 saat önce' },
    { action: 'Toplu ticket ataması', user: 'Can Destek', time: '2 saat önce' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Yönetici Dashboard</h1>
        <p className="text-muted-foreground">Sistem geneli özet ve istatistikler</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Ticket</p>
                <p className="text-3xl font-bold">{stats.totalTickets}</p>
                <p className="text-xs text-green-600">+12% bu ay</p>
              </div>
              <Ticket className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-green-600">+3 bu hafta</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Şirket Sayısı</p>
                <p className="text-3xl font-bold">{stats.totalCompanies}</p>
                <p className="text-xs text-muted-foreground">Değişim yok</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Çözüm Oranı</p>
                <p className="text-3xl font-bold">89%</p>
                <p className="text-xs text-green-600">+5% bu ay</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Açık Talepler</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openTickets}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">İşlemde</p>
                <p className="text-2xl font-bold text-amber-600">{stats.inProgressTickets}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kapalı</p>
                <p className="text-2xl font-bold text-green-600">{stats.closedTickets}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Departman Performansı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">{dept.tickets} aktif talep</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{dept.avgResponse}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Ort. yanıt</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}