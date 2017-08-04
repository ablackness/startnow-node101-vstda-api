const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

var arr = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];
// add your code here
app.get('/', function(req, res) {
    res.status(200).send({status: 'ok'});
});

app.get('/api/TodoItems', function(req, res) {
  res.status(200).json(arr);
});

app.post('/api/TodoItems', function(req, res) {
  var newId = 0;
  var replaced = false;
  for (let i=0;i < arr.length;i++){
    if (arr[i].todoItemId == newId) {
      arr[i] = ({
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
      });
      replaced = true;
      res.status(201).json(arr[i]);
    }
  }
  if (!replaced) {
      arr.push({
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: true
      });
      res.status(201).json(arr[arr.length]);
  }
});

app.get('/api/TodoItems/:number', function(req, res) {
  var printed = false;
  for (let i=0;i < arr.length; i++) {
    console.log(arr[i].todoItemId);
    console.log(req.params.number);
    if (arr[i].todoItemId == req.params.number) {
      res.status(200).json(arr[i]);
      printed = true;
    } 
  }
  if (!printed) {
    res.status(404).send('<h3>404 Page not found</h3>');
  }
});

app.delete('/api/TodoItems/:number', function(req, res){
  var deleted = false;
  for (let i=0;i < arr.length;i++){
    if (arr[i].todoItemId == req.params.number) {
      var result = arr.splice(i, 1);
      deleted = true;
      res.status(200).json(result[0]);
    }
  }
  if (!deleted) {
    res.status(404).send('<h3>Item does not exist</h3>');
  }
});

module.exports = app;
