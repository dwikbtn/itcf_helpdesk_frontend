import { Ticket } from '@/state/store/ticket/ticket.state';

export function formatDate(date: Date | undefined): string {
    if (!date) return '-';

    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return d.toLocaleString('en-US', options);
}

export function statusLabel(status: Ticket['status']) {
    switch (status) {
        case 'open':
            return 'Open';
        case 'in-progress':
            return 'In Progress';
        case 'closed':
            return 'Closed';
    }
}

export function priorityClass(priority: Ticket['priority']) {
    return {
        'priority-high': priority === 'High',
        'priority-medium': priority === 'Medium',
        'priority-low': priority === 'Low'
    };
}

export function statusClass(status: Ticket['status']) {
    return {
        'status-open': status === 'open',
        'status-in-progress': status === 'in-progress',
        'status-closed': status === 'closed'
    };
}
