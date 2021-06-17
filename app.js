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
  console.log(data);
  return res.send(data);
});

app.post('/api/employees', (req, res) => {
  data.push({
    seq: data[data.length-1].seq + 1,
    id: req.body.id,
    name: req.body.name,
    state: 0 // default state: ADDED
  });

  return res.send(data);
});

app.put('/api/employees/:id', (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);

  data.map(o => {
    if (o.seq === req.body.seq) {
      o.id = req.body.id;
      o.name = req.body.name;
    }
    return o;
  });

  console.log(data);
  return res.send(data);
});

console.log(`Running at Port ${port}`);
