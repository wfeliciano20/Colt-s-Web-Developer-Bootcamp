const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
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

let mrsNorris = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
});

//adding a new cat to the DB

// mrsNorris.save(function(err, cat) {
//     if (err) {
//         console.log('Something went wrong.')
//     } else {
//         console.log('We just save a cat to the DB');
//         console.log(cat);
//     }
// });

// using create method
// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: 'Bland'
// }, function(err, cat) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(cat);
//     }
// })

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats) {
    if (err) {
        console.log("oh no, error")
    } else {
        console.log('ALL THE CATS.....');
        console.log(cats);
    }
});