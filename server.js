const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const mongoURL = process.env.MONGODB_URL;


const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

app.use((req, res) => {
    res.status(404).send("You are looking for something that we do not have.");
})

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});