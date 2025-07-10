
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTickets } from '../contexts/TicketContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface CreateTicketFormProps {
  onSuccess?: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createTicket } = useTickets();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      createTicket(title.trim(), description.trim(), priority);
      
      toast({
        title: "Başarılı!",
        description: "Destek talebi oluşturuldu",
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Talep oluşturulurken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Yeni Destek Talebi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sorununuzu kısaca özetleyin"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Sorununuzu detaylı olarak açıklayın..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Öncelik</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high' | 'urgent')} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Düşük</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="urgent">Acil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
            <p><strong>Departman:</strong> {user?.department}</p>
            <p><strong>Oluşturan:</strong> {user?.name}</p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Oluşturuluyor...' : 'Destek Talebi Oluştur'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTicketForm;
