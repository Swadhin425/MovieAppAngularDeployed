const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');



const UserSchema=mongoose.Schema({
    name :{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        unique:1,
        trim:true
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        default:0
    },image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

UserSchema.pre('save',function(next){
    console.log("inside pre middleware")
    var user=this
    if(user.isModified('password')){
            //create the salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err);
  
          bcrypt.hash(user.password,salt,function(err,hash){
              if(err) return next(err);
  
              user.password=hash
              next()
          })
      });
    }else{
        next()
    }

})

UserSchema.methods.comparePassword= function(password,cb){
  bcrypt.compare(password,this.password,function(err,isMatch){
    if(err) return cb(err);
    cb(null,isMatch)
  })
}

UserSchema.methods.generateToken= function(cb){
    var user=this;

    var token=jwt.sign(user._id.toHexString(),'secret');

    user.token=token;
    user.save(function(err,user){
        if(err)   return cb(err)
        cb(null,user)
    })

}

UserSchema.statics.findByToken=function(token,cb){
    var user=this;
    jwt.verify(token,'secret',function(err,decodedtoken){
        user.findOne({"_id":decodedtoken,"token":token},function(err,user){
            if(err)   return cb(err)
            cb(null,user)
        })

    })
}

const User=mongoose.model('User',UserSchema);

module.exports={User}