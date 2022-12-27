const { Router } = require("express");
const route = Router();

const Category = require("../models/category.js");
const Image = require("../models/gallery.js");

route.get("/addCategory/:name", async (req, res, next) => {
    try {
         const categoryName = req.params.name;
         const newCategoryData = { name: categoryName };
         await Category.create(newCategoryData);
         res.send("Category created successfully!");
        }
    catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = route;