const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  id:{
    type:Number
  },
  animalsname:{
    type:String,

  },
  breedname:{
    type:String,
  },
  speciesname:{
    type:String,
  },
  animalsage:{
    type:String,
 
  },
  basecolour:{
    type:String,
  },
  owner:{
    type:Number
  }

})

module.exports = mongoose.model('Animal',AnimalSchema);