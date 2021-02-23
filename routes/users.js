let express = require('express');
let router = express.Router();
const animalSchema = require('../DB/animals');
const UserSchema = require('../DB/User');
const Joi=require('joi');

const schema = Joi.object({
  ownerid:Joi.number().required(),
  name:Joi.string().min(5).required(),
  age: Joi.number().min(5).required(),
});


router.get('/', async (req, res) => {
  try{
    const Users = await UserSchema.find();
    console.log(Users)
    res.json(Users);
  }catch(err){
    res.status(200).json({message:err});
  }

});
router.post('/',async (req,res)=>{
  const user = new UserSchema({
      ownerid:req.body.ownerid,
      name:req.body.name,
      age:req.body.age
  });
  const r=schema.validate(user)
  if (r.error) return res.status(400).send("Usuario invalido");
  try{
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  }catch(err){
    res.status(400).json({message:err});
  }
 
});


router.put('/:id',async (req, res) => {
  const {id} = req.params;
  const user = new UserSchema({
    name:req.body.name,
    age:req.body.age
});
const r=schema.validate(user)
if (r.error) return res.status(400).send("Usuario invalido");
  try{
    const updatedUser = await UserSchema.updateOne({id:id});
    res.json(updatedUser);
  }catch(err){
    res.json({message:err});
  }
});

router.get('/:id',(req, res) => {
  const {id} = req.params;
  
  UserSchema.find({id:id}).then(user =>{
    const properties = Object.keys(user).map(property => user[property])
    res.json(properties);
  }).catch(function(error) {
    res.send(error);
  });

});
router.get('/adopt/:id',(req, res) => {
  const id=req.query.userid
    const {idAnimal} = req.params;
    UserSchema.showuser(id);
    res.redirect("/animals")
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedUser = await UserSchema.remove({id:id});
    res.json(removedUser);
  }catch(err){
    res.json({message:err});
  }

});




module.exports = router;