const { Router } = require("express");
const route = Router();

const express = require("express");
const app = express();

//import models
const Category = require("../models/category.js");
const Image = require("../models/gallery.js");

//get a list of all categories
route.get("/getCategories", (req, res, next) => {
    try{
         Category.find({}, (err, data) => {
            if(err)console.log(err);
            else { res.status(200).send(data); };
        });
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/fav/:imgName", async (req, res, next) => {
    try{
        const imageName = req.params.imgName;

        const image = await Image.find( { name : imageName } );
        let like = 0;
       if(image){
        if(image.likes){like = 0;}
        else {like = 1;}
       }

       await Image.updateMany({name: imageName}, { $set: {likes: like}});

       res.send("done");

    } catch(err){
        console.log(err);
        next(err);
    }
});

//get 4 images from a category && filter images && shuffle images
route.get("/:category", async (req, res, next) => {
    try {
        const category = req.params.category;
        const shuffle = req.query.shuffle;
        const sortByDate = req.query.sortByDate;
        const filterByLike = req.query.filterByLike;

        if (!category) {
            res.status(400).send("Bad Request");
        }

        let shuffleInt = parseInt(shuffle) || 0;
        let set = 1;
        if(sortByDate){
            if(sortByDate == "desc")set = -1;
        }

        let likes = 0;
        if(filterByLike){
            if(filterByLike == 1)likes = 1;
        }
        const images = await Image.find({category: { $in: [category] }, likes: { $gte: likes }}).skip(shuffleInt).sort({ createdAt: set}).limit(4);
        res.json(images);

    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = route;