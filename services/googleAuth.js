const oAuth2Client = require('./googleCLient.js');
const {insertUser} = require ("../models/userModel");
const {google} = require ('googleapis');
const { encrypt, decrypt } = require ('./crypto.js');

//Manual client authentication to save the refresh token in the database
const auth = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',  
        scope: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']

    });

    res.redirect(authUrl);
};

const callback = async (req, res) => {
    const {code} = req.query;

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        const { refresh_token } = tokens;
        oAuth2Client.setCredentials(tokens);

        const people = google.people({ version: 'v1', auth: oAuth2Client });
        const profileResponse = await people.people.get({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses',
        });
        const googleId = profileResponse.data.resourceName;
        const displayName = profileResponse.data.names && profileResponse.data.names[0] && profileResponse.data.names[0].displayName;
        const emailAddress = profileResponse.data.emailAddresses && profileResponse.data.emailAddresses[0] && profileResponse.data.emailAddresses[0].value;

        if (!refresh_token) {
            console.error("No se recibió refresh_token. Puede que el usuario ya haya autorizado antes.");
            return res.status(400).send("No se recibió refresh_token. Intenta quitar el permiso de la app en tu cuenta de Google.");
          }
      
          const encryptedToken = encrypt(refresh_token);
      

        await insertUser(googleId, encryptedToken);

        res.status(200).send('Autenticación exitosa y refresh_token guardado');
    } catch (error) {
        console.error('Error al obtener tokens de Google:', error);
        res.status(500).send('Error al autenticar con Google');
    }

};

//Automatic authentication by the API using the saved refresh token
const automaticAuth = (refreshToken) => {

    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    return oAuth2Client;
};

module.exports = { auth, callback, automaticAuth }