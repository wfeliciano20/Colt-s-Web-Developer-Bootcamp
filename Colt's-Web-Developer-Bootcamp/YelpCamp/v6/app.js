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


app.get("/", function(req, res) {
    res.render("landing");
});


//===============================================
//Index - Show all campgrounds
//===============================================
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });
});


//===============================================
//CREATE - add new campground to DB
//===============================================
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const newCampground = {
        name: name,
        image: image,
        description: description
    };
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


//===============================================
//NEW - show form to create new campground
//===============================================
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});


//===============================================
//SHOW -  Shows info about one campground
//===============================================
app.get('/campgrounds/:id', function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});


//===============================================
// COMMENTS ROUTES
//===============================================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: foundCampground
            });
        }
    });
});


app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    //LOOK UP CAMPGROUND USING ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                } else {
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            })
        }
    });
});


//===============================================
//  AUTH ROUTES
//===============================================
//show register form
app.get("/register", function(req, res) {
    res.render("register");
});


//handle sign up logic
app.post("/register", function(req, res) {
    const newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

//===============================================
// Login Routes
//===============================================
// Show login form
app.get("/login", function(req, res) {
    res.render("login");
});


// handeling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});


//===============================================
// Log out route
//===============================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
})


//===============================================
//  Middleware isLoggedIn
//===============================================
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}


//===============================================
// Set port 3000 to listen to requests
//===============================================
app.listen(3000, function() {
    console.log("The YelpCamp server has started!");
});