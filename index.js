import http from 'http';
import express from 'express';


const port = 8000;
const app = express();

app.get('/one', (req, res) => {
    res.send('Here we go again');
});

app.listen(port, () => {
    console.log(`Server had been started at 127.0.0.1:${port}`)
});

