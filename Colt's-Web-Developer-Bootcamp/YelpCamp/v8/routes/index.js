const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//===============================================
// root route
//===============================================
router.get("/", function(req, res) {
    res.render("landing");
});


//===============================================
//  AUTH ROUTES
//===============================================
//show register form
router.get("/register", function(req, res) {
    res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
    res.render("login");
});


// handeling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});


//===============================================
// Log out route
//===============================================
router.get('/logout', function(req, res) {
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


module.exports = router;