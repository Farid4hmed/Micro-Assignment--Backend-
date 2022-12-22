//mongoose connection
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database not connected successfully: " + err);
});