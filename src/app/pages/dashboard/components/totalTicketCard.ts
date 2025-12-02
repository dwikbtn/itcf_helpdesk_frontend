import { Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-total-ticket-card',
    host: { class: 'col-span-12 md:col-span-4' },
    template: ` <div class="card grid grid-cols-2 gap-1">
        <div class="col-span-1 justify-self-start">
            <span [class]="icon" [style.color]="iconColor"></span>
        </div>
        <div class="col-span-1 justify-self-end">
            <div class="bg-[#F3F4F6] p-2">
                <!-- TODO: Redirect to the ticket based on status -->
                <span class="pi pi-arrow-up-right hover:cursor-pointer " pTooltip="Redirect to tickets based on status  " tooltipPosition="top"></span>
            </div>
        </div>
        <div class="col-span-2 text-center mt-4">
            <div class="text-3xl font-bold">{{ dataValue }}</div>
            <div class="text-surface-500">{{ dataLabel }}</div>
        </div>
    </div>`,
    standalone: true,
    imports: [TooltipModule]
})
export class TotalTicketCard {
    @Input() icon?: string;
    @Input() iconColor?: string;
    @Input() dataValue: string = '';
    @Input() dataLabel: string = '';
}
