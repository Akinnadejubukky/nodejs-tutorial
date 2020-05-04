'use strict'


const path = require("path");
const express = require("express");


// const add = require('./add');

const app = express();


app.use('/assets', express.static(path.join(__dirname, './assets')));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Todo App'
    });   

})


app.get('/login', (req, res) => {
    res.send('Welcome to my login page')
});


app.listen(5000, ()=>{
    console.log("Listening on port 5000")
});  