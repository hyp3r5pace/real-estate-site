var express = require('express');
var router = express.Router();
const accountSid = 'AC892db9b13b7c275c43b555594e7359d1';
const authToken = '48b43f1cb1cb731b0c6bbab8c15add4a';
const client = require('twilio')(accountSid, authToken);
var pool = require('../routes/database');
/* GET home page. */
router.post('/', function(req, res, next) {
    var mobileNo = req.body.mobile;
    console.log("mobileNO: ",mobileNo);

    pool.query('Select C_Name,C_Password from customer where C_Mobile_No = ' + mobileNo,function(error,row){
        if(error) {
            console.log("Database error: ",error);

            res.render('SMS',{
                "error": "Database error! Please try again!"
            });
        } else {

            if(row.length === 0) {
                console.log("No such Mobile number is registered!");
                res.render('SMS',{
                    "error": "Mobile Number is not registered!"
                });
            } else {
                console.log("Number exists!");
                var name = row[0].C_Name;
                var password = row[0].C_Password;
                 var message = client.messages.create({
                    body: 'Hello ' + name + ',\n' + 'Your password is ' + password,
                    from: '++13344639649',
                    to: '+' + mobileNo 
                }).then(message => {
                    if(message.error_code == null) {
                        console.log("Message sent successfully!!");
                        res.render('signIn-signUp',{
                            "success": "Please check your SMS for password"
                        });
                    } else {
                        console.log("Message sending unsuccessful!!");
                        res.render('SMS',{
                            "error": "Message sending unsuccesssful! Please try again!"
                        });
                    }
                });

                
            }

            
        }
    });

  
});

module.exports = router;
