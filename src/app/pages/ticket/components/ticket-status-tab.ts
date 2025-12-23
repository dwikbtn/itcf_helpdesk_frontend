import { Ticket, TicketStatus } from '@/state/store/ticket/ticket.state';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ticket-status-tab',
    template: `<div class="tabs flex items-center gap-2" role="tablist" aria-label="Ticket status tabs">
        <button type="button" class="tab" role="tab" [attr.aria-selected]="selectedTab === 'all'" [class.active]="selectedTab === 'all'" (click)="selectTab('all')">
            All <span class="count">({{ totalCount }})</span>
        </button>
        <button type="button" class="tab" role="tab" [attr.aria-selected]="selectedTab === TicketStatus.OPEN" [class.active]="selectedTab === TicketStatus.OPEN" (click)="selectTab(TicketStatus.OPEN)">
            Open <span class="count">({{ openedCount }})</span>
        </button>
        <button type="button" class="tab" role="tab" [attr.aria-selected]="selectedTab === TicketStatus.IN_PROGRESS" [class.active]="selectedTab === TicketStatus.IN_PROGRESS" (click)="selectTab(TicketStatus.IN_PROGRESS)">
            In Progress <span class="count">({{ inProgressCount }})</span>
        </button>
        <button type="button" class="tab" role="tab" [attr.aria-selected]="selectedTab === TicketStatus.CLOSED" [class.active]="selectedTab === TicketStatus.CLOSED" (click)="selectTab(TicketStatus.CLOSED)">
            Closed <span class="count">({{ closedCount }})</span>
        </button>
    </div>`,
    styles: [
        `
            .tabs .tab.active {
                font-weight: 800;
            }
        `
    ]
})
export class TicketStatusTab {
    // Component logic goes here
    TicketStatus = TicketStatus;

    @Input() selectedTab: Ticket['status'] | 'all' = 'all';
    @Input() totalCount: number = 0;
    @Input() openedCount: number = 0;
    @Input() inProgressCount: number = 0;
    @Input() closedCount: number = 0;
    selectTab(tab: 'all' | Ticket['status']) {
        this.selectedTab = tab;
        // Emit event or call method to filter tickets based on selected tab
        this.tabSelected.emit(tab);
    }
    @Output() tabSelected = new EventEmitter<'all' | Ticket['status']>();
}
