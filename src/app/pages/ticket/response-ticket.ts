import { Component } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-response-ticket',
    imports: [Select, Button, InputText, Textarea],
    template: `<section class="mb-4 card">
        <div class="text-3xl font-bold mb-4">Response Ticket</div>
        <form>
            <div class="grid grid-cols-12 gap-4 mb-4">
                <div class="col-span-6">
                    <div class="card">
                        <!-- User -->
                        <div class="mb-4">
                            <label for="user" class="block text-sm font-medium mb-2">User</label>
                            <input id="user" type="text" pInputText [value]="" [disabled]="true" class="w-full bg-gray-100" />
                        </div>

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium mb-2">Title</label>
                            <input id="title" type="text" pInputText name="title" [disabled]="true" class="w-full" />
                        </div>

                        <!-- Description -->
                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium mb-2">Description</label>
                            <textarea id="description" pTextarea name="description" rows="5" class="w-full" [disabled]="true"></textarea>
                        </div>

                        <!-- Upload Attachments -->
                        <!-- <div class="flex flex-col gap-3">
                            <label class="text-sm font-medium text-surface-900 dark:text-surface-0"> Attachments </label>
                            <div class="flex gap-2">
                                <p-fileupload mode="basic" name="image" accept="image/*" [maxFileSize]="5000000" [auto]="true" chooseLabel="Upload Attatchment" (onSelect)="onImageSelect($event)" styleClass="flex-1" chooseIcon="pi pi-image">
                                </p-fileupload>
                                
                            </div>
                           
                        </div> -->
                    </div>
                </div>
                <div class="col-span-6">
                    <div class="card">
                        <!-- effort -->
                        <div class="mb-4">
                            <label for="effort" class="block text-sm font-medium mb-2">Effort</label>
                            <p-select id="effort" name="effort" placeholder="Select Effort" optionLabel="label" optionValue="value" class="w-full" />
                        </div>
                        <!-- Priority -->
                        <div class="mb-4">
                            <label for="priority" class="block text-sm font-medium mb-2">Priority</label>
                            <p-select id="priority" name="priority" placeholder="Select Priority" optionLabel="label" optionValue="value" class="w-full" />
                        </div>

                        <!-- Status -->
                        <div class="mb-4">
                            <label for="status" class="block text-sm font-medium mb-2">Status</label>
                            <p-select id="status" name="status" placeholder="Select Status" optionLabel="label" optionValue="value" class="w-full" />
                        </div>
                        <!-- System/Application -->
                        <div class="mb-4">
                            <label for="application" class="block text-sm font-medium mb-2">System/Application</label>
                            <p-select id="application" name="application" placeholder="Select Application" optionLabel="label" optionValue="value" class="w-full" />
                        </div>

                        <!-- Assign To -->
                        <div class="mb-4">
                            <label for="assignee" class="block text-sm font-medium mb-2">Assign To</label>
                            <p-select id="assignee" name="assignee" placeholder="Select Assignee" optionLabel="label" optionValue="value" class="w-full" />
                        </div>
                        <!-- Description -->
                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium mb-2">response</label>
                            <textarea id="description" pTextarea name="description" rows="5" class="w-full" [disabled]="true"></textarea>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2 mt-6">
                            <p-button label="Response Ticket" icon="pi pi-check" severity="success" type="submit" [disabled]="!hasChanges()" />
                            <p-button label="Cancel" icon="pi pi-times" severity="secondary" type="button" (onClick)="onCancel()" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>`
})
export class ResponseTicket {
    hasChanges() {
        return true;
    }

    onCancel() {
        // Cancel logic here
    }

    onImageSelect(event: any) {
        // Image select logic here
    }

    programList = [
        { id: 'mis', name: 'MIS' },
        { id: 'itcMobile', name: 'ITC Mobile' },
        { id: 'portal', name: 'Portal' },
        { id: 'hardware', name: 'Hardware' }
    ];
}
