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

module.exports = { getPosts, createPost, router }