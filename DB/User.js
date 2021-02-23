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
UserSchema.statics.actualizarUser = async (_id, userData) => {
    console.log("datos a guardar", userData)
    let updated ={}
    try {
      updated = await user.updateOne(
            {_id:_id}, 
            {$set: userData}
          );
    } catch (error) {
        console.log(error)
    }
  
  console.log("actualizado", updated);
  return updated;
};
let user= mongoose.model('Users',UserSchema);
module.exports = user;