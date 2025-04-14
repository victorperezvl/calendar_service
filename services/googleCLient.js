const { google } = require('googleapis');

//Creating an OAuth instance with Google API client credentials
const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

module.exports = oAuth2Client;
