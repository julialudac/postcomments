/* eslint-disable no-async-promise-executor */

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router(); 

// Get Post
router.get('/', async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray()); 
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async(req, res) => { 
  const posts = await loadPostCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


async function loadPostCollection() {
  const config = require("../../config.js");
  const client = await mongodb.MongoClient.connect(config.config.MONGODB_ENDPOINT, {useUnifiedTopology: true} );
  return client.db('vue_express').collection('posts'); //
}

module.exports = router;