const express = require("express");
const router = express.Router();
const { Favorite } = require("../model/Favorite");
const {auth}=require('../middleware/auth');




//add to favorite

router.post("/addToFavorite",(req,res)=>{
    const favorite= new Favorite(req.body);

    favorite.save((err,doc)=>{
        if(err)  return res.json({success:false,err})
        return res.status(200).json({success:true});
    })
})


//Remove From favorite
router.post("/removeToFavorite",(req,res)=>{

    Favorite.findOneAndDelete({'userFrom':req.body.userFrom,"movieId":req.body.movieId})
    .exec((err,doc)=>{
        if(err)  return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,doc});
    })
})

//Remove From favorite
router.post("/favorited",(req,res)=>{

    Favorite.find({'userFrom':req.body.userFrom,"movieId":req.body.movieId})
    .exec((err,doc)=>{
        if(err)  return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,doc});
    })
})

//find all liked movies by a user
router.post("/getFavoriteMovies",(req,res)=>{

    Favorite.find({'userFrom':req.body.userFrom})
    .exec((err,favorites)=>{
        if(err)  return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,favorites});
    })
})

module.exports=router


