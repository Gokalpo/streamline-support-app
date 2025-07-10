
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, TicketResponse } from '../types/ticket';
import { useAuth } from './AuthContext';

interface TicketContextType {
  tickets: Ticket[];
  createTicket: (title: string, description: string, priority: Ticket['priority'], department?: string) => void;
  addResponse: (ticketId: string, message: string) => void;
  updateTicketStatus: (ticketId: string, status: Ticket['status']) => void;
  assignTicket: (ticketId: string, assignedTo: string, assignedToName: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
  getTicketsForUser: () => Ticket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Mock initial tickets
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Bilgisayar Yavaş Çalışıyor',
    description: 'Ofis bilgisayarım çok yavaş açılıyor ve programlar donuyor.',
    status: 'open',
    priority: 'medium',
    createdBy: '1',
    createdByName: 'Ahmet Yılmaz',
    department: 'IT',
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T09:30:00'),
    responses: []
  },
  {
    id: '2',
    title: 'Email Erişim Sorunu',
    description: 'Kurumsal email hesabıma giriş yapamıyorum.',
    status: 'in-progress',
    priority: 'high',
    createdBy: '4',
    createdByName: 'Fatma Öz',
    assignedTo: '5',
    assignedToName: 'Can Destek',
    department: 'İnsan Kaynakları',
    createdAt: new Date('2024-01-14T14:15:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    responses: [
      {
        id: '1',
        ticketId: '2',
        message: 'Sorununuzu aldık. Şifrenizi sıfırlayalım.',
        authorId: '5',
        authorName: 'Can Destek',
        authorRole: 'support',
        createdAt: new Date('2024-01-14T16:45:00')
      }
    ]
  }
];

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const { user } = useAuth();

  const createTicket = (title: string, description: string, priority: Ticket['priority'], department?: string) => {
    if (!user) return;

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title,
      description,
      status: 'open',
      priority,
      createdBy: user.id,
      createdByName: user.name,
      department: department || user.department,
      createdAt: new Date(),
      updatedAt: new Date(),
      responses: []
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const addResponse = (ticketId: string, message: string) => {
    if (!user) return;

    const newResponse: TicketResponse = {
      id: Date.now().toString(),
      ticketId,
      message,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      createdAt: new Date()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            responses: [...ticket.responses, newResponse],
            updatedAt: new Date()
          }
        : ticket
    ));
  };

  const updateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status, updatedAt: new Date() }
        : ticket
    ));
  };

  const assignTicket = (ticketId: string, assignedTo: string, assignedToName: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignedTo, assignedToName, status: 'in-progress', updatedAt: new Date() }
        : ticket
    ));
  };

  const getTicketById = (id: string) => tickets.find(ticket => ticket.id === id);

  const getTicketsForUser = () => {
    if (!user) return [];

    switch (user.role) {
      case 'employee':
        return tickets.filter(ticket => ticket.createdBy === user.id);
      case 'support':
        return tickets.filter(ticket => ticket.department === user.department);
      case 'admin':
        return tickets;
      default:
        return [];
    }
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      createTicket,
      addResponse,
      updateTicketStatus,
      assignTicket,
      getTicketById,
      getTicketsForUser
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
