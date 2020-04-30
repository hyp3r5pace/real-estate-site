var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('New_Properties');
  });
router.get('/submit_prop',function(req,res,next){
   res.render('New_Properties');
});
  module.exports = router;