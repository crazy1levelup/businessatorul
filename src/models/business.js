//modules
const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String
    },
    images: [
        {
            src: {
                type: String,
                default: ''
            },
            thumb: {
                type: String,
                default: ''
            }
        }
    ]

}, {
    timestamps: true
})

const Business = mongoose.model('Business', businessSchema)

module.exports = Business