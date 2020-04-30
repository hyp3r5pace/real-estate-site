var express = require('express');
var router = express.Router();
var multer= require('multer');
var dbConnection=require('../database/db');
var session=require('express-session');
var fs = require('fs');
var upload = multer({dest: 'public/uploads/'});


  router.post('/',upload.single('image_link'),function(req,res,next){
     if((req.file.mimetype !== 'image/jpeg') && (req.file.mimetype !== 'image/jpg') && (req.file.mimetype !== 'image/png')) {
        console.log("Image not uploaded!!");
        return;
     } else {
         if(!req.file) {
            console.log("Image uploading unssuccesful!");
            res.render('New_Properties');
         } else {
            console.log('Image upload successful! yay!');
            console.log(req.file);
            var ext = req.file.mimetype.split('/').pop();

            fs.renameSync('public/uploads/' + req.file.filename,'public/uploads/' + req.file.filename + '.' + ext);

            console.log("Conversion successful!");

            var city=req.body.city;
            var streetName=req.body.streetName;
            var houseName=req.body.houseName;
            var pincode=req.body.Pincode;
            var size=req.body.size;
            var cost=req.body.cost;
            var floor=req.body.floor;
            var no_of_rooms=req.body.no_of_rooms;
            var sell_or_rent=req.body.sell_or_rent;
            var description=req.body.description;
            var date=req.body.ListingDate;
            var MaxPropId;
            var AId=req.session.user;
            console.log(AId);
            var sell;
            var rent;
            var img_link = 'uploads/' + req.file.filename + '.' + ext;
            console.log(req.file);
            if(sell_or_rent == "sell")
            {
               sell="YES";
               rent="NO";
            }
            else if(sell_or_rent =="rent")
            {
               sell="NO";
               rent="YES";
            }
       
            dbConnection.query('select max(PropertyId) as max from Property',function(error,result,fields){
                if(error)
                {
                   throw error;
                }
                else
                {
                   MaxPropId=result[0].max+1;
                   dbConnection.query('INSERT INTO Property (PropertyId ,City ,Street_Name ,House_Name ,Pincode ,size ,floor ,A_Id ,IsRent ,IsSold ,Description ,Listed_Date,cost ,no_of_rooms,image_link) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[MaxPropId,city,streetName,houseName,pincode,size,floor,AId,rent,sell,description,date,cost,no_of_rooms,img_link],function(errors,results,fields){
                      if(errors)
                      {
                         throw errors;
                      }
                      else{
                         console.log("new property inserted in the property table");
                         res.render('ThankYou');
                      }
                   });
                }
            });


         }
   }
  });

  module.exports = router;