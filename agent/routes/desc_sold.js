var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');

router.get('/',function(req,res,next){
    var r=req.query['id'];
    console.log("Id: ",r);
    var aid=req.session.user;
    var cid;
    dbConnection.query('select C_Id from Sold_Property where PropertyId=?',[r],function(err,results,next){
      if(err)
      {
          throw err;
      }  
    else
    {  
    
    cid=results[0].C_Id;   
    console.log(aid);
    dbConnection.query('select c.C_Id,c.C_Mobile_No,c.C_Name,p.IsSold,p.image_link,p.IsRent,p.size,p.PropertyId,p.City,p.Street_Name,p.House_Name,p.Pincode,p.Cost,p.no_of_rooms from Sold_Property as p,Customer as c WHERE p.PropertyId=? and c.C_Id=?',[r,cid],function(error,result,field){
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
            res.render('description_sold',{data:result});
        }
    });
}
});
});

module.exports=router;