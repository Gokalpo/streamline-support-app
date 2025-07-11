import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Ticket } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">İstatistikler</h1>
        <p className="text-muted-foreground">Sistem performans analizi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bu Ay</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-green-600">+23% artış</p>
              </div>
              <Ticket className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Çözüm Süresi</p>
                <p className="text-2xl font-bold">2.4h</p>
                <p className="text-xs text-green-600">-15% iyileşme</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Memnuniyet</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-green-600">+0.3 puan</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold">25</p>
                <p className="text-xs text-green-600">+5 bu ay</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departman Performansı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Grafik görünümü için chart kütüphanesi entegrasyonu gerekli
          </div>
        </CardContent>
      </Card>
    </div>
  );
}