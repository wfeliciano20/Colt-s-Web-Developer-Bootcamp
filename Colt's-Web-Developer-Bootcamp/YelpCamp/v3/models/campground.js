const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


//Schema setup
const campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundsSchema);

modules.exports = Campground;