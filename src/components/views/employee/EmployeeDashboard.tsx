import React from 'react';
import { useTickets } from '../../../contexts/TicketContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Ticket, 
  Plus, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import TicketCard from '../../TicketCard';

export default function EmployeeDashboard() {
  const { getTicketsForUser } = useTickets();
  const tickets = getTicketsForUser();

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };

  const recentTickets = tickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Destek taleplerinin özeti</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Toplam Talep</p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Son Taleplerim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTickets.length === 0 ? (
              <div className="text-center py-8">
                <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Henüz talep yok</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Talebi Oluştur
                </Button>
              </div>
            ) : (
              recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => {}} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Hızlı İşlemler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Destek Talebi Oluştur
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <Ticket className="h-4 w-4 mr-2" />
                Taleplerim
              </Button>
              <Button variant="outline" className="justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Açık Talepler
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Talep Kategorileri</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Teknik Destek</span>
                  <Badge variant="secondary">En Popüler</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hesap Sorunları</span>
                  <Badge variant="outline">Orta</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Genel Sorular</span>
                  <Badge variant="outline">Az</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}