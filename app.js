'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const store = require('./store');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query;
    let results = store;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be a rating or app name');
        }
        if (sort === 'app') {
            results = results.sort((a, b) => {
                const firstA = a.App.toLowerCase();
                const firstB = b.App.toLowerCase();
                return firstA < firstB ? -1: firstA > firstB ? 1: 0;
            });
        } else if (sort === 'rating') {
            results = results.sort((a, b) => b.Rating - a.Rating);
        }
    }

    if (genre) {
        if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genre.toLowerCase())) {
            return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
        }
        results = results.filter(app => {
            return app.Genres.toLowerCase() === genre.toLowerCase();
        });
    }


    return res.send(results); //JSON.stringity(results)
});

app.listen(8000, () => {
    console.log('server running');
});
