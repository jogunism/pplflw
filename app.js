'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');

// Add the router
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use('/', router);
app.use(express.static(__dirname + '/client'));

const data = require('./resources/mockup');
const port = 8080;

/** Default page */
router.get('/', (req, res) => {
  //__dirname : context root.
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/** APIs */
// employee list
app.get('/api/employees', (_, res) => {
  return res.send(data);
});

// edit employee state
app.put('/api/employee/state/:seq', (req, res) => {
  let seq = parseInt(req.params.seq);
  let employee = (() => {
    for(let o of data) {
      if (o.seq === seq) {
        return o;
      }
    }
  })();
  employee.state++;
  if (employee.state > 5) {
    employee.state = 0;
  }
  return res.send(data);
});

// edit employee data
app.put('/api/employee/:id', (req, res) => {
  data.map(o => {
    if (o.seq === req.body.seq) {
      o.id = req.body.id;
      o.name = req.body.name;
    }
    return o;
  });
  // console.log(data);
  return res.send(data);
});

// add employee
app.post('/api/employee', (req, res) => {
  data.push({
    seq: data[data.length-1].seq + 1,
    id: req.body.id,
    name: req.body.name,
    state: 0 // default: ADDED
  });

  return res.send(data);
});

app.listen(port);

console.log(`Running at Port ${port}`);
