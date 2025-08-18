const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Post = require('./models/post');

const app = express();

const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoCluster = process.env.MONGODB_CLUSTER;
const mongoDatabase = process.env.MONGODB_DATABASE;

const mongoUri = `mongodb+srv://${mongoUsername}:${encodeURIComponent(mongoPassword)}@${mongoCluster}/${mongoDatabase}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUri)
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.log('Connection failed:', error.message);
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    .then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error fetching posts',
            error: error.message
        });
    });
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post updated successfully'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error updating post',
            error: error.message
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Post id is required'
        });
    }

    Post.deleteOne({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            message: 'Post deleted successfully'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error deleting post',
            error: error.message
        })
    })
})

module.exports = app;