var express=require('express');
var router=express.Router();
var dbConnection=require('../database/db');
var session=require('express-session');
console.log('success!');
 router.post('/',function(req,res,next){
     console.log('entered');
        var pid=req.query['id'];
        var cemail=req.body.Email_id;
        var cid;
        var aid=req.session.user;
        var cname=req.body.cname;
        var sold_date=req.body.sold_date;
        var correct;
        dbConnection.query('select * from customer where C_Email_Id=?',[cemail],function(error,results,field){
            if(error)
            {
                throw error;
            }
            else
            {
                console.log('customer information');
                console.log(results[0]);
                if(results.length>0)
                { 
                    cid=results[0].C_Id;
                    if(cname === results[0].C_Name)
                    {                        
                        dbConnection.query('select * from property where PropertyId=?',[pid],function(errorrs,resu,field)
                        {
                            if(errorrs)
                            {
                                throw errorrs;
                            }
                            else
                            {
                                console.log(resu[0].A_id);
                                dbConnection.query('insert into Sold_Property (City,Street_Name,House_Name,Pincode,size,floor,A_id,C_id,image_link,Cost,no_of_rooms,Listed_Date,Sold_Date) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[resu[0].City,resu[0].Street_Name,resu[0].House_Name,resu[0].Pincode,resu[0].size,resu[0].floor,resu[0].A_id,cid,resu[0].image_link,resu[0].Cost,resu[0].no_of_rooms,resu[0].Listed_Date,sold_date],function(errors,re,field){
                                    if(errors)
                                    {
                                        throw errors;
                                    }
                                    else
                                    {

                                        console.log("successfully entered the value in the sold_property");
                                        dbConnection.query('delete from property where PropertyId=?',[pid],function(erroro,resul,field){
                                            if(erroro)
                                            {
                                                throw erroro;
                                            }
                                            else
                                            {
                                                console.log("successfully deleted from the property");
                                                dbConnection.query('update agent set Total_Sales = Total_Sales + ? where A_Id = ?',[resu[0].Cost,aid],function(eroo,reso,next){
                                                    if(eroo)
                                                    {
                                                        throw eroo;
                                                    }
                                                    else
                                                    {
                                                        res.render('Thank_You_deal');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        res.send("you have entered wrong name of the customer!!!");
                    }
                }
            }
        });
 });

 module.exports=router;