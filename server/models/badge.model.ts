import * as mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  
  badgename: { type: String},
  imgurl: String,
  
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
