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

//get 4 images from a category && filter images
route.get("/:category", async (req, res, next) => {
    try {
        const category = req.params.category;
        const sortByDate = req.query.sortByDate;
        const filterByLike = req.query.filterByLike;

        if (!category) {
            res.status(400).send("Bad Request");
        }

        let set = 1;
        if(sortByDate){
            if(sortByDate === "desc")set = -1;
        }

        let likes = -1;
        if(filterByLike > 0)likes = 0;

        const images = await Image.find({category: { $in: [category] }, likes: { $gt : likes } }).sort({createdAt: set}).limit(4);
        res.json(images);

    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = route;