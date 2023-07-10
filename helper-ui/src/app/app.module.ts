import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { ContractComponent } from './contract/contract.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { ViewContractsComponent } from './contract/view-contracts/view-contracts.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ContractTableComponent } from './contract/contract-table/contract-table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Contract } from './contract/contract.model';
import { TimestampPipe } from './contract/contract-table/date.pipe';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { VendorTableComponent } from './vendor-table/vendor-table.component';
// import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaymentTableComponent } from './payment-table/payment-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    HeaderComponent,
    ContractComponent,
    CreateContractComponent,
    ViewContractsComponent,
    ContractTableComponent,
    TimestampPipe,
    CustomerTableComponent,
    VendorTableComponent,
    PaymentTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
