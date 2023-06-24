import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contract } from '../contract.model';
import { Observable, map } from 'rxjs';
;


@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  contracts!: Observable<Contract[]>;

  // table = new DataTable('#myTable');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { 
    
   }

  ngOnInit() {

    // const that = this
    // this.fetchContracts();

    // $('#myTable').append();

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.http.get<Contract[]>('http://localhost:3000/contract/view-contracts').subscribe(resp => {
    //       that.contracts = resp;
    //       console.log(resp);
    //     });
    //   },
    //   columns: [{ data: 'id' }, { data: 'customerId' }, { data: 'vendorId' }, { data: 'customer_payment_status' }, { data: 'vendor_delivery_status' }, { data: 'status' }, { data: 'created_at' }, { data: 'updated_at'} ]
    // };
  }

  

  // Get all Contracts from server
  fetchContracts() {
    this.contracts = this.http.
      get<{ [key: string]: Contract }>('http://localhost:3000/contract/view-contracts')
      .pipe(map((responseData) => { // operator observable
        let contracts: Contract[] = []
        for (let key in responseData){
          contracts.push(responseData[key]);
        }
        console.log(contracts);
        return contracts;
      }))
      // .subscribe((response: Contract[]) => { // subscribe
      //   this.contracts = response;
      // });
  }




  ngOnDestroy() {  }

}
