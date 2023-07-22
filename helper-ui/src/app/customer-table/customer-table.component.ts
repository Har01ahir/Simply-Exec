import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerTableDataSource } from './customer-table-datasource';
import { Customer } from './customer.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Customer>;
  dataSource!: CustomerTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'phone','created_at','updated_at'];

  constructor(
    private appService: AppService
  ) {
    // this.dataSource = new CustomerTableDataSource([]);
  }

  async ngOnInit() {
      const getCustomer = await this.appService.getRequest('/customer')
      
      getCustomer.subscribe((res: any) => {
        this.dataSource = new CustomerTableDataSource(res);
      });
      
  }

  ngAfterViewInit(): void {   
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
