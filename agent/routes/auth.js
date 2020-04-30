var express = require('express');
var router = express.Router();
var dbConnection = require('../database/db');
var session=require('express-session');

/* GET home page. */
router.post('/', function(req, res, next) {
    var useremail = req.body.useremail;
	var password = req.body.password;
	if (useremail && password) {
        console.log("checked the email and password");
		dbConnection.query('SELECT * FROM Agent WHERE A_Email_Id = ? AND A_password = ?', [useremail, password], function(error, results, fields) {
            if(error)
            {
                throw error;
            }
            if (results.length > 0) {
                req.session.user=results[0].A_Id;
                /*req.session.userName=results[0].A_Name;
                req.session.useremail=results[0].A_Email_Id;
                req.session.usermobile=results[0].A_MobileNo;
                req.session.password=res*/
                console.log("successfully searched the user");
                   res.render('agent_profile',{data :results});
                   console.log(req.session);
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
});

  

module.exports = router;