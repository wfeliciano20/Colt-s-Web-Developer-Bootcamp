let express = require("express");
let app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get('/speak/:animal', function(req, res) {
    const sounds = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof!',
        cat: "Meaw",
        goldfish: "..."
    }
    const animal = req.params.animal.toLowerCase();
    let sound = sounds[animal];
    res.send('The ' + animal + ' says ' + sound);
});

app.get("/repeat/:word/:number", function(req, res) {
    const word = req.params.word;
    const number = parseInt(req.params.number);
    let constructedString = "";
    for (let i = 0; i < number; i++) {
        constructedString += word + " ";
    }
    res.send(constructedString);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});