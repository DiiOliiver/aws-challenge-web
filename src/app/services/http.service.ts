import { inject, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance: AxiosInstance;
  private alertService: AlertService = inject(AlertService)

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected async findAll(routeName: string): Promise<any> {
    const { data } = await this.axiosInstance.get(`/${routeName}`);
    return data;
  }

  protected async create(routeName: string, data: unknown) {
    const response = await this.axiosInstance.post(`/${routeName}`, data);
    return response.data;
  }

  protected async delete(routeName: string, id: number) {
    const response = await this.axiosInstance.delete(`/${routeName}/${id}`);
    return response.data;
  }

  protected async deleteList(routeName: string, data: unknown) {
    const response = await this.axiosInstance.post(`/${routeName}/delete`, data);
    return response.data;
  }
}
