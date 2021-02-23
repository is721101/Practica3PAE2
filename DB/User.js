

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id:{
    type:Number
  },
  name:{
    type:String,
  },
  age:{
    type:Number,
  }
})

module.exports = mongoose.model('User',UserSchema);