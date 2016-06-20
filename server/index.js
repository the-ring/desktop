'use strict';

const app = require('express')();

app.get('/static/:file', (req, res) => {
  res.sendFile(`${__dirname}/${req.params.file}`);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/app/index.html`);
});

module.exports = app;
