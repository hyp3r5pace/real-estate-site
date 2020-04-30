var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

var storages = multer.diskStorage({
    destination: './uploads/',
    filename: function(req,file,callback) {
        callback(null,crypto.pseudoRandomBytes(16, function(err,raw){
            if(err) return callback(err);

            callback(null,raw.toString('hex') + path.extname(file.originalname));
        }));
    }
});

module.exports = storages;