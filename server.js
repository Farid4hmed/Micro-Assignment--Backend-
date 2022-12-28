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


//Health API
app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
});


app.use("/api/admin", admin);









// route not found middleware
app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we not have!")
);

//error handler middleware
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong!");
});



//Port Connection
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});