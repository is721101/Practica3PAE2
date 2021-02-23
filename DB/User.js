const mongoose = require('./mongodb');
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

UserSchema.statics.showUser= async (id) => {
    let resp = await User.find();
    let arr=[];
    for(u in resp){
      arr.push(u);
    }
    console.log(arr);
    return arr;
};
UserSchema.statics.buscarID = async (ownerid) => {
  /*let resp;
  await User.findOne(
    {
      "name":"Iván"
    }
  ).then(v=>{
    console.log(v);
    resp=v;
  }
  )
  console.log(resp); 
  return resp;*/
  User.findOne(
    {
      "name":"Iván"
    }
  ).then(v=>{
    console.log(v);
  })
};


let User= mongoose.model('User', UserSchema);
module.exports=User;