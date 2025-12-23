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
                assignee: {
                    id: 'u2',
                    userName: 'user2',
                    fullName: 'User Two',
                    role: 'IT',
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
            ctx.patchState({ tickets: state.tickets, loading: false });
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
