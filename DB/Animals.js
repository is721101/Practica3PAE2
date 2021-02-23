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

AnimalSchema.statics.actualizarAnimal = async (_id, animalData) => {
    console.log("datos a guardar", animalData)
    let updated ={}
    try {
      updated = await animal.updateOne(
            {_id:_id}, 
            {$set: animalData}
          );
    } catch (error) {
        console.log(error)
    }
  
  console.log("actualizado", updated);
  return updated;
};

let animal= mongoose.model('Animal',AnimalSchema);
module.exports = animal;
