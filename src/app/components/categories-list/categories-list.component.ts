import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  standalone: true,
  selector: 'app-categories-list',
  imports: [
    CommonModule, MatPaginatorModule,
    MatTableModule, MatCheckboxModule,
    MatButtonModule, MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name'];
  categories = new MatTableDataSource<any>([]);
  selectedCategories = new Set<number>();
  private categoryService: CategoryService = inject(CategoryService)

  @ViewChild(MatPaginator) paginator!: MatPaginator

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    const result = await this.categoryService.findAllCategories();
    result.subscribe((data: any) => {
      this.categories.data = data;
      this.categories.paginator = this.paginator;
    });
  }

  toggleSelection(id: number) {
    this.selectedCategories.has(id) ? this.selectedCategories.delete(id) : this.selectedCategories.add(id);
  }

  deleteSelected() {
    console.log('Deletando categorias');
    const data = Array.from(this.selectedCategories)
    this.categoryService.deleteListCategory(data)
      .then(value => {
        console.log("Categoria removida")
      })
      .catch(reason => {
        console.log("Categoria não foi removido")
      })
    this.selectedCategories.clear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categories.filter = filterValue.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }
}
