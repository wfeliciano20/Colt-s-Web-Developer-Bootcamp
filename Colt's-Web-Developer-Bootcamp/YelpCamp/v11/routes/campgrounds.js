const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


//===============================================
//Index - Show all campgrounds
//===============================================
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
            });
        }
    });
});

//===============================================
//CREATE - add new campground to DB
//===============================================
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
    };
    const newCampground = {
        name: name,
        image: image,
        description: description,
        author: author,
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//===============================================
//SHOW -  Shows info about one campground
//===============================================
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id)
        .populate("comments")
        .exec(function(err, foundCampground) {
            if (err) {
                console.log(err);
            } else {
                //render show template with that campground
                res.render("campgrounds/show", {
                    campground: foundCampground,
                });
            }
        });
});

//===============================================
// Edit Campground Route
//===============================================
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        res.render("campgrounds/edit", {
            campground: foundCampground
        });
    });
});

//===============================================
// Update Campground Route
//===============================================
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
        err,
        updatedCampgroud
    ) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//===============================================
// Destroy Campground Route
//===============================================
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;