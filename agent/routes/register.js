var express = require('express');
var router = express.Router();
var dbConnection = require('../database/db');


/* GET home page. */
router.post('/', function(req, res, next) {
    var name=req.body.dname;
    var useremail = req.body.demail;
    var password = req.body.dpassword;
    var ConfirmPass=req.body.crpassword;
    if(password===ConfirmPass)
    {
	if (useremail && password && name && ConfirmPass) {
        console.log("checked the email and password");
        dbConnection.query('SELECT * FROM Agent WHERE A_Email_Id = ? ', [useremail], function(error, arr, fields) {
            if(error)
            {
                throw error;
            }
            if(arr.length>0)
            {
                res.send('You have already been registered to us');   
            }
            else
            {var id;
                console.log("new user");
                dbConnection.query('SELECT max(A_Id) as max FROM Agent ', function(error, t, fields) {
                    if(error)
                    {
                        throw error;
                    }
                    else{
                        id=t[0].max + 1;
                        dbConnection.query('INSERT INTO agent (`A_Name`,`A_Id`,`A_Email_Id`,`A_Password`) VALUES(?,?,?,?)', [name,id,useremail,password], function(error, results, fields) {
                            if(error)
                            {
                                res.send('You have entered wrong information go back to the samepage');   
                                throw error;
                            }
                            console.log("Successfully Registered");
                             res.render('login_signup_agent');
                        });
                    }
                });    
            }
        });
		
	} else {
		res.send('Please enter Email and Password!');
		res.end();
    }
    }
    else
    {
        res.send('Please enter same Password in Confirm Password!');
    }
    
});


module.exports = router;
