var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');
router.get('/',function(req,res,next){
    var r=req.query['id'];
    var A_id=req.session.user;
    dbConnection.query('Select * from property where PropertyId=? and A_Id=?',[r,A_id],function(error,results,field){
            if(error)
            {
                throw error;
            }
            else
            {
                console.log('successful deal yay!!');
                res.render('successful_deal',{data:results});
            }
    });
});

module.exports=router;