import Note from '../models/note.model';
import BaseCtrl from './base';

export default class NotesCtrl extends BaseCtrl {
  model = Note;
}