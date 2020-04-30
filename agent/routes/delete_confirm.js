var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');

router.get('/',function(req,res,next){
    var pid=req.query['id'];
    dbConnection.query('DELETE FROM Property where PropertyId=?',[pid],function(error,results,field){
        if(error)
        {
            throw error;
        }
        else{
            console.log('the property has been successfully deleted');
            res.send('the property is successfully deleted');
        }
    });
});
module.exports=router;