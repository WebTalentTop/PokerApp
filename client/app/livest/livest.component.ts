import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-livest',
  templateUrl: './livest.component.html',
  styleUrls: ['./livest.component.scss']
})
export class LivestComponent implements OnInit {

 
  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private router: Router,
              private formBuilder: FormBuilder) { 
                if (localStorage.getItem('userid')==null) this.router.navigate(['/login']);
              }

  ngOnInit() {
  
  }

 

}
