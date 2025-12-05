import { Ticket } from './ticket.state';

export class LoadTickets {
    static readonly type = '[Ticket] Load Tickets';
}

export class removeTicket {
    static readonly type = '[Ticket] Remove Ticket';
    constructor(public id: string) {}
}

export class AddTicket {
    static readonly type = '[Ticket] Add Ticket';
    constructor(public payload: Ticket) {}
}

export class UpdateTicket {
    static readonly type = '[Ticket] Update Ticket';
    constructor(
        public id: string,
        public payload: Ticket
    ) {}
}

export class ViewTicket {
    static readonly type = '[Ticket] View Ticket';
    constructor(public id: string) {}
}

type TicketActions = LoadTickets | removeTicket | AddTicket | UpdateTicket | ViewTicket;

export type { TicketActions };
