const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    const campgrounds = [{
            name: "Salmon Creek",
            image: "https://api.creativecommons.engineering/t/600/https://live.staticflickr.com/3336/3551756947_7799d72c13_m.jpg",
        },
        {
            name: "Granite Hill",
            image: "https://api.creativecommons.engineering/t/600/https://farm9.staticflickr.com/8003/28660877652_56f7af6fc1_m.jpg",
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://api.creativecommons.engineering/t/600/https://live.staticflickr.com/8763/28148495284_679e52bc4f_m.jpg",
        },
    ];

    res.render("campgrounds", {
        campgrounds: campgrounds,
    });
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    res.send("You hit the post route");
    //redirect back to campgrounds page
});

app.listen(3000, function() {
    console.log("The YelpCamp server has started!");
});