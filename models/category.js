const mongoose = require("mongoose");

const imagesCategory = new mongoose.Schema(
    { name:{type:String, required:true, unique:true}},
     {timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }}
 );

module.exports = mongoose.model("Category", imagesCategory);