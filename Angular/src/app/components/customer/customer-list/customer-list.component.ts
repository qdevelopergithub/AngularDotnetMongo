import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/interfaces/Customer';
import { AppState } from 'src/app/leela/redux1/app.state';
import { setLoadingSpinner } from 'src/app/leela/redux1/shared/shared.action';
import { CustomerService } from 'src/app/service/customer-service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  constructor(private customerService: CustomerService, private toastr: ToastrService , private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList() { 
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.customerService.getCustomers().subscribe(
      {
        next: (data) => {
          this.customers = data; 
          this.store.dispatch(setLoadingSpinner({ status: false }));
        },
        error: (error) => { 
          this.store.dispatch(setLoadingSpinner({ status: false }));
          console.error('Error fetching customers:', error);
          this.toastr.error('Error fetching customers');
        }
      }
    );
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) { 
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.customerService.deleteCustomer(id).subscribe({
        next: (response: any) => {
          this.toastr.success('Customer Deleted successfully!'); 
          this.store.dispatch(setLoadingSpinner({ status: false }));
          this.getCustomersList();
        },
        error: (error: any) => {
          this.toastr.error('Error deleting customer'); 
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }
      });
    }
  }

}
