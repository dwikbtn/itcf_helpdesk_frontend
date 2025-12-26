import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddTicket, RemoveTicket, ViewSingleTicket, UpdateTicket, LoadTickets, ResetTicketState } from './ticket.action';
import { Injectable } from '@angular/core';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    updatedDate?: Date;
    updatedBy?: string;
    createdDate: Date;
    status: TicketStatus;
    attachment?: Attachment[];
    priority?: Priority;
    assignee?: User;
    requester?: User;
    userNextLevel?: any;
    inputDate?: Date;
    inputBy?: string;
    closeBy?: string;
    closeDate?: Date;
    category?: {
        id: string;
        name: string;
    };
    comments?: Comment[];
    ticketHistory?: TicketHistory[];
}

export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED'
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}
interface User {
    id: string;
    userName: string;
    fullName: string;
    role: 'IT' | 'USER' | 'ADMIN';
    createdAt: Date;
}

interface TicketStateModel {
    tickets: Ticket[];
    viewedTicket?: Ticket;
    loading: boolean;
}

interface Comment {
    id: string;
    body: string;
    isInternal: boolean;
    createdTime: Date;
    author: User;
}

interface Attachment {
    id: string;
    fileName: string;
    fileType: string;
    url: string;
    createdAt: Date;
}

interface TicketHistory {
    id: string;
    changeField: string;
    oldValue: string;
    newValue: string;
    changedAt: Date;
}

@State<TicketStateModel>({
    name: 'ticketState',
    defaults: {
        tickets: [
            {
                id: '1',
                title: 'Sample Ticket 1',
                description: 'Description 1',
                updatedDate: new Date(),
                createdDate: new Date(),
                status: TicketStatus.OPEN,
                priority: Priority.HIGH,
                requester: {
                    id: 'u1',
                    userName: 'john.doe',
                    fullName: 'John Doe',
                    role: 'USER',
                    createdAt: new Date()
                },
                assignee: {
                    id: 'u2',
                    userName: 'user2',
                    fullName: 'User Two',
                    role: 'IT',
                    createdAt: new Date()
                }
            },
            {
                id: '2',
                title: 'Sample Ticket 2',
                description: 'Description 2',
                updatedDate: new Date(),
                createdDate: new Date(),
                status: TicketStatus.IN_PROGRESS,
                priority: Priority.MEDIUM,
                requester: {
                    id: 'u3',
                    userName: 'jane.smith',
                    fullName: 'Jane Smith',
                    role: 'USER',
                    createdAt: new Date()
                },
                assignee: {
                    id: 'u2',
                    userName: 'user2',
                    fullName: 'User Two',
                    role: 'IT',
                    createdAt: new Date()
                }
            },
            {
                id: '3',
                title: 'Sample Ticket 3',
                description: 'Description 3',
                updatedDate: new Date(),
                createdDate: new Date(),
                status: TicketStatus.CLOSED,
                priority: Priority.LOW,
                requester: {
                    id: 'u4',
                    userName: 'bob.wilson',
                    fullName: 'Bob Wilson',
                    role: 'USER',
                    createdAt: new Date()
                }
            },
            {
                id: '4',
                title: 'Sample Ticket 4',
                description: 'Description 4',
                updatedDate: new Date(),
                createdDate: new Date(),
                status: TicketStatus.OPEN,
                priority: Priority.URGENT,
                requester: {
                    id: 'u5',
                    userName: 'alice.brown',
                    fullName: 'Alice Brown',
                    role: 'USER',
                    createdAt: new Date()
                }
            }
        ] as Ticket[],
        viewedTicket: {
            id: '',
            title: '',
            description: '',
            updatedDate: new Date(),
            createdDate: new Date(),
            status: TicketStatus.OPEN,
            priority: Priority.HIGH,
            assignee: {} as User,
            attachment: []
        } as Ticket,
        loading: false
    }
})
@Injectable()
export class TicketState {
    // Helper function to normalize status from backend format to enum format
    private normalizeStatus(status: string): TicketStatus {
        const statusMap: { [key: string]: TicketStatus } = {
            open: TicketStatus.OPEN,
            'in-progress': TicketStatus.IN_PROGRESS,
            closed: TicketStatus.CLOSED,
            pending: TicketStatus.PENDING,
            resolved: TicketStatus.RESOLVED
        };
        return statusMap[status.toLowerCase()] || (status.toUpperCase().replace('-', '_') as TicketStatus);
    }

    // Helper function to normalize priority
    private normalizePriority(priority: string): Priority {
        return priority.toUpperCase() as Priority;
    }

    // Transform ticket data from backend format to app format
    private transformTicket(ticket: any): Ticket {
        return {
            ...ticket,
            status: this.normalizeStatus(ticket.status),
            priority: ticket.priority ? this.normalizePriority(ticket.priority) : undefined
        };
    }

    @Selector()
    static loading(state: TicketStateModel) {
        return state.loading;
    }

    @Selector()
    static tickets(state: TicketStateModel) {
        return state.tickets;
    }

    @Selector()
    static viewedSingleTicket(state: TicketStateModel) {
        return state.viewedTicket;
    }

    @Action(LoadTickets)
    loadTickets(ctx: StateContext<TicketStateModel>) {
        ctx.patchState({ loading: true });
        setTimeout(() => {
            const state = ctx.getState();
            // Transform tickets when loading (simulating API response transformation)
            const transformedTickets = state.tickets.map((t) => this.transformTicket(t));
            ctx.patchState({ tickets: transformedTickets, loading: false });
        }, 1000);
    }
    @Action(AddTicket)
    addTicket(ctx: StateContext<TicketStateModel>, action: AddTicket) {
        const state = ctx.getState();
        ctx.patchState({
            tickets: [...state.tickets, action.payload]
        });
    }

    @Action(RemoveTicket)
    removeTicket(ctx: StateContext<TicketStateModel>, action: RemoveTicket) {
        const state = ctx.getState();
        ctx.patchState({
            tickets: state.tickets.filter((ticket) => ticket.id !== action.id)
        });
    }

    @Action(UpdateTicket)
    updateTicket(ctx: StateContext<TicketStateModel>, action: UpdateTicket) {
        const state = ctx.getState();
        const tickets = state.tickets.map((ticket) => {
            if (ticket.id === action.id) {
                return { ...ticket, ...action.payload };
            }
            return ticket;
        });
        ctx.patchState({ tickets });
    }

    @Action(ViewSingleTicket)
    viewTicket(ctx: StateContext<TicketStateModel>, action: ViewSingleTicket) {
        ctx.patchState({ loading: true });
        //NOTE: Simulating async fetch with setTimeout
        setTimeout(() => {
            const state = ctx.getState();
            const ticket = state.tickets.find((ticket) => ticket.id === action.id);
            ctx.patchState({ viewedTicket: ticket, loading: false });
        }, 1000);
    }
    @Action(ResetTicketState)
    resetTicketState(ctx: StateContext<TicketStateModel>) {
        ctx.setState({
            tickets: [],
            viewedTicket: undefined,
            loading: false
        });
    }
}
