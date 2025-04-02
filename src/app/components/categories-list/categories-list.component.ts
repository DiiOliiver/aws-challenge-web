import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';


@Component({
  standalone: true,
  selector: 'app-categories-list',
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name'];
  categories = [] as any;
  selectedCategories = new Set<number>();
  private categoryService: CategoryService = inject(CategoryService)

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    const result = await this.categoryService.findAllCategories();
    result.subscribe((data: any) => {
      this.categories = data;
    });
  }

  toggleSelection(id: number) {
    this.selectedCategories.has(id) ? this.selectedCategories.delete(id) : this.selectedCategories.add(id);
  }

  deleteSelected() {
    console.log('Deletando categorias:', Array.from(this.selectedCategories));
    this.selectedCategories.clear();
  }
}
