const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/restful_blog_app");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.set("view engine", "ejs");