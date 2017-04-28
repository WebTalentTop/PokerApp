import * as mongoose from 'mongoose';
let beautifyUnique = require('mongoose-unique-validator');
const statSchema = new mongoose.Schema({
  statname: {type:String, index:{unique:true}}
});
statSchema.plugin(beautifyUnique);
const Stat = mongoose.model('Stat', statSchema);
var threebet = new Stat({statname: "threebet"});
var cbet = new Stat({statname: "cbet"});
var raiseflop = new Stat({statname: "raiseflop"});
var reverallin = new Stat({statname: "riverallin"});
Stat.count({},function(err,count){
  if (count==0){
    threebet.save();
    cbet.save();
    raiseflop.save();
    reverallin.save();
  }
});

export default Stat;
