const mongoose = require('./mongodb');

const {
    mongo
} = require('mongoose')

const AnimalSchema = mongoose.Schema({
  id:{
    type:Number
  },
  animalname:{
    type:String,

  },
  speciesname:{
    type:String,
  },
  animalage:{
    type:String,
  },
  sexname:{
    type:String,
 
  },
  basecolour:{
    type:String,
  },
  owner:{
    type:String
  }

})




module.exports = mongoose.model('animal',AnimalSchema);
