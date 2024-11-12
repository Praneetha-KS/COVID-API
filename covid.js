const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

// MongoDB URI and Database
const mongoUri = 'mongodb://localhost:27017';
const dbName = 'covidTracker';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Fetch COVID-19 cases
app.get('/covid/cases', async (req, res) => {
    try {
        const cases = await db.collection('cases').find({}).toArray();
        res.json(cases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching COVID-19 cases' });
    }
});

// Fetch vaccination status
app.get('/covid/vaccination-status', async (req, res) => {
    try {
        const vaccinationStatus = await db.collection('vaccinationStatus').findOne({});
        res.json(vaccinationStatus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vaccination status' });
    }
});

// Fetch hospital resources
app.get('/covid/hospitals/resources', async (req, res) => {
    try {
        const hospitalResources = await db.collection('hospitalResources').find({}).toArray();
        res.json(hospitalResources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hospital resources' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
