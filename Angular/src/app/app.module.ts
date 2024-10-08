import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './redux/reducers'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NavComponent } from './leela/nav/nav.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { postReducer } from './leela/redux1/posts.reducer';
import { appReducer } from './leela/redux1/app.state'; 
import { EffectsModule } from '@ngrx/effects';
import { SpinnerComponent } from './leela/spinner/spinner.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LayoutComponent,
    UserCardComponent,
    UserListComponent, 
    NavComponent,
    SpinnerComponent,
    CreateCustomerComponent,
    CustomerListComponent,
    EditCustomerComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    FormsModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    ReactiveFormsModule,
    EffectsModule.forRoot([])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('app module')
  }

}
