console.log("Entered for uploading");

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var parser = require('body-parser');
var multer = require('multer');
var path = require('path');
var replace = require('replace-ext');
var fs = require('fs');
//var storages = require('../upload-config');

/*var storages = multer.diskStorage({
    destination: './uploads/',
    filename: function(req,file,callback) {
        callback(null,crypto.pseudoRandomBytes(16, function(err,raw){
            if(err) return callback(err);

            callback(null,raw.toString('hex') + path.extname(file.originalname));
        }));
    }
});
*/


var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/image', upload.single('pic'),function(req,res,next){
    console.log(req.file);
    if((req.file.mimetype !== 'image/jpeg') && (req.file.mimetype != 'image/jpg') && (req.file.mimetype) != 'image/png') {
        console.log("Image not uploaded!!");
        res.render('upload',{
            "error": "It is not a image!! Please upload a image!"
        });
        return;
    }
    if(!req.file) {
        console.log("No file recieved");
        res.render('upload',{
            "error": "No file uploaded! Please Upload a file"
        });
    } else {
        console.log('File Recieved!');
        console.log(req.file.filename);
        /*
        var ext = req.file.path;
        console.log(req.file.mimetype);
        console.log(ext);
        //var dir = path.resolve('../uploads/'+ req.file.filename);
        var changepath = './uploads/' + req.file.filename;
        var newpath = replace(changepath,'.jpeg');
        console.log(newpath);
        */
        res.render('upload',{
            "success": "File uploaded successfully"
        });
        var mime = req.file.mimetype;
        var ext = mime.split("/").pop();
        console.log("extension: ",ext);
        fs.renameSync('uploads/' + req.file.filename,'uploads/' + req.file.filename + '.' + ext);
    }
});

module.exports = router;
