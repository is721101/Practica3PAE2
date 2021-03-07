const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GusersSchema = require('../DB/Guser');

passport.serializeUser(function (user, done) {
    done(null, user);
   });
   passport.deserializeUser(async function(user,done){
    GusersSchema.find({Googleid:user.id}).then( user =>{
      done(null, user)
    })
   
  })

    passport.use(
        new GoogleStrategy(
    {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
        try{
            const newUser = {
                 Googleid: profile.id,
                 name: profile.displayName,
                 email:profile.emails[0].value,
                 image:profile.photos[0].value
               }
             
            const Guser = await GusersSchema.findOne({Googleid:newUser.Googleid});
            if(Guser){
                GusersSchema.actualizarGUser(profile.id,newUser).then(()=>{
                    done(null, profile);
                   })        
            }
            else{
             GusersSchema.create(newUser).then(()=>{
                 done(null, profile);
                })
            }
        }
        catch(err){
         console.log(err);
        }
    }
    )
    );