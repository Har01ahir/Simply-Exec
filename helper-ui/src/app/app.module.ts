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
import { DataTableComponent } from './contract/data-table/data-table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Contract } from './contract/contract.model';
import { DataTableDataSource } from './contract/data-table/data-table-datasource';
import { TimestampPipe } from './contract/data-table/date.pipe';

// import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    HeaderComponent,
    ContractComponent,
    CreateContractComponent,
    ViewContractsComponent,
    DataTableComponent,
    TimestampPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
