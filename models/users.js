/**
 * Created by root on 2/21/16.
 */

var mongoose =  require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var generateAccountNumber = function(){
    return Math.floor((Math.random() * 10000000000000000) + 56 )
}

mongoose.connect("mongodb://50.18.217.186:27017/bankdb");
var message = "";
var userModel = new Schema({
    userId: ObjectId,
    custName: String,
    ssn: String,
    cell : Number,
    email: String,
    address: String,
    password: String,
    account: Number,
    balance: Number,
});
var User = mongoose.model('user', userModel);

exports.create = function(custName, SSN, cell, email, address, password , callback){
    var newUser = new User({
        custName: custName, ssn: SSN, cell: cell, email: email, address: address, password:password, account: generateAccountNumber(),balance: 0.0
    });
    newUser.save(function(error){
       if(error){
           throw error;
       }
        message = "User Created Successfully";

        User.find({custName: custName}).exec(function(error, user){
            if(error){
                throw error;
            }
            callback(null, user);
        });
    });
};

exports.findUser = function(email, password, callback){
    User.find({email: email, password: password}).exec(function(error, user){
      if(error){
          throw error;
      }
      callback(null, user);
    });
};

exports.depositAmount = function(accountnumber, amount, callback){
    var newBalance = 0;
    User.findOne({account: accountnumber},function(error, user){
      if(error){
          throw error;
      }
      user.balance = user.balance + parseInt(amount);
      user.save();
        //User.update({account: accountnumber} , {balance: user.balance});
      callback(null, user);

    });
};

exports.userBalance = function(account, password, callback){
    User.findOne({account: account, password: password}, function(error, user){
        if(error){
            throw error;
        }
        console.log(user);
        callback(null, { balance: user.balance, account: user.account});
    });
};