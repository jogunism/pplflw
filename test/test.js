const { exception } = require('console');
const data = require('../resources/mockup');

let editTargetSeq;
let newEmployee;
before(() => {
  editTargetSeq = 2;
  newEmployee = {
    id: 'michael',
    name: 'Micahel George',
    state: 1
  }
});

describe('1. employees list', () => {

  it('should have mockup data', () => {
    if (!data || data.length < 1) {
      throw exception();
    }
  });

  it('should the mockup data valid', () => {
    data.forEach(o => {
      if (!o.seq || !o.id || !o.name || !o.state) {
        console.log(o);
        throw exception();
      }
    });
  });

});

describe('2. edit employee data', () => {

  it('should have the target employee sequence number.', () => {
    if (!editTargetSeq) {
      throw exception();
    }
  });

  it('should have the target employee data by the sequence number.', () => {
    let employee = (() => {
      for(let o of data) {
        if (o.seq === editTargetSeq) {
          return o;
        }
      }
    })();
    if (!employee) {
      throw exception();
    }
  });

});

describe('3. add a new employee', () => {

  it('should have valid target data.', () => {
    if (!newEmployee || !newEmployee.id || !newEmployee.name) {
      throw exception();
    }
  });

});




