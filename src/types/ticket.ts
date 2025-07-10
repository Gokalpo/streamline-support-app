
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: string;
  createdByName: string;
  assignedTo?: string;
  assignedToName?: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  message: string;
  authorId: string;
  authorName: string;
  authorRole: 'employee' | 'support' | 'admin';
  createdAt: Date;
}

export interface TicketFilters {
  status?: 'open' | 'in-progress' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  department?: string;
  assignedTo?: string;
}
