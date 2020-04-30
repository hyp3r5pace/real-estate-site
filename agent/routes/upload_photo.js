var express=require('express');
var routes=express.Router();
var dbConnection=require('../database/db');
var multer=require('multer');
var fs=require('fs');
var upload=multer({dest: 'public/profile_photo/'});
console.log('upload_photo');
routes.post('/',upload.single('Image_upload'),function(req,res,next){
        if((req.file.mimetype !=='image/jpeg') && (req.file.mimetype !=='image/jpg')&&(req.file.mimetype !=='image/png')){
            console.log("Image not uploaded!!");
            return;
        }
        else{
            if(!req.file){
                console.log("Image uploading unsuccessfully!!");
                res.render('edit_profile');
            }
            else
            {
                console.log('Image uploaded sucessfully!!!');
                console.log(req.file);
                var ext=req.file.mimetype.split('/').pop();

                fs.renameSync('public/profile_photo/' + req.file.filename,'public/profile_photo/' +req.file.filename +'.' +ext);
                console.log("Conversion successful");
                var img_link='profile_photo/' + req.file.filename + '.' + ext;
                var Aid=req.session.user;
                dbConnection.query('update agent set profile_photo=? where A_Id=?',[img_link,Aid],function(error,result,fields){
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                       console.log("sql command for updating profile photo...")
                        res.send("your profile photo uploaded successfully")
                    }
                });
            }
        }
});

module.exports=routes;