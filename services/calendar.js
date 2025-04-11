const google = require ('googleapis');
const {getUser} = require ('../models/userModel');
const { automaticAuth } = require ('./googleAuth.js');

const createEvent = async (auth, eventDetails) => {
    const calendar = google.calendar({ version: 'v3', auth });
  
    const event = {
      summary: eventInfo.title,
      description: eventInfo.description,
      start: {
        dateTime: eventInfo.startDateTime,
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: eventInfo.endDateTime,
        timeZone: 'Europe/Madrid',
      },
    };
  
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
  
    return response.data;
  };


const sendEvent = async (googleId, eventInfo) => {
  try {
    // 1. Obtener refresh token
    const user = await getUser(googleId);
    if (!user) throw new Error("Usuario no encontrado");

    const refreshToken = user.refresh_token;

    // 2. Crear cliente OAuth con el token
    const oAuthClient = automaticAuth(refreshToken);

    const event = {
        title: eventInfo.title,
        description: eventInfo.description,
        startDateTime: eventInfo.startDateTime,
        endDateTime: eventInfo.endDateTime,
      };

    // 4. Insertar en Google Calendar
    const createdEvent = await createEvent (oAuthClient, event);
    console.log("Evento creado:", createdEvent.htmlLink);

    return createdEvent;
  } catch (error) {
    console.error("Error al crear evento en Google Calendar:", error);
    throw error;
  }
};

  
module.exports = { sendEvent };