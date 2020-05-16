const express = require('express');
const router = express.Router({
    mergeParams: true
});
const Campground = require("../models/campground");
const Comment = require("../models/comment");


//===============================================
// COMMENTS ROUTES
//===============================================
router.get("/new", isLoggedIn, function(req, res) {
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


router.post("/", isLoggedIn, function(req, res) {
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
                    //add username and id to the comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id)
                }
            })
        }
    });
});


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