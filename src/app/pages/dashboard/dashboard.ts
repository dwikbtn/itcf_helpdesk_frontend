import { Component, inject, computed } from '@angular/core';
import { Fluid } from 'primeng/fluid';
import { ChartModule } from 'primeng/chart';
import { TotalTicketCard } from './components/totalTicketCard';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TicketState } from '@/state/store/ticket/ticket.state';
import { DashboardState } from '@/state/store/dashboard/dashboard.state';
import { FetchMonthlyStats, FetchTicketByStatus } from '@/state/store/dashboard/dashboard.action';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
    selector: 'app-dashboard',
    imports: [Fluid, ChartModule, TotalTicketCard, SkeletonModule],
    template: `
        <section class="mb-4">
            <div class="text-3xl font-bold mb-2">Dashboard</div>
            <div class="text-lg text-surface-500 mb-4">Welcome to the ITCF Ticketing System Dashboard</div>

            <!-- chart section -->
            <p-fluid class="grid grid-cols-12 gap-8 mb-4 p-fluid">
                <div class="col-span-12 xl:col-span-6">
                    <div class="card flex flex-col" style="height:420px">
                        <div class="font-semibold text-xl mb-4">Monthly Ticket Overview</div>
                        @defer (when !monthlyStatsLoading()) {
                            <div class="flex-1">
                                <p-chart type="bar" [data]="monthlyData()" [options]="monthlyOptions" style="height:100%"></p-chart>
                            </div>
                        } @placeholder (minimum 500ms) {
                            <div class="flex-1 flex justify-center items-center">
                                <p-skeleton width="100%" height="300px"></p-skeleton>
                            </div>
                        }
                    </div>
                </div>
                <div class="col-span-12 xl:col-span-6">
                    <div class="card flex flex-col" style="height:420px">
                        <div class="font-semibold text-xl mb-4">Tickets by Status</div>
                        @defer (when !ticketByStatusLoading()) {
                            <div class="flex-1">
                                <p-chart type="doughnut" [data]="ticketStatusData()" [options]="ticketStatusOptions" style="height:100%"></p-chart>
                            </div>
                        } @placeholder (minimum 500ms) {
                            <div class="flex-1 flex justify-center items-center">
                                <p-skeleton width="100%" height="300px"></p-skeleton>
                            </div>
                        }
                    </div>
                </div>
            </p-fluid>

            <!--card section -->
            <!-- total tickets card -->
            <div class="grid grid-cols-12 gap-8">
                <!-- total on progress tickets card -->
                <app-total-ticket-card [dataValue]="openTickets.toString()" dataLabel="Open Tickets" icon="pi pi-exclamation-circle" iconColor="#EF6C00" ticketStatus="open" (redirectToTicket)="onRedirectToTicketPage($event)"></app-total-ticket-card>
                <app-total-ticket-card
                    [dataValue]="inProgressTickets.toString()"
                    dataLabel="On Progress Tickets"
                    icon="pi pi-spinner"
                    iconColor="#3B82F6"
                    ticketStatus="in-progress"
                    (redirectToTicket)="onRedirectToTicketPage($event)"
                ></app-total-ticket-card>
                <app-total-ticket-card [dataValue]="closedTickets.toString()" dataLabel="Closed Tickets" icon="pi pi-check-circle" iconColor="#10B981" ticketStatus="closed" (redirectToTicket)="onRedirectToTicketPage($event)"></app-total-ticket-card>
            </div>

            <div (click)="onRedirectToTicketPage('all')" class=" w-full flex justify-end hover:cursor-pointer mt-4 text-primary-600 font-semibold">
                <p>Go to Ticket Page →</p>
            </div>
        </section>
    `
})
export class Dashboard {
    private router = inject(Router);
    private store = inject(Store);
    ticketData = this.store.selectSignal(TicketState.tickets);

    monthlyStats = this.store.selectSignal(DashboardState.monthlyStats);
    monthlyStatsLoading = this.store.selectSignal(DashboardState.monthlyStatsloading);

    ticketByStatus = this.store.selectSignal(DashboardState.ticketByStatus);
    ticketByStatusLoading = this.store.selectSignal(DashboardState.ticketByStatusLoading);

    get totalTickets() {
        return this.ticketData().length;
    }

    get openTickets() {
        return this.ticketData().filter((t) => t.status === 'open').length;
    }
    get inProgressTickets() {
        return this.ticketData().filter((t) => t.status === 'in-progress').length;
    }
    get closedTickets() {
        return this.ticketData().filter((t) => t.status === 'closed').length;
    }

    // monthlyData = {};
    monthlyOptions = {};

    ticketStatusOptions = {};

    onRedirectToTicketPage(redirectTo: 'open' | 'in-progress' | 'closed' | 'all') {
        console.log(redirectTo, 'redirectTo');
        this.router.navigate([`/ticket`], { queryParams: { status: redirectTo } });
    }

    monthlyData = computed(() => {
        const stats = this.monthlyStats();
        return {
            labels: stats.labels,
            datasets: [
                {
                    label: 'Open',
                    backgroundColor: '#FECACA',
                    borderColor: '#FECACA',
                    data: stats.open
                },
                {
                    label: 'On Progress',
                    backgroundColor: '#BAE6FD',
                    borderColor: '#BAE6FD',
                    data: stats.onProgress
                },
                {
                    label: 'Closed',
                    backgroundColor: '#BBF7D0',
                    borderColor: '#BBF7D0',
                    data: stats.closed
                }
            ]
        };
    });

    ticketStatusData = computed(() => {
        const status = this.ticketByStatus();
        return {
            labels: ['Open', 'On Progress', 'Closed'],
            datasets: [
                {
                    data: [status.open, status.inProgress, status.closed],
                    backgroundColor: ['#FECACA', '#BAE6FD', '#BBF7D0'],
                    hoverBackgroundColor: ['#FCA5A5', '#7DD3FC', '#86EFAC']
                }
            ]
        };
    });

    ngOnInit() {
        this.initCharts();
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.store.dispatch(new FetchMonthlyStats());
        this.store.dispatch(new FetchTicketByStatus());

        console.log(this.monthlyStats(), 'monthly data');

        this.monthlyOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            layout: {
                padding: {
                    bottom: 24
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500,
                            size: 12
                        },
                        autoSkip: true,
                        maxRotation: 0,
                        minRotation: 0
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        // this.ticketStatusData = {
        //     labels: ['Open', 'On Progress', 'Closed'],
        //     datasets: [
        //         {
        //             data: [8, 5, 12],
        //             backgroundColor: ['#FECACA', '#BAE6FD', '#BBF7D0'],
        //             hoverBackgroundColor: ['#FCA5A5', '#7DD3FC', '#86EFAC']
        //         }
        //     ]
        // };

        this.ticketStatusOptions = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}
