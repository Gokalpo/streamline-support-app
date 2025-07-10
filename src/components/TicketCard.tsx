
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '../types/ticket';
import { Clock, User, MessageSquare, AlertCircle, CheckCircle, Circle } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <Circle className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusText = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'Açık';
      case 'in-progress':
        return 'İşlemde';
      case 'closed':
        return 'Kapalı';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityText = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return 'Düşük';
      case 'medium':
        return 'Orta';
      case 'high':
        return 'Yüksek';
      case 'urgent':
        return 'Acil';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold line-clamp-1">
            {ticket.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getPriorityColor(ticket.priority)}>
              {getPriorityText(ticket.priority)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {ticket.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {getStatusIcon(ticket.status)}
              <span>{getStatusText(ticket.status)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{ticket.createdByName}</span>
            </div>
            
            {ticket.responses.length > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{ticket.responses.length}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDate(ticket.updatedAt)}</span>
          </div>
        </div>
        
        {ticket.assignedToName && (
          <div className="mt-2 text-xs text-green-600">
            Atanmış: {ticket.assignedToName}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
