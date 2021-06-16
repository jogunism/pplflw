'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');

const data = require('./resources/mockup');
const port = 8080;

// Add the router
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use('/', router);
app.use(express.static(__dirname + '/client'));
app.listen(port);

router.get('/', (req, res) => {
  //__dirname : project folder.
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// APIs.
app.get('/api/employees', (_, res) => {
  return res.send(data);
});

app.post('/api/employees', (req, res) => {
  data.push({
    seq: data[data.length-1].seq,
    id: req.body.id,
    name: req.body.name,
    state: 0 // default state: ADDED
  });

  return res.send(data);
});

app.put('/api/emplyees/:employeeId', (req, res) => {
  console.log(req.params.employeeId);
  return res.send();
});

console.log(`Running at Port ${port}`);
