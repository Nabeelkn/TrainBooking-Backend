const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    number: { type: String, required: true },
    location: { type: String, required: true },
    mail: { type: String, required: true },
    trainName: { type: String, required: true }
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
