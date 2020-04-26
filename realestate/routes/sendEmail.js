var express = require('express');
var router = express.Router();
var pool = require('./database');
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  var name = req.body.Name;
  var email = req.body.Email;

  console.log(name,email);

  pool.query("select C_Name,C_Email_Id,C_Password from customer where C_Name='" + name + "' and C_Email_Id='" + email + "'",function(error,row){
      if(error) {
          console.log("Database error: ",error);
          res.render('forgotPassword',{
              "error": "Database error!! Please try again!!"
          });
      } else {
          if(row[0] === undefined) {
              console.log("Wrong Name or Email ID");
              res.render('forgotPassword',{
                  "error": "Either Password or Email is wrong!!"
              });
          } else {
              var passwd = row[0].C_Password;
              var transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                      user: 'debsoumyajit100@gmail.com',
                      pass: 'i_love_hacking'
                  }
              });

              var mailOptions = {
                  from: 'debsoumyajit100@gmail.com',
                  to: email,
                  subject: 'Your Password',
                  text: 'Hello ' + name + ', Your password is "' + passwd +'"'
              };

              transporter.sendMail(mailOptions, function(error,info){
                  if(error){
                        console.log("error in sending mail: ",error);
                        res.render('forgotPassword');
                  } else {
                        console.log("Success in sending password!");
                        res.render('signIn-signUp',{
                            "success": "Please check your Email for password!"
                        });
                  }
              });
          }
      }
  });

});

module.exports = router;
