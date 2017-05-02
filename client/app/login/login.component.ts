import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   addLoginForm: FormGroup;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  user = <any>{};
  constructor(private http: Http,
              private dataService: DataService,
              private router: Router,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addLoginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }
  LoginSubmit() {
    this.getUser();
   
    
    
  }
  getUser() {   
    this.dataService.getUser(this.addLoginForm.value).subscribe(
      data => { 
        this.user = data; 
       
        if (this.user!=null) {
          localStorage.setItem('userid',this.user._id);
          this.router.navigate(['/']);
        }
        else this.toast.setMessage("Username and Password are incorrect", 'warning')
      },
      error => console.log(error),
    );
  }

}
