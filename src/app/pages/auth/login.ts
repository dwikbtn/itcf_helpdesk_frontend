import { Component, inject } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { ToastModule } from 'primeng/toast';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthContainer } from './components/AuthContainer';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ToastModule, FormsModule, ReactiveFormsModule, MessageModule, CommonModule, AuthContainer],
    providers: [MessageService],
    template: `
        <app-floating-configurator />
        <p-toast position="top-right" />
        <app-auth-container>
            <!-- logo image = -->
            <div class="text-center mb-8">
                <img src="ITCF.webp" alt="Logo" class="mb-8 w-64 shrink-0 mx-auto" />
            </div>
            <form (ngSubmit)="onSubmit()" [formGroup]="form" autocomplete="on" novalidate>
                <!-- email  -->
                <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                <input pInputText id="email" type="text" placeholder="Email" class="w-full md:w-120" formControlName="email" (keyup.enter)="onSubmit()" [ngClass]="{ 'ng-invalid ng-dirty': submitted && f.email.invalid }" />
                <p-message *ngIf="submitted && f.email.errors?.['required']" severity="error" variant="simple" size="small"> Email wajib diisi </p-message>
                <p-message *ngIf="submitted && f.email.errors?.['email']" severity="warn" variant="simple" size="small"> Email tidak valid </p-message>
                <!-- Password -->
                <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2 mt-6">Password</label>
                <p-password id="password" formControlName="password" placeholder="Password" [toggleMask]="true" styleClass="mb-2 w-full" [fluid]="true" [feedback]="false" (onKeydownEnter)="onSubmit()"> </p-password>
                <p-message *ngIf="submitted && f.password.errors?.['required']" severity="error" variant="simple" size="small"> Password wajib diisi </p-message>

                <!-- Forgot password -->
                <!-- NOTE: Hide forgot password -->
                <!-- <div class="flex items-center justify-between mt-4 mb-8 gap-8" (click)="onForgotPassword()">
                    <span class="font-medium no-underline ml-auto text-right cursor-pointer text-primary">Forgot password?</span>
                </div> -->

                <button pButton type="submit" class="w-full" [label]="loading ? 'Signing in…' : 'Sign In'" [disabled]="loading"></button>
            </form>
        </app-auth-container>
    `
})
export class Login {
    loading = false;
    error = '';
    submitted = false;
    router = inject(Router);

    onSubmit() {
        this.submitted = true;
        this.msgs = [];
        this.form.markAllAsTouched();
        console.log(this.form.value);
        //TODO: Add your authentication logic here
        if (this.form.valid) {
            console.log('Form Submitted!', this.form.value);
            this.router.navigateByUrl('/');
        }
    }

    onForgotPassword() {
        this.router.navigate(['/auth/forgot-password']);
    }

    msgs: ToastMessageOptions[] | null = [];

    form = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
            // Validators.minLength(4),
            // Validators.pattern(/^[a-zA-Z0-9._]+$/)
        ]),
        password: new FormControl('', [Validators.required])
    });

    get f() {
        return this.form.controls;
    }
}
