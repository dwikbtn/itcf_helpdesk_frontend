import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchMonthlyStats, FetchTicketByStatus } from './dashboard.action';

export interface TicketStateModel {
    monthlyStats: {
        labels: string[];
        onProgress: number[];
        open: number[];
        closed: number[];
    };
    monthlyStatsloading: boolean;
    ticketByStatus: {
        open: number;
        inProgress: number;
        closed: number;
    };
    ticketByStatusLoading: boolean;
}

@State<TicketStateModel>({
    name: 'dashboardState',
    defaults: {
        monthlyStats: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            onProgress: [],
            open: [],
            closed: []
        },
        monthlyStatsloading: false,
        ticketByStatus: {
            open: 0,
            inProgress: 0,
            closed: 0
        },
        ticketByStatusLoading: false
    }
})
@Injectable()
export class DashboardState {
    @Selector()
    static monthlyStats(state: TicketStateModel) {
        return state.monthlyStats;
    }
    @Selector()
    static monthlyStatsloading(state: TicketStateModel) {
        return state.monthlyStatsloading;
    }
    @Selector()
    static ticketByStatus(state: TicketStateModel) {
        return state.ticketByStatus;
    }
    @Selector()
    static ticketByStatusLoading(state: TicketStateModel) {
        return state.ticketByStatusLoading;
    }
    @Action(FetchMonthlyStats)
    fetchMonthlyStats(ctx: StateContext<TicketStateModel>) {
        ctx.patchState({ monthlyStatsloading: true });

        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate fetched data
                const mockData = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    onProgress: [12, 15, 20, 18, 22, 25, 28, 24, 26, 30, 32, 35],
                    open: [8, 10, 12, 15, 18, 20, 22, 19, 21, 24, 26, 28],
                    closed: [45, 50, 48, 52, 55, 58, 60, 62, 65, 68, 70, 72]
                };

                ctx.patchState({
                    monthlyStats: mockData,
                    monthlyStatsloading: false
                });

                resolve(mockData);
            }, 1500); // 1.5 second delay
        });
    }

    @Action(FetchTicketByStatus)
    fetchTicketByStatus(ctx: StateContext<TicketStateModel>) {
        ctx.patchState({ ticketByStatusLoading: true });

        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate fetched data
                const mockData = {
                    open: 28,
                    inProgress: 35,
                    closed: 72
                };

                ctx.patchState({
                    ticketByStatus: mockData,
                    ticketByStatusLoading: false
                });

                resolve(mockData);
            }, 1000); // 1 second delay
        });
    }
}
