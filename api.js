//must require for use 
const bodyParser = require('body-parser');
const express = require('express');
var Tx = require('ethereumjs-tx');//
const Web3 = require('web3');  //
const path = require('path');
const fs = require('fs');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/88b411023d86490d91ca5d75cbbd1cf5"));

// Defining the port number. 
// It is important to set to process.env.PORT 
// since Lambda will define the PORT explicitly
const PORT = process.env.PORT || 8080

// Supporting every type of body content type
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Use below codes to automatically add your routing files (endpoints)
var routes = fs.readdirSync(path.join(__dirname, '/route'))
routes.forEach(routesFile => {
    if (routesFile.match(/\.js$/)) {
        var route = require(path.join(__dirname, '/route/', routesFile))
        route(app)
    }
})

// show the running port on console
app.listen(PORT, function() {
    console.log('server started on port ', PORT)
})
