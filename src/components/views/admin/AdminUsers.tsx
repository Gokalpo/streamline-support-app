import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, Edit, Trash } from 'lucide-react';

export default function AdminUsers() {
  const users = [
    { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@sirket.com', role: 'employee', department: 'IT', company: 'TechCorp' },
    { id: '2', name: 'Ayşe Demir', email: 'ayse@sirket.com', role: 'support', department: 'IT', company: 'TechCorp' },
    { id: '3', name: 'Mehmet Admin', email: 'admin@sirket.com', role: 'admin', department: 'Yönetim', company: 'TechCorp' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground">Sistem kullanıcılarını yönetin</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Yeni Kullanıcı</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Kullanıcı Listesi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.company} - {user.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline"><Trash className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}