import { Component, inject } from '@angular/core';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthContainer } from './components/AuthContainer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-forgot-password',
    providers: [MessageService],
    template: `
        <app-floating-configurator />
        <p-toast position="top-right" />
        <!-- <p-toast position="top-right" /> -->
        <app-auth-container>
            <div class="text-center mb-8">
                <img src="ITCF.webp" alt="Logo" class="mb-8 w-64 shrink-0 mx-auto" />
            </div>
            <!-- email  -->
            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
            <input pInputText id="email" type="text" placeholder="Email" class="w-full md:w-120" formControlName="email" (keyup.enter)="onSubmit()" [ngClass]="{ 'ng-invalid ng-dirty': submitted && f.email.invalid }" />
            <p-message *ngIf="submitted && f.email.errors?.['required']" severity="error" variant="simple" size="small"> Email wajib diisi </p-message>
            <p-message *ngIf="submitted && f.email.errors?.['email']" severity="warn" variant="simple" size="small"> Email tidak valid </p-message>

            <!-- Remember me (opsional) -->
            <div class="flex items-center justify-between mt-4 mb-8 gap-8"></div>
            <!-- button  -->
            <button pButton type="submit" class="w-full" [label]="loading ? 'Forgotting…' : 'Forgot Password'" [disabled]="loading"></button>
        </app-auth-container>
    `,
    imports: [AppFloatingConfigurator, ToastModule, AuthContainer, Message, CommonModule, ButtonModule, InputTextModule]
})
export class ForgotPassword {
    loading = false;
    error = '';
    submitted = false;
    router = inject(Router);

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    get f() {
        return this.form.controls;
    }

    // TODO: Handle Submit Forgot Password
    onSubmit() {
        this.submitted = true;
        this.form.markAllAsTouched();
        console.log(this.form.value);
    }
}
