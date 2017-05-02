import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCats(): Observable<any> {
    return this.http.get('/api/players').map(res => res.json());
  }
  getStats(): Observable<any> {
    return this.http.get('/api/stats').map(res => res.json());
  }
  getBadges(): Observable<any> {
    return this.http.get('/api/badges').map(res => res.json());
  }
  getNotes(): Observable<any> {
    return this.http.get('/api/notes').map(res => res.json());
  }
  getUsers(): Observable<any> {
    return this.http.get('/api/users').map(res => res.json());
  }
  countCats(): Observable<any> {
    return this.http.get('/api/players/count').map(res => res.json());
  }
  countUsers(): Observable<any> {
    return this.http.get('/api/users/count').map(res => res.json());
  }
  countStats(): Observable<any> {
    return this.http.get('/api/stats/count').map(res => res.json());
  }
  countBadges(): Observable<any> {
    return this.http.get('/api/badges/count').map(res => res.json());
  }
  countNotes(): Observable<any> {
    return this.http.get('/api/notes/count').map(res => res.json());
  }
  addCat(cat): Observable<any> {
    return this.http.post('/api/player', JSON.stringify(cat), this.options);
  }
  addUser(user): Observable<any> {
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }
  addStat(stat): Observable<any> {
    return this.http.post('/api/stat', JSON.stringify(stat), this.options);
  }
  addBadge(badge): Observable<any> {
    return this.http.post('/api/badge', JSON.stringify(badge), this.options);
  }
  addNote(note): Observable<any> {
    return this.http.post('/api/note', JSON.stringify(note), this.options);
  }
  getCat(cat): Observable<any> {
    return this.http.get(`/api/player/${cat.playerid}`).map(res => res.json());
  }
  getUser(user): Observable<any> {
    return this.http.get(`/api/user/${user.username}/${user.password}`).map(res => res.json());
  }
  getStat(stat): Observable<any> {
    return this.http.get(`/api/stat/${stat._id}`).map(res => res.json());
  }
  getBadge(badge): Observable<any> {
    return this.http.get(`/api/badge/${badge._id}`).map(res => res.json());
  }
  getNote(note): Observable<any> {
    return this.http.get(`/api/note/${note._id}`).map(res => res.json());
  }
  editCat(cat): Observable<any> {
    return this.http.put(`/api/player/${cat._id}`, JSON.stringify(cat), this.options);
  }
  editStat(stat): Observable<any> {
    return this.http.put(`/api/stat/${stat._id}`, JSON.stringify(stat), this.options);
  }
  editBadge(badge): Observable<any> {
    return this.http.put(`/api/badge/${badge._id}`, JSON.stringify(badge), this.options);
  }
  editNote(note): Observable<any> {
    return this.http.put(`/api/note/${note._id}`, JSON.stringify(note), this.options);
  }
  editUser(user): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, JSON.stringify(user), this.options);
  }
  deleteCat(cat): Observable<any> {
    return this.http.delete(`/api/player/${cat._id}`, this.options);
  }
  deleteStat(stat): Observable<any> {
    return this.http.delete(`/api/stat/${stat._id}`, this.options);
  }
  deleteBadge(badge): Observable<any> {
    return this.http.delete(`/api/badge/${badge._id}`, this.options);
  }
  deleteNote(note): Observable<any> {
    return this.http.delete(`/api/note/${note._id}`, this.options);
  }
  deleteUser(user): Observable<any> {
    return this.http.delete(`/api/user/${user._id}`, this.options);
  }
}
