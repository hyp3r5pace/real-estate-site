var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Request for sending password by Email');
  res.render('forgotPassword');
});

router.get('/SMS',function(req,res,next){
    console.log("request for sending password by SMS");
    res.render('SMS');
});

module.exports = router;
