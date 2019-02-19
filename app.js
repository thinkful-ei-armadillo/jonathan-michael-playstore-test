'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const store = require('./store');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('Sort must be a rating or app name');
    }
  }

  if (sort === 'app') {
    let results = store.sort((a, b) => {
      const firstA = a.App.toLowerCase();
      const firstB = b.App.toLowerCase();
      return firstA < firstB ? -1: firstA > firstB ? 1: 0;
    });
    return res.send(results);

  } else if (sort === 'rating') {
    let results = store.sort((a, b) => b.Rating - a.Rating);
    return res.send(results);

  }
  return res.send(JSON.stringify(store));
});

app.listen(8000, () => {
  console.log('server running');
});
