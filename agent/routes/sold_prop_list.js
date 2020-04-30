var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');

 router.get('/',function(req,res,next){
    var id=req.session.user;
    dbConnection.query('SELECT * FROM Sold_Property WHERE A_Id=?',[id],function(errors,results,field){
        if(errors)
        {
            throw errors;
        }
        else
        {
            console.log(results[0]);
            res.render('sold-prop',{ data:results });
        }
    });
 });


 module.exports=router;