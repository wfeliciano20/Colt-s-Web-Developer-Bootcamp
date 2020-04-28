const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model('Cat', catSchema);

let george = new Cat({
    name: 'George',
    age: 11,
    temperament: 'Grouchy'
});

george.save(function(err, cat) {
    if (err) {
        console.log('Something went wrong.')
    } else {
        console.log('We just save a cat to the DB');
        console.log(cat);
    }
});
//adding a new cat to the DB

//retrieve all cats from the DB and console.log each one