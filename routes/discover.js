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


module.exports = route;