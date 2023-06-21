import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContractTableDataSource } from './contract-table-datasource';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../contract.model';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contract>;
  @Input('contracts') contracts!: Observable<Contract[]>; 
  dataSource!: ContractTableDataSource;;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customerId','vendorId','customer_payment_status','vendor_delivery_status','status','created_at','updated_at'];

  constructor(
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {
    this.contracts.subscribe(res => {
      this.dataSource = new ContractTableDataSource(res);
      console.log(this.dataSource);
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
