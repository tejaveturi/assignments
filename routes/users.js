var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req,res, next){
    var custname = req.query.name;
    var SSN = req.query.SSN;
    var cell = req.query.cell;
    var email = req.query.email;
    var address = req.query.address;
    var password = req.query.password;
    users.create(custname, SSN, cell, email, address, password , function(error, data){
        if(error){
            throw error;
        }
        res.send(data);
    });
});

router.post('/auth', function(req, res, next){
    var email = req.query.email;
    var password = req.query.password;
    console.log(email + password);
    if(email != '' || password != '')
    {
        users.findUser(email, password, function(error, user){
           if(error){
               throw error;
           }
            console.log(user);
           if(user.length == 1)
                res.send("Welcome to " + user[0].custName);
           else
                res.send("Wrong Username and Password");
        });
    }
    else
    {
        res.send("Please enter the Username and Password");
    }
});

router.post('/deposit', function(req, res, next){
    var accountnumber = req.query.accountnumber;
    var amount = req.query.amount
    users.depositAmount(accountnumber, amount, function(error, data){
        if(error){
            throw error;
        }
        console.log(data);
        if(data)
            res.send("Success");
        else
            res.send("Failure");
    });
});

router.post('/balance', function(req, res, next){
   var account = req.query.accountnumber;
    var password = req.query.password;
    users.userBalance(account, password, function(error, data){
        console.log(data);
       if(data){
           res.send(data);
       }
       else{
           res.send("No Such Account");
       }
    });
});

module.exports = router;

