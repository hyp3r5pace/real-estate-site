var express = require('express');
var router = express.Router();
var pool = require('./database');

/* GET home page. */
router.post('/search', function(req, res, next) {
  var city = req.body.city;
  var pin = req.body.Pincode;
  var budget = req.body.budget;
  var room = req.body.room;
  var buy = req.body.buy;
  var rent= req.body.rent;
  var property = req.body.property;
  var agent = req.body.Agent;

  console.log(city,pin,budget,room,buy,rent,property,agent);
  res.render('search');

});

module.exports = router;
