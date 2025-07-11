import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTickets } from '../../../contexts/TicketContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Building2, 
  Shield, 
  Calendar,
  Edit,
  Ticket,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

export default function SupportProfile() {
  const { user } = useAuth();
  const { getTicketsForUser } = useTickets();
  
  const allTickets = getTicketsForUser();
  const assignedTickets = allTickets.filter(t => t.assignedTo === user?.id);
  const resolvedTickets = assignedTickets.filter(t => t.status === 'closed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profilim</h1>
        <p className="text-muted-foreground">Destek personeli bilgileriniz</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Kişisel Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="mt-2">
                  Destek Personeli
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">E-posta</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Departman</p>
                    <p className="text-sm text-muted-foreground">{user?.department}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Rol</p>
                    <p className="text-sm text-muted-foreground">Destek Personeli</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Başlangıç Tarihi</p>
                    <p className="text-sm text-muted-foreground">15 Ocak 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Destek İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Atanmış Talepler</p>
                  <p className="text-xl font-bold">{assignedTickets.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Çözülen Talepler</p>
                  <p className="text-xl font-bold">{resolvedTickets.length}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Ortalama Yanıt</p>
                  <p className="text-xl font-bold">2.3h</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Memnuniyet</p>
                  <p className="text-xl font-bold">4.8/5</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full justify-start" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Profili Düzenle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Bu Ayki Performans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-sm text-muted-foreground">Çözülen Talep</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">96%</p>
              <p className="text-sm text-muted-foreground">Çözüm Oranı</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">1.8h</p>
              <p className="text-sm text-muted-foreground">Ortalama Yanıt</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4.9</p>
              <p className="text-sm text-muted-foreground">Müşteri Puanı</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}