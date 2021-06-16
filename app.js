'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = 8080;

app.use(express.static(path.join(__dirname, 'client/build')));

router.get('/', (req, res) => {
  //__dirname : project folder.
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// APIs.
app.get('/list', (req, res) => {
  
});


// Add the router
app.use('/', router);
app.use(express.static(__dirname + '/client'));
app.listen(port || 3000);

console.log(`Running at Port ${port}`);
