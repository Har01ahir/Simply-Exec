import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ContractTableDataSource } from './contract-table-datasource';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../contract.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerPaymentStatus } from '../enum/payment-status.enum';
import { VendorDeliveryStatus } from '../enum/vendor-delivery-status.enum';
import { ContractStatus } from '../enum/contract-status.enum';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.css']
})
export class ContractTableComponent implements AfterViewInit, OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contract>;
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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customerId','vendorId','customer_payment_status','vendor_delivery_status','status','created_at','updated_at'];

  constructor(
    private appService: AppService
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

  async fetchContracts() {
    const getContracts = await this.appService.getRequest('/contract/view-contracts')
    
    getContracts.subscribe((res: any)=> {
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

    const changePaymentStatusRequest = await this.appService.postRequest('/payment/'+this.curr_Contract_id,this.paymentStatus.value)
    
    changePaymentStatusRequest.subscribe((res: any) => {
      window.location.href = '/contract/view-contracts';
    });
    
  } 

  async onChangeDeliveryStatus() {
    let found = this.dataSource.data.find(obj => obj.id === this.curr_Contract_id)

    if (found && found.vendor_delivery_status!==this.deliveryStatus.value.status) {
      const changeDeliveryStatusRequest = await this.appService.patchRequest('/contract/deliverystatus/'+this.curr_Contract_id,this.deliveryStatus.value)
      
      changeDeliveryStatusRequest.subscribe((res: any) => {
        console.log(res);
        window.location.href = '/contract/view-contracts';
      })
    }
    
    this.changedeliverystatus = false;
  }

  async onChangeContractStatus() {
    let found = this.dataSource.data.find(obj => obj.id === this.curr_Contract_id)

    if (found && found.status!==this.setContractStatus.value.status) {
      const changeContractStatusRequest = await this.appService.patchRequest('/contract/status/'+this.curr_Contract_id,this.setContractStatus.value)
      
      changeContractStatusRequest.subscribe((res: any) => {
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
