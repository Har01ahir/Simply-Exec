import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VendorTableDataSource } from './vendor-table-datasource';
import { Vendor } from './vendor.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.css']
})
export class VendorTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vendor>;
  dataSource!: VendorTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'phone','created_at','updated_at'];

  constructor(
    private appService: AppService
  ) {
    
  }

  async ngOnInit() {
      const getVendors = await this.appService.getRequest('/vendor')
      
      getVendors.subscribe((res: any) => {
        this.dataSource = new VendorTableDataSource(res);
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
