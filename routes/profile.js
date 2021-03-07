const express=require('express');
const router=express.Router();
const GusersSchema = require('../DB/Guser');
const validarLogin=require('../middlewares/login');

router.get('/',validarLogin,async (req,res)=>{
    const user = await GusersSchema.findOne({Googleid:req.user[0].Googleid});
    console.log(user);
    res.render('profile',{ image:user.image,name:user.name,email:user.email,isLoggedIn:Boolean(req.user)});
})
module.exports=router;