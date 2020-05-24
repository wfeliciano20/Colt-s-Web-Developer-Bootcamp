const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const mongoose = require("mongoose");


//===============================================
//  Mongoose set up
//===============================================
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/yelp_camp_v11");


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
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


//===============================================
// set up flash
//===============================================
app.use(flash());


//===============================================
//  emoments configuration
//===============================================
app.use(
    app.locals.moment = require("moment"));


//===============================================
//  Passport configuration
//===============================================
app.use(
    require("express-session")({
        secret: "Once again Rusty wins cutest dog!",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===============================================
// Passing Current user,error & success 
// to every template middleware
//===============================================
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//===============================================
//  tell express to use ejs and seeding the DB
//===============================================
app.set("view engine", "ejs");
//seedDB();


//===============================================
//  Use method override to look for _method
//===============================================
app.use(methodOverride("_method"));


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