const express = require('express');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const router = express.Router();
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.get('/:id/slots', async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.query;

        const doctor = await Doctor.findById(id);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        const startMinutes = moment.duration(doctor.workingHours.start).asMinutes();
        const endMinutes = moment.duration(doctor.workingHours.end).asMinutes();

        const appointments = await Appointment.find({
            doctorId: id,
            date: { $gte: new Date(date), $lt: new Date(date + "T23:59:59.999Z") }
        });

        let availableSlots = [];
        for (let time = startMinutes; time < endMinutes; time += 30) {
            const slotTime = moment().startOf('day').minutes(time).format("HH:mm");
            const isBooked = appointments.some(app => moment(app.date).format("HH:mm") === slotTime);
            if (!isBooked) availableSlots.push(slotTime);
        }

        res.json({ availableSlots });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
