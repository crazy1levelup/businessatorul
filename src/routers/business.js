//modules
const express = require('express');
const router = new express.Router();
const multer = require('multer');

const mongoose = require('mongoose');
//models
const Business = require('../models//business');
//middleware
const auth = require('../middleware/auth');
const resizeImg = require('../helper/resizeImg');

//api

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let myId = mongoose.Types.ObjectId()
        const extension = file.mimetype.split('/')
        cb(null, myId + '.' + extension[1])
    }
})
var upload = multer({ storage })

router.post('/add-business', upload.array('myFiles', 6), async (req, res) => {
    const { name, location } = req.body;
    const { files } = req
    let images = []
    if (!name || !location) {
        return res.status(400).send({ error: "All fields are required" });
    }

    if (!files) {
        return res.status(400).send({ error: "All fields are required" });
    } else {
        files.forEach((file) => {
            resizeImg(file)
            images.push({ src: `${file.filename.split('.')[0]}`, thumb: `thumbnails-${file.filename.split('.')[0]}` })
        })
    }

    const business = new Business({ name, location, images })
    try {
        await business.save()
        return res.status(200).send(business)
    } catch (e) {

        return res.status(400).send(e)
    }
})

router.get('/business', auth, async(req, res) => {
    try {
        const businesses = await Business.find()
        return res.status(200).send(businesses)
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router;