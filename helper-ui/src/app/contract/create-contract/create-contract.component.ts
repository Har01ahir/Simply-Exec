import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormControl, FormGroup, NgForm, NgModelGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  clickedSubmit = false;
  form: any;
<<<<<<< HEAD
=======
  error = null;
>>>>>>> dev
  // @ViewChild('userData') userData!: NgForm;
  // user = {
  //   customer_name: '',
  //   customer_phone: '',
  //   customer_email: '',
  //   vendor_name: '',
  //   vendor_phone: '',
  //   vendor_email: '',
  // }
  

<<<<<<< HEAD
  constructor(private http: HttpClient,private router: Router, private activeRoute: ActivatedRoute) {}

  async onSubmit() {
    // console.log(this.form);
    await this.http.post('http://localhost:3000/contract/create', this.form.value).subscribe((response) => {
      console.log(response);
    })
    await setTimeout(()=> this.clickedSubmit = true, 1000);
=======
  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private http: HttpClient
    ) {}

  async onSubmit() {
    // console.log(this.form);

    await this.http.post('http://localhost:3000/contract/create',this.form.value).subscribe( res => {
      setTimeout(()=> this.clickedSubmit = true, 1000)
    })
    
>>>>>>> dev
    
  }

  ngOnInit() {
    this.form = new FormGroup({
      'customer': new FormGroup({
        'name': new FormControl(null, Validators.required),
        'phone': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'vendor': new FormGroup({
        'name': new FormControl(null, Validators.required),
        'phone': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
    });
  }
  
}
