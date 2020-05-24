const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


//Schema setup
const campgroundsSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Campground = mongoose.model("Campground", campgroundsSchema);

module.exports = Campground;