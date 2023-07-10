import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaymentTableDataSource } from './payment-table-datasource';
import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Payment>;
  dataSource!: PaymentTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'contractId', 'amount', 'status', 'created_at'];

  constructor(
    private http: HttpClient
  ) {
    // this.dataSource = [];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    this.fetch_payments()
  }

  fetch_payments() {
    this.http.get<Payment[]>('http://localhost:3000/payment').subscribe(res => {
      this.dataSource = new PaymentTableDataSource(res)
    })
  }
}
