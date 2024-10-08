import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/interfaces/Customer';
import { CustomerService } from 'src/app/service/customer-service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerId!: string;
  customer!: Customer;
  customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.customerForm = this.fb.group({
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id')!;
    this.getCustomerById(this.customerId);
  }

  getCustomerById(id: string): void {
    this.customerService.getCustomerById(id).subscribe({
      next: (response: Customer) => {
        this.customerForm.patchValue(response);
      },
      error: (error: any) => {
        console.log(error)
        this.toastr.error('Error fetching customer');
      }
    });
  }

  updateCustomer(): void {
    console.log(this.customerForm.value)
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      this.customerService.updateCustomer(formData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/customer-list']);
          this.toastr.success('Customer Edit successfully!');
        },
        error: (error: any) => {
          this.toastr.error('Failed to Edit customer.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
