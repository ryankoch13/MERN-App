const mongoose = require("mongoose")
const PostMessage = require('../models/postMessage.js')
const express = require('express')

const router = express.Router()

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body

    const newPost = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const updatePost = async(req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true })

    res.json(updatedPost)
}

const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted succesfully!' })
}

const likePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount : post.likeCount + 1}, { new: true })

    res.json(updatedPost)
}

module.exports = { getPosts, createPost, router, updatePost, deletePost, likePost }