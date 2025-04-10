import oAuth2Client from "./googleCLient";
import insertUser from "../models/userModel";

const auth = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',  
        scope: ['https://www.googleapis.com/auth/calendar'],

    });

    res.redirect(authUrl);
}

const callback = async (req, res) => {
    const {code} = req.query;

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        const { refresh_token } = tokens;
        const googleId = tokens.id_token;  

        await insertUser(googleId, refresh_token);

        res.status(200).send('Autenticación exitosa y refresh_token guardado');
    } catch (error) {
        console.error('Error al obtener tokens de Google:', error);
        res.status(500).send('Error al autenticar con Google');
    }

}

module.exports = { auth, callback }