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
UserSchema.statics.showUser= async (id) => {
    let resp = await user.find();
    console.log(resp);
    return resp;
};
UserSchema.statics.buscarID = async (id) => {
    mongoose.set('debug', true);
  let user = await User.findOne({
      id,
  });
  console.log("Usaurio:"+ user);
  return user;
};


let User= mongoose.model('User',UserSchema);
module.exports=User;