var express = require('express');
var router = express.Router();
var pool = require('./database');

const {check, validationResult} = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signIn-signUp');
});

router.post('/register',[check('Email').isEmail().withMessage('Not a valid Email'),check('Password').isLength({min: 6}).withMessage('Password Must be at least 5 char long'),check("Password2", "invalid password")
.custom((value,{req, loc, path}) => {
    if (value !== req.body.Password) {
        // trow error if passwords do not match
        throw new Error("Passwords don't match");
    } else {
        return value;
    }
})],function(req,res,next){
    var name = req.body.Name;
    var email = req.body.Email;
    var password = req.body.Password;
    var password2 = req.body.Password2;

    check('Password2','password did not match').equals(req.body.Password);

    var errors = validationResult(req);

    console.log("error:",errors);

    if(!errors.isEmpty()) {
        res.render('signIn-signUp',{
            'error1': errors.errors[0].msg + ". Please signUp again!!"
        });
    } else {
        var id = 0;
        pool.query("Select Max(C_Id) as C_Id from customer",function(error,rows){
            if(error) {
                console.log("Database error: ",error);
                res.render('signIn-signUp',{
                    'error1': "database error: " + error + "please sign up again!"
                });
            } else {
                    id = rows[0].C_Id;
                    console.log(id);
                    pool.query("Select C_Email_Id from customer where C_Email_Id ='" + email +"'",function(err,row1){
                        if(err) {
                            console.log("Database error: ",error);
                            res.render('signIn-signUp',{
                                'error1': "Database error: " + error + "Please sign up again!!"
                            });
                        } else {
                            console.log(row1.length);
                            if(row1.length !== 0) {
                                console.log("The user is already registered!!!");
                                res.render('signIn-signUp',{
                                    'error1': "You have already registered!! Please sign in!"
                                });
                            } else {
                                console.log("Reigistering the user");
                                var t = id + 1;
                                pool.query("insert into customer(C_Name,C_Email_Id,C_Password,C_Id) values ('" + name +"','" + email + "','" + password + "','" + t + "')",function(erro,rows){
                                    if(erro) {
                                        console.log("Database error: ",error);
                                        res.render('signIn-signUp',{
                                            'error1': "Database error: " + error + "Please sign up again!!"
                                        });
                                    } else {
                                        console.log("Registration successful!!!");
                                        res.render('signIn-signUp',{
                                            'success1': "Registration successful!! Please Sign In now!"
                                        });
                                    }
                                });
                            }
                        }
                    });
            }
        });
    }


});

module.exports = router;
