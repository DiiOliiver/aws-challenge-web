import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { AlertService } from '../../services/alert.service';

@Component({
  standalone: true,
  selector: 'app-category-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './category-form-dialog.component.html',
  styleUrl: './category-form-dialog.component.scss'
})
export class CategoryFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CategoryFormDialogComponent>);
  private categoryService = inject(CategoryService);
  private alertService = inject(AlertService);

  form: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(128)
    ]]
  });

  async create() {
    if (this.form.invalid) return;

    this.categoryService.createCategory(this.form.value)
      .then(value => {
        this.alertService.success('Category created successfully!');
        this.dialogRef.close(true);
      })
      .catch(({ response }) => {
        this.alertService.error(response.data, 'Error creating category')
      })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
