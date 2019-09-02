var express = require('express');
var bodyParser =  require('body-parser');
var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

const contactsRoute = require('./routes/contacts');

app.use('/contacts',contactsRoute);


app.listen('3000');
console.log('Listening to port 3000');