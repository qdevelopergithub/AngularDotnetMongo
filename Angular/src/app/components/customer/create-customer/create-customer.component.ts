import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/leela/redux1/app.state';
import { setLoadingSpinner } from 'src/app/leela/redux1/shared/shared.action';
import { CustomerService } from 'src/app/service/customer-service/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private store: Store<AppState>, private toastr: ToastrService) {
    this.customerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.customerService.createCustomer(formData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/customer-list']);
          this.toastr.success('Customer created successfully');
          this.store.dispatch(setLoadingSpinner({ status: false }));
        },
        error: (error: any) => {
          this.toastr.error('Error posting form data');
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }
      });
    } else {
      this.toastr.error('Form is invalid');
    }
  }

}
