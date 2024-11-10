// JavaScript Functions for API Requests
const apiUrl = 'http://localhost:3000';

// Fetch COVID-19 cases
async function fetchCovidCases() {
    const casesResult = document.getElementById('casesResult');
    casesResult.textContent = 'Loading...';
    try {
        const response = await fetch(`${apiUrl}/covid/cases`);
        const cases = await response.json();
        casesResult.textContent = JSON.stringify(cases, null, 2);
    } catch (error) {
        casesResult.textContent = 'Error fetching COVID-19 cases';
        console.error('Error:', error);
    }
}

// Fetch vaccination status
async function fetchVaccinationStatus() {
    const vaccinationResult = document.getElementById('vaccinationResult');
    vaccinationResult.textContent = 'Loading...';
    try {
        const response = await fetch(`${apiUrl}/covid/vaccination-status`);
        const status = await response.json();
        vaccinationResult.innerHTML = `
            <p>Total Doses Administered: ${status.totalDosesAdministered}</p>
            <p>Percentage Vaccinated: ${status.percentageVaccinated}%</p>
        `;
    } catch (error) {
        vaccinationResult.textContent = 'Error fetching vaccination status';
        console.error('Error:', error);
    }
}

// Fetch hospital resources
async function fetchHospitalResources() {
    const hospitalResourcesResult = document.getElementById('hospitalResourcesResult');
    hospitalResourcesResult.textContent = 'Loading...';
    try {
        const response = await fetch(`${apiUrl}/covid/hospitals/resources`);
        const resources = await response.json();
        hospitalResourcesResult.textContent = JSON.stringify(resources, null, 2);
    } catch (error) {
        hospitalResourcesResult.textContent = 'Error fetching hospital resources';
        console.error('Error:', error);
    }
}
