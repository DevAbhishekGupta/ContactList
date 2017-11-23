// importing required modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();

const route = require('./routes/route');

//mongodb connection
mongoose.connect('mongodb://localhost:27017/contactlist');

//ON connection
mongoose.connection.on('Connected', function(){
    console.log('Connected to mongodb @27017');
});

mongoose.connection.on('error', function(err){
    if(err)
    {
        console.log('Error in DB connection:'+err);
    }
});

const port = 3000;

// middleware cors
app.use(cors());
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'public ')));

app.use('/api', route);

app.get('/',function(req,res){
    res.send('foobar');
});

app.listen(port, function(){
console.log('Server started at port'+port);
});