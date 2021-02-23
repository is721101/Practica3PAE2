const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
//require('dotenv/config');



/* Database connection
const mongoose = require('mongoose');
 
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},() =>
  console.log('Conectado a la base de datos')
);*/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());



app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/users', usersRouter);

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