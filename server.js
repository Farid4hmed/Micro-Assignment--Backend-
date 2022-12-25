const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const initDatabase = require("./config/db.js");

initDatabase();

//Schemas for Category and image
const galleryCategory = new mongoose.Schema(
   { name:{type:String, required:true}},
    {timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }}
);
const imagesGallery = new mongoose.Schema(
    { name: {
            type: String,
            required: true,
        },
        category: { type: Array, required: true },
        likes: { type: Number, default: 0 },
        imageUrl: { type: String, required: true },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

//models
const Category = mongoose.model("Category", galleryCategory);
const Image = mongoose.model("Image", imagesGallery);











const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.use((req, res) => {
    res.status(404).send("You are looking for something that we do not have.");
})

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});