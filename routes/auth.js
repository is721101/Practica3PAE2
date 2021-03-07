let express = require('express');
const passport=require('passport');
let router = express.Router();


router.get('/login',(req, res)=>{
    res.render('login');
})
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/logout',(req, res)=> {
    req.logout();
    req.session=null;
    res.redirect('/auth/login');
});
 
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    }
   );

module.exports = router;