var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_signup_agent');
});

router.get('/auth',function(req,res,next){
  res.render('agent_profile');
  console.log(req.session);
});

module.exports = router;