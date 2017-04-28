import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  badges = [];
  isLoading = true;

  badge = {};
  isEditing = false;

  addBadgeForm: FormGroup;
  badgename = new FormControl('', Validators.required);
  imgurl = new FormControl('', Validators.required);
  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBadges();

    this.addBadgeForm = this.formBuilder.group({
      badgename: this.badgename,
      imgurl: this.imgurl,
    });
  }

  getBadges() {
    this.dataService.getBadges().subscribe(
      data => this.badges = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBadge() {
    this.dataService.addBadge(this.addBadgeForm.value).subscribe(
      res => {
        const newBadge = res.json();
        this.badges.push(newBadge);
        this.addBadgeForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(badge) {
    this.isEditing = true;
    this.badge = badge;
  }

  cancelEditing() {
    this.isEditing = false;
    this.badge = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the badges to reset the editing
    this.getBadges();
  }

  editBadge(badge) {
    this.dataService.editBadge(badge).subscribe(
      res => {
        this.isEditing = false;
        this.badge =badge;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteBadge(badge) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteBadge(badge).subscribe(
        res => {
          const pos = this.badges.map(elem => { return elem._id; }).indexOf(badge._id);
          this.badges.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }


}
