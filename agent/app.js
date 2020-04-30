var createError = require('http-errors');
var http=require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser=require('cookie-parser');
var dbConnection=require('./database/db');
var multer=require('multer');
var indexRouter = require('./routes/index');
var agent_profile = require('./routes/auth');
var app = express();
var register=require('./routes/register');
var edit_profile=require('./routes/edit_profile');
var new_prop=require('./routes/New_prop');
var express_validator=require('express-validator');
var express_session=require('express-session');
var submit_prop=require('./routes/submit_prop');
var update_profile=require('./routes/updated_profile');
var Sign_Out=require('./routes/Sign_Out');
var listed_prop=require('./routes/listed_prop_list');
var desc =require('./routes/desc');
var sold_prop=require('./routes/sold_prop_list');
var back_home=require('./routes/back_home');
var desc_sold=require('./routes/desc_sold');
var upload_photo=require('./routes/upload_photo');
var deal_done=require('./routes/deal_done');
var deal_completed=require('./routes/deal_completed');
var home_page=require('./routes/home_page');
var Delete_prop=require('./routes/Delete_Property');
var delete_confirm=require('./routes/delete_confirm');
dbConnection.connect(function(err) {
  if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
  }
  console.log('Connected to the MySQL server.');
});
//////////--------------CONNECTION TO MYSQL DONE-----------------------//////



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express_session({
  saveUninitialized:true,
  resave:true,
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 60 * 60 * 1000,
  activeDuration: 10 * 60 * 1000,}));

app.use('/', indexRouter);
app.use('/auth',agent_profile);
app.use('/register',register);
app.use('/edit_profile',edit_profile);
app.use('/New_prop',new_prop);
app.use('/updated_profile',update_profile);
app.use('/submit_prop',submit_prop);
app.use('/Sign_Out',Sign_Out);
app.use('/listed_prop_list',listed_prop);
app.use('/desc',desc);
app.use('/sold_prop_list',sold_prop);
app.use('/back_home',back_home);
app.use('/desc_sold',desc_sold);
app.use('/upload_photo',upload_photo);
app.use('/deal_done',deal_done);
app.use('/deal_completed',deal_completed);
app.use('/home_page',home_page);
app.use('/Delete_Property',Delete_prop);
app.use('/delete_confirm',delete_confirm);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 res.render('e_400');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('e_500');
});

module.exports = app;
