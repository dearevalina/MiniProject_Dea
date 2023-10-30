//app.js

const express = require('express');
const songData = require('./data'); // Impor data dari data.js
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/songs', (req, res) => {
    res.json(songData);
});

app.post('/songs', (req, res) => {
    const { title, artist, album, year, genre } = req.body;
    if (title && artist && album && year && genre) {
        const newSong = { id: songData.length + 1, title, artist, album, year, genre };
        songData.push(newSong);
        res.status(201).json(newSong);
    } else {
        res.status(400).json({ message: 'Title, artist, album, year, and genre are required fields.' });
    }
});

app.put('/songs/:index', (req, res) => {
    const songIndex = req.params.index;
    const { title, artist, album, year, genre } = req.body;

    // Periksa apakah indeks lagu valid
    if (songIndex >= 0 && songIndex < songData.length) {
        // Perbarui data lagu berdasarkan indeks
        songData[songIndex] = {
            title: title || songData[songIndex].title,
            artist: artist || songData[songIndex].artist,
            album: album || songData[songIndex].album,
            year: year || songData[songIndex].year,
            genre: genre || songData[songIndex].genre
        };

        res.json({ message: 'Data lagu berhasil diperbarui.', updatedSong: songData[songIndex] });
    } else {
        res.status(404).json({ error: 'Indeks lagu tidak valid.' });
    }
});

app.delete('/songs/:title', (req, res) => {
    const songTitle = req.params.title;
    
    // Temukan lagu dengan judul yang diberikan dalam data lagu
    const songIndex = songData.findIndex(song => song.title === songTitle);

    // Periksa apakah lagu dengan judul tersebut ditemukan
    if (songIndex !== -1) {
        // Hapus lagu dari array data lagu
        songData.splice(songIndex, 1);
        res.json({ message: 'Lagu berhasil dihapus.' });
    } else {
        res.status(404).json({ error: 'Lagu dengan judul yang diberikan tidak ditemukan.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

