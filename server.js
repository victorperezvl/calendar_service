require ('dotenv').config();
const express = require ('express');
const {google} = require ('googleapis');
const app = express();

app.get('/', (req, res) => {
    res.send('API funcionando')
});

app.listen (3000, () => {
    console.log('Server listen on port 3000')
});

