// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/simActivation', { useNewUrlParser: true, useUnifiedTopology: true });

// SIM Schema
const simSchema = new mongoose.Schema({
    simNumber: String,
    phoneNumber: String,
    userName: String,
    activationStatus: { type: Boolean, default: false },
});

const SIM = mongoose.model('SIM', simSchema);

// POST: Activate SIM card
app.post('/api/activate', async (req, res) => {
    const { simNumber, phoneNumber, userName } = req.body;
    
    let sim = await SIM.findOne({ simNumber });
    if (!sim) {
        return res.status(404).send('SIM card not found.');
    }
    
    sim.phoneNumber = phoneNumber;
    sim.userName = userName;
    sim.activationStatus = true;
    
    await sim.save();
    res.send('SIM activated successfully.');
});

// GET: Check SIM status
app.get('/api/status/:simNumber', async (req, res) => {
    const sim = await SIM.findOne({ simNumber: req.params.simNumber });
    
    if (!sim) {
        return res.status(404).send('SIM card not found.');
    }
    
    res.send({ activated: sim.activationStatus });
});

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
