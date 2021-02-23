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
    required:true,
    minimum: 5
  },
  age:{
    type:Number,
    required:true
  }
})

module.exports = mongoose.model('Users',UserSchema);