//app.js
const express = require('express');
const bodyParser = require('body-parser');
const songData = require('./data'); // Impor data lagu dari data.js
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua lagu
app.get('/songs', (req, res) => {
    res.json(songData);
});

// Endpoint untuk menambahkan lagu baru
app.post('/songs', (req, res) => {
    const { title, artist } = req.body;
    if (title && artist) {
        const newSong = { title, artist };
        songData.push(newSong);
        res.status(201).json(newSong);
    } else {
        res.status(400).json({ message: 'Title and artist are required fields.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
