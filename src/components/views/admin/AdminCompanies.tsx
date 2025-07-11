import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Plus, Users, Ticket } from 'lucide-react';

export default function AdminCompanies() {
  const companies = [
    { id: '1', name: 'TechCorp', userCount: 15, ticketCount: 24, status: 'active' },
    { id: '2', name: 'DesignStudio', userCount: 8, ticketCount: 12, status: 'active' },
    { id: '3', name: 'MarketingPro', userCount: 12, ticketCount: 18, status: 'inactive' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Şirket Yönetimi</h1>
          <p className="text-muted-foreground">Sistemdeki şirketleri yönetin</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Yeni Şirket</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {company.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Durum:</span>
                <Badge variant={company.status === 'active' ? 'default' : 'secondary'}>
                  {company.status === 'active' ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{company.userCount} kullanıcı</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                <span>{company.ticketCount} talep</span>
              </div>
              <Button className="w-full" variant="outline">Detaylar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}