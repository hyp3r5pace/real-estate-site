var express = require('express');
var router = express.Router();
var dbConnection=require('../database/db');
router.get('/', function(req, res, next) {
    var id=req.session.user;
    dbConnection.query('select * from Agent where A_Id=?',[id],function(err,results,next){
        if(err)
        {
            throw err;
        }
        else 
        {
            res.render('agent_profile',{data:results});
        }
    });
  });

  module.exports = router;