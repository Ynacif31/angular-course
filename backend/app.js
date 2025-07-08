const express = require('express');

const app = express();



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