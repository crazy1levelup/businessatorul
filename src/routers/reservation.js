//modules
const express = require('express');
const router = new express.Router();

const mongoose = require('mongoose');
//models
const Reservation = require('../models/reservation');
//middleware
const auth = require('../middleware/auth');

//api

router.post('/add-reservation', auth, async (req, res) => {
    const { username, phone, dateTime, persNumber, businessId } = req.body
    console.log(req.body)

    if (!username || !phone || !dateTime || !persNumber || !businessId) {
        return res.status(400).send({ e: 'All fields are required' })
    }
    try {
        const reservation = new Reservation({ username, phone, dateTime, persNumber, business: businessId })
        await reservation.save()
        return res.status(200).send(reservation)
    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

router.post('/update-reservation', auth, async (req, res) => {
    const { username, phone, dateTime, persNumber, businessId, reservationId } = req.body

    if (!reservationId || !businessId || !username || !phone || !dateTime || !persNumber) {
        return res.status(400).send({ e: 'All fields are required' })
    }
    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, { username, phone, dateTime, persNumber }, { new: true })
        return res.status(200).send(reservation)
    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

router.get('/reservation', auth, async (req, res) => {
    const { businessId, search } = req.query
    try {
        const reservations = await Reservation.find({ business: businessId, "username": { "$regex": `${search}`} }).sort({ updatedAt: -1 })
        return res.status(200).send(reservations)
    } catch (e) {
        console.log(e)
        return res.status(400).send(e)
    }
})

module.exports = router;