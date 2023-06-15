import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, NgForm, NgModelGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent {
  clickedSubmit = false;
  @ViewChild('f') form!: NgForm;
  // @ViewChild('userData') userData!: NgForm;
  storeform!: any;
  

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  onSubmit() {
    console.log(this.form);
    this.clickedSubmit = true;
    // this.router.navigate(['/contract/view-contracts'],{relativeTo: this.activeRoute})
  }

  

}
