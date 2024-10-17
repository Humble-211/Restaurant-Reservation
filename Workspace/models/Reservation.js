const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

    date: {
        type:String,
        required:true
    },
    time: { 
        type: String,
        required: true
    },
    size: {
        type: Number,
        required:true
    }
})

const Reservation = mongoose.model('Reservation', ReservationSchema)

module.exports = Reservation;