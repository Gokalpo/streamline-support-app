import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save, Shield, Database } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sistem Ayarları</h1>
        <p className="text-muted-foreground">Sistem konfigürasyonu ve ayarları</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Genel Ayarlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Sistem Adı</label>
              <p className="text-sm text-muted-foreground">Destek Sistemi</p>
            </div>
            <div>
              <label className="text-sm font-medium">Varsayılan Dil</label>
              <p className="text-sm text-muted-foreground">Türkçe</p>
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Güvenlik
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Oturum Süresi</label>
              <p className="text-sm text-muted-foreground">8 saat</p>
            </div>
            <div>
              <label className="text-sm font-medium">İki Faktörlü Doğrulama</label>
              <p className="text-sm text-muted-foreground">Devre dışı</p>
            </div>
            <Button className="w-full" variant="outline">
              Güvenlik Ayarları
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}