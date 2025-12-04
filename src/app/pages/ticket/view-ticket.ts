import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Badge } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-view-ticket',
    template: `<section class="mb-4 card">
        <div class="flex mb-7">
            <div class="flex flex-col">
                <h2 class="mb-2">{{ ticketData.title }}</h2>
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Ticket from: <span class="font-medium text-slate-700 dark:text-slate-300">{{ ticketData.user }}</span>
                </div>
                <div class="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div><span class="font-medium">Created:</span> {{ ticketData.createdAt }}</div>
                    <div><span class="font-medium">Updated:</span> {{ ticketData.updatedAt }}</div>
                </div>
                <div class="flex gap-2 mt-3">
                    <p-badge [value]="ticketData.status" badgeSize="large" [severity]="statusColor" />
                    <p-badge [value]="ticketData.priority" badgeSize="large" [severity]="priorityColor" />
                </div>
            </div>
            <!-- action group button here -->
            <div class="button-group ml-auto flex gap-2 items-start">
                <button pButton type="button" label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
                <!-- <button pButton type="button" label="Close Ticket" icon="pi pi-times" class="p-button-text"></button> -->
            </div>
        </div>
        <p-divider></p-divider>
        <!-- description section -->
        <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Ticket Description</h3>
            <p class="text-surface-700 dark:text-surface-300">{{ ticketData.description }}</p>
        </div>
        <!-- image attachments section -->
        <div class="mt-6" *ngIf="ticketData.imgAttachments && ticketData.imgAttachments.length > 0">
            <h3 class="text-lg font-semibold mb-2">Image Attachments</h3>
            <div class="flex flex-wrap gap-4">
                <a *ngFor="let img of ticketData.imgAttachments" [href]="img" target="_blank" rel="noopener noreferrer" class="border rounded-md overflow-hidden w-40 h-40 cursor-pointer hover:opacity-80 transition-opacity">
                    <img [src]="img" alt="Attachment" class="w-full h-full object-cover" />
                </a>
            </div>
        </div>
    </section>`,
    imports: [ButtonDirective, Badge, DividerModule, CommonModule]
})
export class ViewTicket {
    ticketData = {
        id: 1,
        title: 'Sample Ticket Title',
        user: 'John Doe',
        status: 'Open',
        priority: 'High',
        description: 'This is a detailed description of the ticket issue reported by the user.',
        imgAttachments: ['https://placehold.co/150', 'https://placehold.co/150'],
        updatedAt: '04/12/2024 10:30 AM',
        createdAt: '01/12/2024 09:00 AM'
    };

    get priorityColor() {
        switch (this.ticketData.priority) {
            case 'Low':
                return 'success';
            case 'Medium':
                return 'warn';
            case 'High':
                return 'danger';
            default:
                return 'info';
        }
    }

    get statusColor() {
        switch (this.ticketData.status) {
            case 'Open':
                return 'info';
            case 'In Progress':
                return 'warn';
            case 'Closed':
                return 'success';
            default:
                return 'secondary';
        }
    }
}
