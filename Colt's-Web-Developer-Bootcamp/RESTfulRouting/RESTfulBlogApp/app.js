const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//App config
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.set("view engine", "ejs");

//Mongoose/Model Configuration
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

//RESTful routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});
// Set port 3000 to listen to requests
app.listen(3000, function() {
    console.log("The RESTfullBlogApp server has started!");
});