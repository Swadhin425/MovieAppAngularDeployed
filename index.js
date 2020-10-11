const express =require("express");
const app =express();
const path= require('path');
const cors=require('cors');
const { User } = require("./model/User");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HNbHSL6HY0TCwA75v4cGso3hG3zvsjCH6Jpo2v5yJX5G0uCRIBX0VKDhVMRimAAy0rxmhGd77h2JkOVFhvAxXK800GttNvDDv');


const config=require('./config/key');
const cookieParser=require('cookie-parser');
//middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser())

//mongoose req
const mongoose=require("mongoose");
const { request } = require("http");
const connect =mongoose.connect(config.mongoURI,
    {}).then(()=>console.log("Mongodb Connected"))
    .catch(err=> console.log(err));

    app.post("/pay",(req,res)=>{
        stripe.charges.create({
            amount: req.body.amount,
            currency: "inr",
            source: req.body.token, // obtained with Stripe.js
            description: "My First Test Charge (created for API docs)"
          }, function(err, charge) {
            if(err) return res.json({success:false,err});
            return res.json({success:true,charge:charge});
          });
    })

//coonect to router
app.use('/api/users',require('./routes/users'));
app.use('/api/favorite',require('./routes/favorite'));
app.use('/api/comment', require('./routes/comment'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder
    //app.use(express.static("client/dist/client"));
    app.use(express.static(path.join(__dirname, 'client/dist/client')));
   
    // index.html for all page routes
    // app.get("*", (req, res) => {
    //   //res.sendFile(path.join(path.dirname(__dirname),"client","dist","client","index.html"));
    //   console.log(path.dirname(__dirname) +'/client/dist/client/index.html');
    //   res.sendFile(path.join(__dirname ,"client","dist","client","index.html"))
    // });
  }



 
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
