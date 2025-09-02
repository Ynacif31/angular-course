const express = require('express');
const router = express.Router();
const Post = require('./models/post');


app.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    });
});

app.post('', (req, res, next) => {
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

app.get('', (req, res, next) => {
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

app.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
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

app.delete("/:id", (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({
            message: 'Post id is required'
        });
    }

    Post.deleteOne({ _id: req.params.id })
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
});

module.exports = router;