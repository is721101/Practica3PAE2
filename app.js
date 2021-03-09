
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/passport');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const adoptionRouter = require('./routes/adoption');
const usersRouter = require('./routes/users');
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['clave'] 
 }))
 
app.use(passport.initialize());
app.use(passport.session());
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/animals',indexRouter);
app.use('/users',usersRouter);
app.use('/adoption',adoptionRouter);
app.use('/auth',authRouter);
app.use('/profile',profileRouter);
app.get("/",(req,res)=>{
  res.render('home',{isLoggedIn:Boolean(req.user)});
})
app.use(function(req, res, next) {
  next(createError(404));
}); 

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error');
 });

app.listen(3000, () => console.log('Listening on port 3000'));
module.exports = app;
