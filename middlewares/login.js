

function validarLogin(req,res,next){
    let user = req.user;
    console.log(user);
    if(user){
        next();
    }
    else{
        res.redirect('/auth/login');
    }

}

module.exports=validarLogin;