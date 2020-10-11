const express = require("express");
const router = express.Router();
const { User } = require("../model/User");
const {auth}=require('../middleware/auth');

//get all users


router.get("/auth",auth,(req,res)=>{
  res.status(200).json({
    _id:req.user._id,
    isAuth:true,
    email:req.user.email,
    lastname:req.user.lastname,
    name:req.user.name,
  });
})

router.get("/orders",auth,(req,res)=>{
  res.status(200).json({
    msg:"Order Details"
  });
})


router.get("/", (req, res) => {
  res.send("hello from routter");
});

//Register route
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      sucess: true,
    });
  });
});

//login route
router.post("/login", (req, res) => {
 
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        msg: "Auth failed ,email not found",
      });
    }

    //compare the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSucess: false, msg: "wrong password" });

       //token generation
       user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSucess: true,
          userId: user._id,
          email:user.email,
          token:user.token,
          image:user.image,
          expiresIn:3600
        });
      });
    });
 
  });
});


//Log out user
router.post("/logout",auth, (req, res) => {
  User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
    if (err) return res.json({sucess:false,err})
    return res.status(200).json({sucess:true})
  })
});

//Log out user
router.get("/getDetails", (req, res) => {
 
res.send("user details")
});


module.exports = router;
