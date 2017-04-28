import * as mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  
  notename: { type: String},
  imgurl: String,
  
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
