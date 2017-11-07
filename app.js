var express    = require('express');

var app = express();

app.use('/', express.static('public/index.html'))
app.use(express.static('public'));
app.use(express.static('build'));

app.listen(80, () => console.log('Listening on port 80'));
