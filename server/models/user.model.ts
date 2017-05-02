import * as mongoose from 'mongoose';
let beautifyUnique = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  
  firstname: String,
  lastname: String,
  username: { type: String, index:{unique:true}},
  email: String,
  password: String,
});
userSchema.plugin(beautifyUnique);
const User = mongoose.model('User', userSchema);

export default User;
