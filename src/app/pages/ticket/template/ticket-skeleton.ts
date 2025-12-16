import { Component } from '@angular/core';
// import { Skeleton } from 'primeng/skeleton'
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'tr[app-ticket-skeleton]',
    template: `
        <td><p-skeleton /></td>
        <td>
            <p-skeleton />
        </td>
        <td><p-skeleton /></td>
        <td>
            <p-skeleton />
        </td>
        <td>
            <p-skeleton />
        </td>
        <td>
            <p-skeleton />
        </td>
    `,
    imports: [SkeletonModule]
})
export class TicketSkeleton {
    ngOnInit() {
        console.log('TicketSkeleton initialized');
    }
}
