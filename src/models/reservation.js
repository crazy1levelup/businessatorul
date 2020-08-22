//modules
const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String
    },
    dateTime: {
        type: Date,

    },
    persNumber: {
        type: String
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Business'
    }

}, {
    timestamps: true
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation