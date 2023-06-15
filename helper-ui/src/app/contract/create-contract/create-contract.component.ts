import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, NgForm } from '@angular/forms';
// import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent {
  clickedSubmit = false;
  answer = '';
  @ViewChild('f') form!: NgForm;

  constructor() {}

  onSubmit() {
    this.clickedSubmit=true;
    console.log(this.form);
  }

  check() {
    if (this.form.valid){
      return true;
    }
    return false;
  }

}
