const Story = require('../models/story')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

//get all stories
const getAllStories = async (req, res) => {
    // res.send('get all stories')
    try {
        // const stories = await Story.find().populate("writtenBy")
        const stories = await Story.find().populate("writtenBy", "username")
        res.status(200).json({ success: true, stories });
    } catch (error) {
        res.json(error);
    }
}

//get single story
const getAStory = async (req, res) => {
    // res.send('get a story')
    const {storyId} = req.params
    try {
        const story = await Story.findById({ _id: storyId }).populate("writtenBy", "username")
        res.status(200).json({ success: true, story })
    } catch (error) {
        res.json(error)
    }
};


//*********Users Stories***********/

//get users stories
const getUsersStories = async (req, res) => {
    // res.send("get users stories");

    const { userId } = req.user;
    try {
        const stories = await Story.find({ writtenBy: userId }).populate("writtenBy", "username")
        res.status(200).json({ success: true, stories })
    } catch (error) {
        res.json(error)
    }
};

const createStory = async (req, res) => {
    // res.send('create story')
    const { userId } = req.user
    try {
        // image upload
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: 'postitfileimages'
        })
        req.body.image = result.secure_url;
        fs.unlinkSync(req.files.image.tempFilePath)
        req.body.writtenBy = userId

        // send post request
        const story = await Story.create({ ...req.body })
        res.status(201).json({ success: true, story})

    } catch (error) {
        res.json(error)
        
    }
}

// update story
const editStory = async (req, res) => {
    // res.send('update story')
    const { userId } = req.user
    const { storyId } = req.params
    try {
        const story = await Story.findOneAndUpdate({ _id: storyId, writtenBy: userId,}, req.body,{new:true, runValidators: true});
        res.status(200).json({ success: true, story })
    } catch (error) {
        res.json(error);
    }
}

//delete story
const deleteStory = async (req, res) => {
    // res.send('delete a story')
    const { userId } = req.user
    const { storyId } = req.params;
    try {
        const story = await Story.findOneAndDelete({_id: storyId,})
        res.status(200).json({ success: true, message: "Story delete"})
    } catch (error) {
        res.json(error)
    }
};

module.exports = {
    getAllStories,
    getAStory,
    getUsersStories,
    createStory,
    editStory,
    deleteStory
};