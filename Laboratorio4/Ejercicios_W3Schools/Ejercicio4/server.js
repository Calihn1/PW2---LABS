const path = require('path');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log("Escuchando en http://localhost:3000");
});

app.get('/note.xml', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'note.xml'));
});