import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces/Customer';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl: string; 

  constructor(private http: HttpClient) {
    this.apiUrl = environment.BaseURl 
  }

  createCustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + "api/Customer/CreateCustomer", data);
  }

  updateCustomer(data: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl + "api/Customer/UpdateCustomer", data);
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + "api/Customer/GetAll");
  }

  getCustomerById(id:string): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + `api/Customer/GetById?id=${id}`);
  }

  deleteCustomer(id:string): Observable<Customer> {
    return this.http.delete<Customer>(this.apiUrl + `api/Customer/Delete?id=${id}`);
  }
}
