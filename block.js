const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
var Tx = require('ethereumjs-tx')
//var path = require('path')
//var truffle  = require("truffle-contract");

app.use(cors())

app.get('/static', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use('/static',express.static('web'));   //set folder web is static
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))