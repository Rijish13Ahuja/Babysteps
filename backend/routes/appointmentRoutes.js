const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const router = express.Router();
const moment = require('moment');

// ✅ Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId');
        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// ✅ Get a single appointment
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctorId');
        if (!appointment) {
            console.error("Error: Appointment not found");
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointment);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// ✅ Create a new appointment (with debugging logs & validation)
// ✅ Create a new appointment (with validation & debugging)
router.post('/', async (req, res) => {
    console.log("Incoming Appointment Data:", req.body); // Log request payload

    try {
        const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
        
        // Check if all required fields are provided
        if (!doctorId || !date || !duration || !appointmentType || !patientName) {
            console.error("Error: Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            console.error("Error: Doctor not found");
            return res.status(404).json({ message: "Doctor not found" });
        }

        console.log("Doctor Found:", doctor.name);
        console.log("Doctor Working Hours:", doctor.workingHours);

        // ✅ Convert date properly
        let appointmentDateTime = new Date(date);
        if (isNaN(appointmentDateTime.getTime())) {
            console.error("Error: Invalid date format received");
            return res.status(400).json({ message: "Invalid date format" });
        }

        // ✅ Extract time in HH:mm format
        const appointmentTime = moment(appointmentDateTime).utcOffset(0, true).format("HH:mm");
        const appointmentMinutes = moment.duration(appointmentTime).asMinutes();
        
        console.log("Parsed Appointment Time:", appointmentTime);

        // ✅ Convert doctor working hours to minutes
        const startMinutes = moment.duration(doctor.workingHours.start).asMinutes();
        const endMinutes = moment.duration(doctor.workingHours.end).asMinutes();

        // ✅ Validate time slot is within doctor's working hours
        if (appointmentMinutes < startMinutes || appointmentMinutes + duration > endMinutes) {
            console.error("Error: Appointment time is outside working hours");
            return res.status(400).json({ message: "Appointment time is outside working hours" });
        }

        // ✅ Fetch existing appointments for the same doctor on that date
        const startOfDay = moment(date).startOf('day').toDate();
        const endOfDay = moment(date).endOf('day').toDate();
        
        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: startOfDay, $lt: endOfDay }
        });

        console.log("Existing Appointments on Date:", existingAppointments);

        // ✅ Check if requested time slot is already booked
        const isConflict = existingAppointments.some(app =>
            moment(app.date).utcOffset(0, true).format("HH:mm") === appointmentTime
        );

        if (isConflict) {
            console.error("Error: Time slot already booked");
            return res.status(400).json({ message: "Time slot already booked" });
        }

        // ✅ Create new appointment with correct date format
        const appointment = new Appointment({
            doctorId, 
            date: appointmentDateTime.toISOString(), // Ensure correct format
            duration, 
            appointmentType, 
            patientName, 
            notes
        });

        await appointment.save();
        console.log("Appointment successfully booked:", appointment);
        res.status(201).json(appointment);

    } catch (error) {
        console.error("Error in appointment booking:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
// ✅ Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            console.error("Error: Appointment not found");
            return res.status(404).json({ message: "Appointment not found" });
        }

        Object.assign(appointment, req.body);
        await appointment.save();
        console.log("Appointment successfully updated:", appointment);
        res.json(appointment);

    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// ✅ Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            console.error("Error: Appointment not found");
            return res.status(404).json({ message: "Appointment not found" });
        }

        console.log("Appointment successfully deleted:", appointment);
        res.json({ message: "Appointment deleted successfully" });

    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
