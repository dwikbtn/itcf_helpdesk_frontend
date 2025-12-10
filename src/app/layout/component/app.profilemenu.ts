import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profilemenu',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="flex flex-col gap-2">
            <!-- logout button -->
            <button type="button" class="logout-btn" (click)="logout()">
                <i class="pi pi-sign-out"></i>
                <span> Logout</span>
            </button>
        </div>
    `,
    host: {
        class: 'hidden absolute top-13 right-0 w-48 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppProfileMenu {
    router = inject(Router);
    logout() {
        // Implement your logout logic here
        console.log('Logout clicked');
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}
