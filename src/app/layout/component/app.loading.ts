import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `<div class="loading-spinner">
        <i class="pi pi-spinner pi-spinner" style="font-size: 2em"></i>
    </div>`,
    styles: [
        `
            .loading-spinner {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
        `
    ]
})
export class AppLoading {}
