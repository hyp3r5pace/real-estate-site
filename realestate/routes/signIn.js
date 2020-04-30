var express = require('express');
var router = express.Router();
var pool = require('./database');
const {check, validationResult} = require('express-validator');
var name;
var Customerid;
//var data;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signIn-signUp');
});

router.post('/login',[check('Email').isEmail().withMessage('Email not valid!!')],function(req,res,next) {
        //Get form values
        var email = req.body.Email;
        var  password = req.body.Password;

        //check for errors
        var errors = validationResult(req);

        console.log(errors);

        if(!errors.isEmpty()) {
            res.render('signIn-signUp',{
                "error":"Login unsuccessful!! Please try again!"
            });
        } else {
                    console.log('sending query');
                    pool.query("Select C_Email_Id,C_Password,C_Id from customer where C_Email_Id= '" + email + "' and C_Password = '" + password +"'",function(error,rows) {
                        if(error) {
                            console.log("Error:",error);
                            res.render('signIn-signUp',{
                                "error": "Database error: Login Unsuccessful!! Please try again!!"
                            });
                        } else {
                            console.log("rows: ",rows);
                            if(rows.length === 0)  {
                                console.log('User not registered or login info is wrong!!');
                                pool.query("select C_Email_Id from customer where C_Email_Id='" + email + "'",function(erri,ro){
                                    if(erri) {
                                        console.log("Database error: ",error);
                                        res.render('signIn-signUp',{
                                            "error": "Database error: Login Unsuccessful!! Please try again!!"
                                        });
                                    } else {
                                        if(ro.length===0) {
                                            console.log("User not registered yet!!");
                                            res.render('signIn-signUp',{
                                                "error": "Wrong Email Id or you haven't registered yet. Please sign up first!"
                                            });
                                        } else {
                                                console.log("Wrong password!!");
                                                res.render('signIn-signUp',{
                                                    "error": "Wrong Password!! Please check your password!"
                                                });
                                        }
                                    }
                                });
                            } else {
                                pool.query("select C_Name from customer where C_Email_Id = '" + email +"'",function(errono,roow){
                                    if(errono) {
                                        console.log("Database error:",errono);
                                        res.render('signIn-signUp',{
                                            "error": "Database error: Login Unsuccessful!! Please try again!!"
                                        });
                                    } else {
                                        console.log("login Successful!!");
                                        name = roow[0].C_Name;
                                        console.log(rows[0].C_Id);
                                        Customerid = rows[0].C_Id;
                                        res.render('search',{
                                            "name": name,
                                            "id": Customerid
                                        });
                                    }
                                });
                                
                            }

                        }
                    });        
        }

        


});

