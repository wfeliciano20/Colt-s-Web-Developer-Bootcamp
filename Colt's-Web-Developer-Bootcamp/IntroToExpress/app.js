let express = require('express');
let app = express();

app.get('/', function(req, res) {
    res.send('hi there!');
});

app.get('/bye', function(req, res) {
    res.send('Goodbye');
});

app.get('/r/:subredditName', function(req, res) {
    const title = req.params.subredditName;
    res.send('Welcome to the ' + title + ' page');
});

app.get('*', function(requ, res) {
    res.send('You are a star!');
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});