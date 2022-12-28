const { Router } = require("express");
const route = Router();

const Category = require("../models/category.js");
const Image = require("../models/gallery.js");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


route.get("/addCategory/:name", async (req, res, next) => {
    try {
         const categoryName = req.params.name;

         if (!categoryName)res.status(400).send("Bad Request");

         const newCategoryData = { name: categoryName };
         await Category.create(newCategoryData);
         res.send("Category created successfully!");
        }
    catch (err) {
        console.log(err);
        next(err);
    }
});

route.post("/addImage", async (req, res, next) => {
    try{
        const name = req.body.name;
        const category = req.body.category;
        const imageUrl = req.body.imageUrl;

        if (!name || !category.length || !imageUrl) {
            res.status(400).send("Bad Request");
        }

        const newImage = new Image({
            name: name,
            category: category,
            imageUrl: imageUrl
        });
        await Image.create(newImage);
        res.send("Image added successfully!");
    }
    catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = route;