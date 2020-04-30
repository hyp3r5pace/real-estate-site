var express = require('express');
var router = express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');

router.post('/', function(req, res, next) {
     var username = req.body.name;
     var password = req.body.password;
     var useremail= req.body.Email_Id;
     var Mobile   = req.body.MobileNum;
	
        console.log("checked the email and password");
        var id= req.session.user;
        
        dbConnection.query('Select * from agent where A_ID = ?',[id],function(errors,result,fields){
            if(errors)
            {
                throw errors;
            }
            var user;
            var pass;
            var email;
            var mobil;
            if( username === undefined)
            {
                user=result[0].A_Name;
            }
            else
            {
                user=username;
            }
            if(password === undefined)
            {
                pass=result[0].Password;
            }
            else
            {
                pass=password
            }
            if( Mobile === undefined)
            {
                mobile=result[0].A_MobileNo; 
            }
            else
            {
                mobile=Mobile;
            }
            if( useremail === undefined)
            {
                email=result[0].A_Email_Id;
            }
            else
            {
                email=useremail;
            }
            console.log('reached');
            dbConnection.query('UPDATE Agent SET A_Name = ?,A_Password=?,A_MobileNo=?,A_Email_Id=?  WHERE A_Id =?',[user,pass,mobile,email,id],function(error, results, fields) {
                if(error)
                {
                    throw error;
                }
                console.log('executed database updated successfully');
    
                    console.log("successfully updated user profile");
                    res.send('your profile has been successfully updated!');	  
            });
        });
	
});



module.exports = router;