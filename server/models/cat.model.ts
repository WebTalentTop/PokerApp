import * as mongoose from 'mongoose';
let beautifyUnique = require('mongoose-unique-validator');
const catSchema = new mongoose.Schema({
  playerid: { type: String, index:{unique:true}},
  playername: String,
  platform: String,
  club: String,
  clubid: String,
  limit: String,
  aggresion: Number,
  fundamental: Number,
  mindset: Number,
  call: Number,
  bluff: Number,
  rangestat: { type: JSON, default: { "threebet": 0, "cbet": 0, "raiseflop": 0, "riverallin": 0 } },
  badgestat: Array,
  notestat: Array
});
catSchema.plugin(beautifyUnique);
const Cat = mongoose.model('Cat', catSchema);

export default Cat;
