require ('dotenv').config();
const express = require ('express');
const {google} = require ('googleapis');
const app = express();
const router = require ('./routes/routes.js')

app.get('/', (req, res) => {
    res.send('API funcionando')
});

app.listen (3000, () => {
    console.log('Server listen on port 3000')
});

app.use ('/', router);