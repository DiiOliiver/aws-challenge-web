import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';
import { DeviceService } from '../../services/device.service';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: true,
  selector: 'app-device-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './device-form-dialog.component.html',
  styleUrl: './device-form-dialog.component.scss'
})
export class DeviceFormDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DeviceFormDialogComponent>);
  private deviceService = inject(DeviceService);
  private alertService = inject(AlertService);
  private categoryService: CategoryService = inject(CategoryService)
  categories: {id: number, name: string}[] = []

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
  }

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: [[Validators.required]],
    color: ['', [Validators.required]],
    partNumber: ['', [Validators.required]]
  });

  async loadCategories(): Promise<void> {
    const result = await this.categoryService.findAllCategories();
    result.subscribe((data: any) => {
      this.categories = data;
    });
  }

  async create() {
    if (this.form.invalid) return;

    this.deviceService.createDevice(this.form.value)
      .then(value => {
        this.alertService.success('Category created successfully!');
        this.dialogRef.close(true);
      })
      .catch(async ({ response }) => {
        this.alertService.error(response.data, 'Error creating device')
      })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
