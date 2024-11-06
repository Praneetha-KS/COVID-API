const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample data
let casesData = {
    "region": "California",
    "active": 25000,
    "recoveries": 20000,
    "deaths": 1000,
    "lastUpdated": "2024-10-22T12:00:00Z"
};

let vaccinationData = {
    "totalDosesAdministered": 500000,
    "percentageVaccinated": 75.5
};

let hospitalResources = {
    "region": "California",
    "availableBeds": 200,
    "availableVentilators": 50,
    "icuCapacity": 75
};

// 1. Retrieve current COVID-19 case numbers
app.get('/covid/cases', (req, res) => {
    res.json(casesData);
});

// 2. Retrieve detailed COVID-19 statistics for a specific region
app.get('/covid/cases/:region', (req, res) => {
    const { region } = req.params;
    if (region === casesData.region) {
        res.json(casesData);
    } else {
        res.status(404).json({ error: 'Region not found.' });
    }
});

// 3. Update case count for a region
app.post('/covid/cases/update', (req, res) => {
    const { region, newCases, newDeaths } = req.body;
    if (region === casesData.region) {
        casesData.active += newCases;
        casesData.deaths += newDeaths;
        casesData.lastUpdated = new Date().toISOString();
        res.json({ message: 'Case count updated successfully.', region: casesData.region });
    } else {
        res.status(404).json({ error: 'Region not found.' });
    }
});

// 4. Provide vaccination status
app.get('/covid/vaccination-status', (req, res) => {
    res.json(vaccinationData);
});

// 5. Get availability of hospital resources
app.get('/covid/hospitals/resources', (req, res) => {
    res.json(hospitalResources);
});

// 6. Update hospital resource availability
app.post('/covid/hospitals/resources/update', (req, res) => {
    const { region, availableBeds, availableVentilators } = req.body;
    if (region === hospitalResources.region) {
        hospitalResources.availableBeds = availableBeds;
        hospitalResources.availableVentilators = availableVentilators;
        res.json({ message: 'Hospital resource availability updated successfully.', region: hospitalResources.region });
    } else {
        res.status(404).json({ error: 'Region not found.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
