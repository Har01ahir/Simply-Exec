import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  clickedSubmit = false;
  form: any;
  error = null;
  

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private appService: AppService
    ) {}

  async onSubmit() {
    // console.log(this.form);
    const createSubscription = await this.appService.postRequest('/contract/create',this.form.value)
    
    createSubscription.subscribe( (_: any) => {
      setTimeout(()=> this.clickedSubmit = true, 1000)
    }, (error: any)=>{
      this.error = error.message;
      console.log(error)
    })
    
    
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
