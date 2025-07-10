
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTickets } from '../contexts/TicketContext';
import { useAuth } from '../contexts/AuthContext';
import { Ticket } from '../types/ticket';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Send, Clock, User, Building, Flag, CheckCircle, XCircle } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
  const [newResponse, setNewResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addResponse, updateTicketStatus } = useTickets();
  const { user } = useAuth();

  const handleAddResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newResponse.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir yanıt yazın",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      addResponse(ticket.id, newResponse.trim());
      setNewResponse('');
      
      toast({
        title: "Başarılı!",
        description: "Yanıt eklendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yanıt eklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = (newStatus: Ticket['status']) => {
    updateTicketStatus(ticket.id, newStatus);
    toast({
      title: "Başarılı!",
      description: `Talep durumu "${getStatusText(newStatus)}" olarak güncellendi`,
    });
  };

  const getStatusText = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'Açık';
      case 'in-progress': return 'İşlemde';
      case 'closed': return 'Kapalı';
    }
  };

  const getPriorityText = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'Düşük';
      case 'medium': return 'Orta';
      case 'high': return 'Yüksek';
      case 'urgent': return 'Acil';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const canUpdateStatus = user?.role === 'support' || user?.role === 'admin';
  const canRespond = user?.role === 'support' || user?.role === 'admin' || user?.id === ticket.createdBy;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Talep Detayı</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl mb-2">{ticket.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{ticket.createdByName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{ticket.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(ticket.priority)}>
                <Flag className="h-3 w-3 mr-1" />
                {getPriorityText(ticket.priority)}
              </Badge>
              <Badge className={getStatusColor(ticket.status)}>
                {getStatusText(ticket.status)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          
          {ticket.assignedToName && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Atanmış:</strong> {ticket.assignedToName}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {canUpdateStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Durum Yönetimi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={ticket.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Açık</SelectItem>
                  <SelectItem value="in-progress">İşlemde</SelectItem>
                  <SelectItem value="closed">Kapalı</SelectItem>
                </SelectContent>
              </Select>
              
              {ticket.status !== 'closed' && (
                <Button 
                  variant="outline" 
                  onClick={() => handleStatusChange('closed')}
                  className="text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Talebi Kapat
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Yanıtlar ({ticket.responses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticket.responses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Henüz yanıt yok</p>
            ) : (
              ticket.responses.map((response, index) => (
                <div key={response.id}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{response.authorName}</span>
                        <Badge variant="outline" className="text-xs">
                          {response.authorRole === 'support' ? 'Destek' : 
                           response.authorRole === 'admin' ? 'Admin' : 'Çalışan'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(response.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{response.message}</p>
                    </div>
                  </div>
                  {index < ticket.responses.length - 1 && <Separator className="mt-4" />}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {canRespond && ticket.status !== 'closed' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Yanıt Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddResponse} className="space-y-4">
              <Textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Yanıtınızı yazın..."
                rows={4}
                disabled={isSubmitting}
              />
              <Button type="submit" disabled={isSubmitting || !newResponse.trim()}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Gönderiliyor...' : 'Yanıt Gönder'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketDetail;
