//modules
const express = require('express');
const router = new express.Router();
const fs = require('fs')

router.get('/photo/:id', async (req, res) => {
    var filename = req.params.id

    if (!filename) {
        return res.status(400).send({ err: 'no filename provided' })
    }
    try {
        fs.readFile(`./uploads/${req.params.id}.jpeg`, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(data)
        })
    } catch (e) {
        res.status(400).send({ error: e })
    }
})

module.exports = router;
