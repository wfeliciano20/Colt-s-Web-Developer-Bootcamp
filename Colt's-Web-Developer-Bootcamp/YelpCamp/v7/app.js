const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const mongoose = require('mongoose');


//===============================================
//  Mongoose set up
//===============================================
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6");


//===============================================
// Require routes
//===============================================
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");


//===============================================
// telling express to serve the public directory
//===============================================
app.use(express.static(__dirname + "/public"));


//===============================================
//  set up bodyParser
//===============================================
app.use(bodyParser.urlencoded({
    extended: true
}));


//===============================================
//  Passport configuration
//===============================================
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===============================================
// Passing Current user to every template
// middleware
//===============================================
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//===============================================
//  tell express to use ejs and seeding the DB
//===============================================
app.set("view engine", "ejs");
seedDB();


//===============================================
// Use the routes
//===============================================
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//===============================================
// Set port 3000 to listen to requests
//===============================================
app.listen(3000, function() {
    console.log("The YelpCamp server has started!");
});