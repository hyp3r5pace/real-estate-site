var express = require('express');
var router = express.Router();
var session=require('express-session');

router.get('/',function(req,res,next){
    req.session.destroy(function(err) {
        // cannot access session here
        res.render('login_signup_agent');
      });
});

module.exports = router;