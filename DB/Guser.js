const mongoose = require('mongoose');
const {
    mongo
} = require('mongoose');

const GuserSchema = mongoose.Schema({
  Googleid:{
    type:String,
  },
  name:{
    type:String,
  },
  image:{
    type:String,

  },
  email:{
    type:String,
  }
});
GuserSchema.statics.actualizarGUser = async (id, userData) => {
    console.log("datos a guardar", userData)
    let updated ={}
    try {
      updated = await Guser.updateOne(
            {Googleid:id}, 
            {$set: userData}
          );
    } catch (error) {
        console.log(error)
    }
  
  return updated;
};
let Guser= mongoose.model('Gusers',GuserSchema);
module.exports = Guser;