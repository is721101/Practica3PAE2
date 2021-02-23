const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  id:{
    type:Number
  },
  animalname:{
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
    type:String
  }

})




module.exports = mongoose.model('Animal',AnimalSchema);
