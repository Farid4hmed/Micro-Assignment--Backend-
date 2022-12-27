const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const initDB = require("./config/db.js");
const admin = require("./routes/admin.js");


app.use(express.json());
app.use(express.urlencoded({extended: true}));

initDB();

const Category = require("./models/category.js");
const Image = require("./models/gallery.js");

app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
});


app.use("/api/admin", admin);













const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.use((req, res) => {
    res.status(404).send("You are looking for something that we do not have.");
})

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});