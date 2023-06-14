import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent {
  clickedSubmit = false;

  constructor() {}

  onSubmit() {
    this.clickedSubmit=true;
    // alert("Submitted Here!");
    // this.http.get('http://localhost:4200/contract/create-contract');
  }

}
