import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ContractTableDataSource } from './contract-table-datasource';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map } from 'rxjs';
import { Contract } from '../contract.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerPaymentStatus } from '../enum/payment-status.enum';
import { VendorDeliveryStatus } from '../enum/vendor-delivery-status.enum';
import { ContractStatus } from '../enum/contract-status.enum';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements AfterViewInit, OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contract>;
  // @Input('contracts') contracts!: Observable<Contract[]>; 
  dataSource!: ContractTableDataSource;
  length = 0;
  changepaymentstatus = false;
  changedeliverystatus = false;
  changecontractstatus = false;

  paymentStatus: any;
  deliveryStatus: any;
  setContractStatus: any;
  
  customerPaymentStatus = CustomerPaymentStatus;
  vendorDeliveryStatus = VendorDeliveryStatus;
  contractStatus = ContractStatus;
  
  curr_Contract_id!: number;
  searchText!: string;
  // contracts!: Observable<Contract[]>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customerId','vendorId','customer_payment_status','vendor_delivery_status','status','created_at','updated_at'];

  constructor(
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {
    
    this.fetchContracts()
    
    // On change Customer Payment Status
    this.paymentStatus = new FormGroup({
      'amount': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required)
    })

    this.deliveryStatus = new FormGroup({
      'status': new FormControl(null, Validators.required)
    })

    this.setContractStatus = new FormGroup({
      'status': new FormControl(null, Validators.required)
    })
  }

  fetchContracts() {
    this.http.
      get<Contract[]>('http://localhost:3000/contract/view-contracts').subscribe(res => {

      this.dataSource = new ContractTableDataSource(res);
      this.length = this.dataSource.data.length;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    const sortState: Sort = { active: 'id', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  async onChangePaymentStatus() {

    let found = this.dataSource.data.find(obj => obj.id === this.curr_Contract_id)

    await this.http.post('http://localhost:3000/payment/'+this.curr_Contract_id,this.paymentStatus.value).subscribe((res) => {
      window.location.href = '/contract/view-contracts';
    });
    
  } 

  async onChangeDeliveryStatus() {
    let found = this.dataSource.data.find(obj => obj.id === this.curr_Contract_id)

    if (found && found.vendor_delivery_status!==this.deliveryStatus.value.status) {
      await this.http.patch('http://localhost:3000/contract/deliverystatus/'+this.curr_Contract_id,this.deliveryStatus.value).subscribe((res) => {
        console.log(res);
        window.location.href = '/contract/view-contracts';
      })
    }
    
    this.changedeliverystatus = false;
  }

  async onChangeContractStatus() {
    let found = this.dataSource.data.find(obj => obj.id === this.curr_Contract_id)

    if (found && found.status!==this.setContractStatus.value.status) {
      await this.http.patch('http://localhost:3000/contract/status/'+this.curr_Contract_id,this.setContractStatus.value).subscribe((res) => {
        console.log(res);
        window.location.href = '/contract/view-contracts';
      })
      console.log(this.setContractStatus.value);
    }
    
    
    this.changecontractstatus = false
  }

  toChangeStatus(id:number, status: string) {
    if (status === 'payment') {
      this.changepaymentstatus =true;
      // console.log(status)
    } else if (status === 'delivery') {
      this.changedeliverystatus = true;

    } else if (status === 'contract') {
      this.changecontractstatus = true
    }

    this.curr_Contract_id = id;
  }


  performSearch() {
    // this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
}
