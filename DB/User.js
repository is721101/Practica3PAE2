const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id:{
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
UserSchema.statics.buscarID = async (id) => {
    mongoose.set('debug', true);
  let user = await User.findOne({
      id,
  });
  console.log("Usaurio:"+ user);
  return user;
};

module.exports= mongoose.model('User',UserSchema);
