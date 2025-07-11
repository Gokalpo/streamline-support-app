import React from 'react';
import { useTickets } from '../../../contexts/TicketContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react';
import TicketCard from '../../TicketCard';

export default function SupportDashboard() {
  const { getTicketsForUser } = useTickets();
  const { user } = useAuth();
  const tickets = getTicketsForUser();

  // Filter tickets for support department
  const departmentTickets = tickets.filter(t => t.department === user?.department);

  const stats = {
    total: departmentTickets.length,
    open: departmentTickets.filter(t => t.status === 'open').length,
    inProgress: departmentTickets.filter(t => t.status === 'in-progress').length,
    closed: departmentTickets.filter(t => t.status === 'closed').length,
    assigned: departmentTickets.filter(t => t.assignedTo === user?.id).length
  };

  const recentTickets = departmentTickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Destek Dashboard</h1>
        <p className="text-muted-foreground">{user?.department} departmanı talepleri</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Ticket className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Açık</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
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
                <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.closed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Atanmış</p>
                <p className="text-2xl font-bold text-purple-600">{stats.assigned}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Son Talepler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTickets.length === 0 ? (
              <div className="text-center py-8">
                <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Henüz talep yok</p>
              </div>
            ) : (
              recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => {}} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Priority Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Öncelikli Talepler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {departmentTickets
                .filter(t => t.priority === 'urgent' || t.priority === 'high')
                .slice(0, 3)
                .map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Badge variant={ticket.priority === 'urgent' ? 'destructive' : 'default'}>
                      {ticket.priority === 'urgent' ? 'Acil' : 'Yüksek'}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{ticket.title}</p>
                      <p className="text-xs text-muted-foreground">{ticket.createdByName}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Departman İstatistikleri</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ortalama Yanıt Süresi:</span>
                  <span className="font-medium">2.5 saat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Çözüm Oranı:</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bu Hafta:</span>
                  <span className="font-medium">+12</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}