router.post('/search', function(req, res, next) {
    var city = req.body.city;
    var pin = req.body.Pincode;
    var budget = req.body.budget;
    var room = req.body.room;
    var status= req.body.status;
    var property = req.body.property;
    var agent = req.body.Agent;
    var cid = req.query.cid;
    console.log("cid: ",cid);
    console.log(budget);
  
    console.log(city,pin,budget,room,status,property,agent);
    console.log(typeof room);

    var query1 = "Select House_Name,no_of_rooms,Cost,PropertyId,interest_count from property where City= '" + city + "' and Pincode = '" + pin + "'" +
    "and IsSold = '" + status + "' and Cost <= " + budget;  //Added interest_count for displaying properties with higher number of likes first
    if(room <= 3) {
        query1 = query1 + " and no_of_rooms = " + room;
    } else {
        if(room === 4) {
            query1 = query1 + " and no_of_rooms >=" + 3;
        }
    }

    if(property !== '') {
        query1 = query1 + " and House_Name = '" + property + "'";
    }

    console.log("Starting the queries...");
    console.log(query1);

    pool.query("select * from (select count(g.propertyId) as indicator,m.propertyId as propertyId from (select propertyId from (" + query1 + ") as l) as m left join (select propertyId,C_Id from interested where propertyId in (select propertyId from (" + query1 + ") as l) and C_Id = 111) as g on m.propertyId = g.propertyId group by m.propertyId) as k natural join (" + query1 + ") as r order by interest_count desc",function(errio,rowi){
        if(errio) {
            console.log("Database error:",errio);
            res.render('search',{
                'name': name
            });
        } else {
            if(rowi.length === 0){
                console.log("Property not found!!");
                console.log("First pass!!");
                res.render('search',{
                    "error": "No such home found!!"
                });
            } else {
                console.log("Property found!!");
                if(agent === '') {
                    
                    //console.log(rowi);
                    console.log(rowi);
                    var data = rowi;
                    //Render the list on next page
                    // rowi is the array of object containing the result of a query.
                    JSON.stringify(data);

                    console.log("data: ",data);

                    res.render('propList',{"props": rowi,"customerid": cid});
                } else {
                    pool.query("Select A_Id from agent where A_Name ='" + agent +"'",function(err1,rw1){
                        if(err1) {
                            console.log("Database error: ",err1);
                            res.render('search',{
                                "error": "Database error!! Please try again!"
                            });
                        } else {
                            var id = rw1[0].A_Id;
                            query1 = query1 + " and A_Id =" + id;
                            pool.query(query1,function(errn,rowo){
                                if(errn) {
                                    console.log("Database error: ",errn);
                                    res.render('search',{
                                        "error": "Database error!! Please try again!"
                                    });
                                } else {
                                    if(rowo.length===0) {
                                        console.log("No such Home found!");
                                        console.log("Second pass!!");
                                        res.render('search',{
                                            "error": "No such Home found!!"
                                        });
                                    } else {
                                        console.log("Finally found the result!");
                                        console.log(rowo[0]);
                                        //Render the result in next page
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    });
  
  
  });


  router.get('/readMore',function(req,res,next){
      console.log('lol');
      var id = req.query['id'];
      var description;
      var cost;
      var house;
      var street;
      var city;
      var aid;
      var name;
      var phone;
      var email;
      pool.query("select Description,Cost,House_Name,Street_Name,City,A_Id from property where PropertyId="+id,function(error,row){
          if(error) {
              console.log("Database error: ",error);
              //Add a error page
          } else {
              description = row[0].Description;
              cost = row[0].Cost;
              house = row[0].House_Name;
              street = row[0].Street_Name;
              city = row[0].City;
              aid=row[0].A_Id;
              console.log("Going to find the agent!!");
              pool.query("select A_Name,A_Email_Id,A_MobileNo from agent where A_Id=" + aid,function(err,row1){
                  if(err) {
                      console.log("Database error:",err);
                      //Add a error page
                  } else {
                      name = row1[0].A_Name;
                      email = row1[0].A_Email_Id;
                      phone = row1[0].A_MobileNo

                      console.log("Rendering the description");
                      console.log(email);
                      res.render('description',{
                          "house": house,
                          "description": description,
                          "cost": cost,
                          "street": street,
                          "city": city,
                          "name": name,
                          "phone": phone,
                          "email": email

                      });
                  }
              });
          }
      });
  });

  router.get('/interested',function(req,res,next){
      var propid = req.query.id;
      var cusid = req.query.cid;
      console.log(cusid);
     // var dat = req.query.cardData;
      //JSON.parse(JSON.stringify(dat));   
     // var objectvalues = JSON.parse(data);

      pool.query("select C_Id,propertyId from interested where C_Id=" + cusid + " and propertyId=" + propid,function(errno,rowp){
          if(errno) {
              console.log("Database error: ",errno);
              return;  //Have to think about rendering something here
          } else {
              console.log("Query successful!!");
              if(rowp.length === 0) {

                    pool.query("insert into interested values (" + cusid + "," + propid + ")",function(errt,rt){
                        if(errt) {
                            console.log("Database error: ",errt);
                            return; //Think of something to render when database query fails
                        } else {
                            console.log("User liked the property!!");
                            //console.log(dat);
                            console.log(cusid);
                            
                            res.status(204).send();
                            
                            /*
                            res.render('propList',{
                                "props": dat,
                                "customerid": cusid,
                                "info": JSON.stringify(dat),
                                "like": "liked",
                                "heart": "fa-heart"
                            });
                            */
                        }
                    });

              } else {
                  pool.query("delete from interested where C_Id=" + cusid + " and propertyId=" + propid,function(errion,resu){
                      if(errion) {
                          console.log("Database error: ",errion);
                          return; //Think of something to render when database query fails
                      } else {
                          console.log("Deletion successful!!");
                          res.status(204).send();
                         /*
                          res.render('propList',{
                              "props": JSON.parse(JSON.stringify(dat)),
                              "customerid": cusid,
                              "info": JSON.stringify(dat),
                              "like": "not-liked",
                              "heart": "fa-heart-o"
                          });
                          */
                      }
                  });
              }
          }
      });
  });

module.exports = router;
 