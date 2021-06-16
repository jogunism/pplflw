'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const router = express.Router();
const port = 8080;

const data = require('./resources/mockup');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

router.get('/', (req, res) => {
  //__dirname : project folder.
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// APIs.
app.get('/api/employees', (_, resp) => {
  return resp.send(data);
});


// Add the router
app.use('/', router);
app.use(express.static(__dirname + '/client'));
app.listen(port);

console.log(`Running at Port ${port}`);
