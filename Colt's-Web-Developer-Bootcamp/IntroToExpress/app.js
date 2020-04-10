let express = require('express');
let app = express();

app.get('/', function(req, res) {
    res.send('hi there!');
});

app.get('/bye', function(req, res) {
    res.send('Goodbye');
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});