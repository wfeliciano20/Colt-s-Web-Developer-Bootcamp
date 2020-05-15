const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");


//=========================================
// mongoose set up
//=========================================
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");


//==========================================
// body parser set up
//==========================================
app.use(bodyParser.urlencoded({
    extended: true
}));


//==========================================
// view engine to ejs so we doon't need .ejs
//==========================================
app.set("view engine", "ejs");


//==========================================
// set up and require express-session
//==========================================
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


//==========================================
// set up passport
//==========================================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==========================================
// Routes
//==========================================
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});


//==========================================
// auth routes
//==========================================
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.register(new User({
        username: username
    }), password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
});


//==========================================
// Login routes
//==========================================
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {});


//=========================================
// Log out route
//=========================================
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


//==========================================
// middleware function to check login status
//==========================================
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//==========================================
// set up server at port 3000
//==========================================
app.listen(3000, function() {
    console.log("Authentication server running");
});