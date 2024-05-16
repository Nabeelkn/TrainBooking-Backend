const express = require('express');
const router = express.Router();
const Passenger = require('../Model/passengers');

router.post('/passenger', async (req, res) => {
    const { firstName, lastName, age, number, location, mail , trainName } = req.body;

    try {
        const newPassenger = new Passenger({ firstName, lastName, age, number, location, mail , trainName });
        await newPassenger.save();
        res.status(201).json({ message: 'Passenger added successfully' });
    } catch (error) {
        console.error('Error adding passenger:', error);
        res.status(500).json({ message: 'Error adding passenger', error: error.message });
    }
});

module.exports = router;
