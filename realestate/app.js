var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser =  require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mysql = require('mysql');
var expressValidator = require('express-validator');

var indexRouter = require('./routes/index');
var landingRouter = require('./routes/customer');
var signIn = require('./routes/signIn');
var signUp = require('./routes/signUp');
var search = require('./routes/search');
var forgot = require('./routes/forgotPasswd');
var send   = require('./routes/sendEmail');
var upload = require('./routes/upload');
var sendSMS = require('./routes/sendSMS');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handle File Uploads --- eg: where to upload the images.
//app.set(multer({dest: './uploads'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Handle Express sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

/*
//validatior
app.use(expressValidator({
  errorFormatter: function(param,msg,value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handling Flash messages
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRouter);
app.use('/customer', landingRouter);
app.use('/signIn',signIn);
app.use('/signUp',signUp);
app.use('/forgotPassword',forgot);
app.use('/getpasswd',send);
app.use('/upload',upload);
app.use('/getpasswdBySMS',sendSMS);

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
  if(err.status!==404 && err.status!==500)
  res.render('error');
  
  if(err.status===404)
  {
    res.render('error404');
  }
  

  if(err.status===500) {
    res.render('error500');
  }

});

module.exports = app;
