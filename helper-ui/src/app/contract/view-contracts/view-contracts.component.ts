import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contract } from '../contract.model';
<<<<<<< HEAD
import { map } from 'rxjs';
=======
import { Observable, map } from 'rxjs';
>>>>>>> dev
;


@Component({
  selector: 'app-view-contracts',
  templateUrl: './view-contracts.component.html',
  styleUrls: ['./view-contracts.component.css']
})
export class ViewContractsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
<<<<<<< HEAD
  contracts!: Contract[];
=======
  contracts!: Observable<Contract[]>;

>>>>>>> dev
  // table = new DataTable('#myTable');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { 
    
   }

  ngOnInit() {

<<<<<<< HEAD
    const that = this
=======
    // const that = this
>>>>>>> dev
    // this.fetchContracts();

    // $('#myTable').append();

<<<<<<< HEAD
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.get<Contract[]>('http://localhost:3000/contract/view-contracts').subscribe(resp => {
          that.contracts = resp;
          console.log(resp);
        });
      },
      columns: [{ data: 'id' }, { data: 'customerId' }, { data: 'vendorId' }, { data: 'customer_payment_status' }, { data: 'vendor_delivery_status' }, { data: 'status' }, { data: 'created_at' }, { data: 'updated_at'} ]
    };
=======
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
>>>>>>> dev
  }

  

  // Get all Contracts from server
  fetchContracts() {
<<<<<<< HEAD
    this.http.
=======
    this.contracts = this.http.
>>>>>>> dev
      get<{ [key: string]: Contract }>('http://localhost:3000/contract/view-contracts')
      .pipe(map((responseData) => { // operator observable
        let contracts: Contract[] = []
        for (let key in responseData){
          contracts.push(responseData[key]);
        }
        console.log(contracts);
        return contracts;
      }))
<<<<<<< HEAD
      .subscribe((response: Contract[]) => { // subscribe
        this.contracts = response;
      });
=======
      // .subscribe((response: Contract[]) => { // subscribe
      //   this.contracts = response;
      // });
>>>>>>> dev
  }




  ngOnDestroy() {  }

}
