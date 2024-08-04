const express = require('express');
const https = require('https');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = '84cef04f0385af4612824fe12f36fcbb'; // Replace with your actual API key

app.use(cors()); // Use cors
app.use(express.json());

app.get('/weather', (req, res) => {
    const cityName = req.query.city;
    if (!cityName) {
        return res.status(400).send({ error: 'City name is required' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                res.send(JSON.parse(data));
            } else {
                res.status(response.statusCode).send({ error: 'Error fetching weather data' });
            }
        });
    }).on('error', (err) => {
        res.status(500).send({ error: 'Error fetching weather data' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

