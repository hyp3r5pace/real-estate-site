var express = require('express');
var router = express.Router();
var multer= require('multer');
var dbConnection=require('../database/db');
var session=require('express-session');

router.get('/', function(req, res, next) {
    var id=req.session.user;
    dbConnection.query('Select * from Agent where A_Id=?',[id],function(err,result,next)
    {console.log(result[0]);
        if(err)
        {
            throw err;
        }
        else
        {
            console.log('while rendering');
            res.render('edit_profile',{data:result});
        }
    });
  });

router.get('/updated_pofile',function(req,res,next){
     res.render('edit_profile');
}); 

  module.exports = router;