var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login_signup_agent');
  });

  module.exports = router;