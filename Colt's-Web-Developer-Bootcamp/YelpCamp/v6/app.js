const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req, res) {
    res.render("landing");
});


//===============================
//Index - Show all campgrounds
//===============================
app.get("/campgrounds", function(req, res) {
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


//=================================
//CREATE - add new campground to DB
//=================================
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


//========================================
//NEW - show form to create new campground
//========================================
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});


//=======================================
//SHOW -  Shows info about one campground
//=======================================
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


//=====================================
// COMMENTS ROUTES
//=====================================
app.get("/campgrounds/:id/comments/new", function(req, res) {
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


app.post("/campgrounds/:id/comments", function(req, res) {
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


//====================================
// Set port 3000 to listen to requests
//====================================
app.listen(3000, function() {
    console.log("The YelpCamp server has started!");
});