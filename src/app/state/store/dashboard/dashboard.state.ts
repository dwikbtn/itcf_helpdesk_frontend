import { Injectable } from '@angular/core';
import { Selector, State } from '@ngxs/store';

export interface TicketStateModel {
    monthlyStats: {
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
export class MonthlyState {
    @Selector()
    static monthlyStats(state: TicketStateModel) {
        return state.monthlyStats;
    }
}
