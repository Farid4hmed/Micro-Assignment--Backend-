const express = require("express");
const app = express();


app.get("/api/health", function(req, res){
    res.send("Backend server is up and running"); 
}); 


const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";

app.listen(port, function(req, res){
    console.log(`Express server is up and running at http://${host}:${port}`);
});