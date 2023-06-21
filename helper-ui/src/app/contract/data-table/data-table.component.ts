import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableDataSource } from './data-table-datasource';
import { Contract } from '../contract.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contract>;
  dataSource!: DataTableDataSource;;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customerId','vendorId','customer_payment_status','vendor_delivery_status','status','created_at','updated_at'];

  constructor(
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {
    this.http.get<Contract[]>('http://localhost:3000/contract/view-contracts').subscribe(res => {
      this.dataSource = new DataTableDataSource(res);
      console.log(this.dataSource);
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
