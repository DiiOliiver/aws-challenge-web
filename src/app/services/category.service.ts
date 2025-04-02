import { Injectable } from '@angular/core';
import {ApiService} from './http.service';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor() {
    super()
  }

  async findAllCategories() {
    return of(await this.findAll('categories'));
  }

  createCategory(data: unknown) {
    return this.create('categories', data);
  }

  deleteCategory(id: number) {
    return this.delete('categories', id);
  }
}
