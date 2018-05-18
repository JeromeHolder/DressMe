const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Allows CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function Song(source, title, description, tempo, id, img) {
    this.source = source;
    this.title = title;
    this.description = description;
    this.tempo = tempo;
    this.id = id;
    this.img = img;
};
  
const songs = [
    new Song('/upstep.mp3', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches.', 'Tempo: 140bpm', 0, '/upstep.jpg'),
    new Song('/olympian.mp3', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme.', 'Tempo: 130bpm', 1, 'olympian.jpg'),
    new Song('/transmission.mp3', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar.', 'Tempo: 120bpm', 2, '/transmission.jpg')
];

app.get('/songs', (req, res)=>{
    res.json(songs);
});

app.listen(8080, ()=>{console.log("Server running on 8080")});