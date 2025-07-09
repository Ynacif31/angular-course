const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.use('/api/posts', (req, res, next) => {
    const post = [
        {
            id: '1',
            title: 'First Post',
            content: 'This is the first post'
        },
        {
            id: '2',
            title: 'Second Post',
            content: 'This is the second post'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: post
    });
});

module.exports = app;