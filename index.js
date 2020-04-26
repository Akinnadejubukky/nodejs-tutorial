const http = require("http");
const fs = require("fs");
const path = require("path");



// const cors = require("cors")
// const express = require("express");



const server = http.createServer((req, res) => {
    res.write("Hello Bukola");
    res.end()
});


server.listen(5000,(err)=>{
    console.log("Listening on port 5000")
});