import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  stats = [];
  isLoading = true;

  stat = {};
  isEditing = false;

  addStatForm: FormGroup;
  statname = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private router: Router,
              private formBuilder: FormBuilder) { 
                if (localStorage.getItem('userid')==null) this.router.navigate(['/login']);
              }

  ngOnInit() {
    this.getStats();

    this.addStatForm = this.formBuilder.group({
      statname: this.statname,
    });
  }

  getStats() {
    this.dataService.getStats().subscribe(
      data => this.stats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addStat() {
    this.dataService.addStat(this.addStatForm.value).subscribe(
      res => {
        const newStat = res.json();
        this.stats.push(newStat);
        this.addStatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(stat) {
    this.isEditing = true;
    this.stat = stat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.stat = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the stats to reset the editing
    this.getStats();
  }

  editStat(stat) {
    this.dataService.editStat(stat).subscribe(
      res => {
        this.isEditing = false;
        this.stat =stat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteStat(stat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteStat(stat).subscribe(
        res => {
          const pos = this.stats.map(elem => { return elem._id; }).indexOf(stat._id);
          this.stats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }


}
