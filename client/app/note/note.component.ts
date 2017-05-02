import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  notes = [];
  isLoading = true;

  note = {};
  isEditing = false;

  addNoteForm: FormGroup;
  notename = new FormControl('', Validators.required);
  imgurl = new FormControl();
  constructor(private http: Http,
              private dataService: DataService,
              private router: Router,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
                if (localStorage.getItem('userid')==null) this.router.navigate(['/login']);
               }

  ngOnInit() {
    this.getNotes();

    this.addNoteForm = this.formBuilder.group({
      notename: this.notename,
      imgurl: this.imgurl,
    });
  }

  getNotes() {
    this.dataService.getNotes().subscribe(
      data => this.notes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addNote() {
    this.dataService.addNote(this.addNoteForm.value).subscribe(
      res => {
        const newNote = res.json();
        this.notes.push(newNote);
        this.addNoteForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(note) {
    this.isEditing = true;
    this.note = note;
  }

  cancelEditing() {
    this.isEditing = false;
    this.note = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the notes to reset the editing
    this.getNotes();
  }

  editNote(note) {
    this.dataService.editNote(note).subscribe(
      res => {
        this.isEditing = false;
        this.note =note;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteNote(note) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteNote(note).subscribe(
        res => {
          const pos = this.notes.map(elem => { return elem._id; }).indexOf(note._id);
          this.notes.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }


}
