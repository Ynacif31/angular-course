const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hello from the server');
});

module.exports = app;