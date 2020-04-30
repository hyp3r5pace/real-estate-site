var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');

router.get('/',function(req,res,next){
    var r=req.query['id'];
    console.log("Id: ",r);
    var aid=req.session.user;
    console.log(aid);
    dbConnection.query('select a.A_Id,a.A_MobileNo,a.A_Email_Id,p.image_link,p.Description,p.size,p.PropertyId,p.City,p.Street_Name,p.House_Name,p.Pincode,p.no_of_rooms from Property as p,Agent as a WHERE p.PropertyId=? and a.A_Id=?',[r,aid],function(error,result,field){
        console.log("Reached here!!");
        console.log(error);
        if(error)
        {
            console.log("Error here!!");
            throw error
        }
        else
        {
            console.log("let's render");  
            console.log(result[0]);
            res.render('description_listed',{data:result});
        }
    });
});

module.exports=router;