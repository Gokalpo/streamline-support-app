import React, { useState } from 'react';
import { useTickets } from '../../../contexts/TicketContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket, 
  Search, 
  Filter, 
  UserCheck,
  Clock,
  AlertTriangle
} from 'lucide-react';
import TicketCard from '../../TicketCard';
import TicketDetail from '../../TicketDetail';

export default function SupportTickets() {
  const { getTicketsForUser, getTicketById, assignTicket } = useTickets();
  const { user } = useAuth();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assignmentFilter, setAssignmentFilter] = useState<string>('all');

  const allTickets = getTicketsForUser();
  const selectedTicket = selectedTicketId ? getTicketById(selectedTicketId) : null;

  // Filter tickets for support department
  const departmentTickets = allTickets.filter(t => t.department === user?.department);

  // Apply filters
  const filteredTickets = departmentTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    let matchesAssignment = true;
    if (assignmentFilter === 'assigned-to-me') {
      matchesAssignment = ticket.assignedTo === user?.id;
    } else if (assignmentFilter === 'unassigned') {
      matchesAssignment = !ticket.assignedTo;
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignment;
  });

  const handleAssignToMe = (ticketId: string) => {
    if (user) {
      assignTicket(ticketId, user.id, user.name);
    }
  };

  if (selectedTicket) {
    return (
      <div className="space-y-6">
        <TicketDetail 
          ticket={selectedTicket} 
          onBack={() => setSelectedTicketId(null)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Departman Talepleri</h1>
        <p className="text-muted-foreground">{user?.department} departmanına ait talepler</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Acil</p>
                <p className="text-xl font-bold">{departmentTickets.filter(t => t.priority === 'urgent').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Bekleyen</p>
                <p className="text-xl font-bold">{departmentTickets.filter(t => !t.assignedTo).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Bana Atanmış</p>
                <p className="text-xl font-bold">{departmentTickets.filter(t => t.assignedTo === user?.id).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ticket className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Toplam</p>
                <p className="text-xl font-bold">{departmentTickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Talep ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Atama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="assigned-to-me">Bana Atanmış</SelectItem>
                  <SelectItem value="unassigned">Atanmamış</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="open">Açık</SelectItem>
                  <SelectItem value="in-progress">İşlemde</SelectItem>
                  <SelectItem value="closed">Kapalı</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Öncelik" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="urgent">Acil</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                  <SelectItem value="medium">Orta</SelectItem>
                  <SelectItem value="low">Düşük</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchTerm ? 'Talep bulunamadı' : 'Henüz talep yok'}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? 'Arama kriterlerinize uygun talep bulunamadı.' 
                : 'Departmanınıza ait talep bulunmuyor.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="relative">
              <TicketCard
                ticket={ticket}
                onClick={() => setSelectedTicketId(ticket.id)}
              />
              {!ticket.assignedTo && (
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssignToMe(ticket.id);
                    }}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Üstlen
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}