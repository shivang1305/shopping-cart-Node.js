var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var exphbs = require('express-handlebars');
var bodyparser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// var hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Passport config
require('./models/passport')(passport);

//Database Connection
mongoose.connect('mongodb://localhost:27017/Shopping_cart_proj', {useNewUrlParser: true, useUnifiedTopology:true}, (err) => {
  if(err) throw err;
  console.log("Connection Setup successfully");
});

// view engine setup
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + "/views/partials");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyparser.urlencoded({extended: true}));

//Express Session
app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: true
}));

//Connect flash
app.use(flash());

//Passport Middleware
app.use(passport.initialize()) //invoke serializer method
app.use(passport.session());  //invoke deserializer method

//Global Vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
