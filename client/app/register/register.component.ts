import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   addRegisterForm: FormGroup;
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  repassword = new FormControl('', Validators.required);
  constructor(private http: Http,
              private router: Router,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addRegisterForm = this.formBuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
      repassword: this.repassword,
    });
  }
  RegisterSubmit() {
    var passval=this.addRegisterForm.value.password;
    var repassval=this.addRegisterForm.value.repassword;
    if (passval!=repassval)
      this.toast.setMessage("Password doesn't rematch.", 'warning');
    else 
    this.dataService.addUser(this.addRegisterForm.value).subscribe(
      res => {
        const newCat = res.json();
        this.addRegisterForm.reset();
        this.toast.setMessage('Sign up process has done successfully.', 'success');
      },
      error => this.toast.setMessage("Duplicate Username.", 'warning')
    );
  }

}
