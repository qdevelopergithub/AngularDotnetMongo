import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './leela/nav/nav.component'; 
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer-list', pathMatch: 'full' },
  {
    path: '', component: NavComponent,
    children: [
      { path: 'create-customer', component: CreateCustomerComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: 'edit-customer/:id', component: EditCustomerComponent },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('app routing module')
  }
}
