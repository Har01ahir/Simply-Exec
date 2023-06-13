import { Component } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
  ) {}
  
  OnViewContract() {
    console.log("navigate to view contract!");
    this.router.navigate(['view-contracts'], {relativeTo: this.activeroute});
  }
}
