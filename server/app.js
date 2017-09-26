const express = require('express');
const app = express();
const path = require('path');

// Serve static assets
app.use(express.static(path.resolve(process.env.PWD, 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(process.env.PWD, 'build', 'index.html'));
});

module.exports = app;