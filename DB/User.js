const mongoose = require('mongoose');
const {
    mongo
} = require('mongoose');

const UserSchema = mongoose.Schema({
  ownerid:{
    type:Number
  },
  name:{
    type:String,
  },
  age:{
    type:Number,

  }
})

module.exports = mongoose.model('Users',UserSchema);