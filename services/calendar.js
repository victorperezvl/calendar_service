const { google } = require ('googleapis');
const { getRefreshToken } = require ('../models/userModel');
const { automaticAuth } = require ('./googleAuth.js');

//Function that creates the event with its data
const createEvent = async (auth, eventInfo) => {
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


 //Function that sends the event to the user's Google Calendar
const sendEvent = async (req, res) => {
  try {
    const { googleId, eventInfo } = req.body; 

    if (!googleId || !eventInfo) {
        return res.status(400).json({ error: "Faltan datos en la solicitud" });
      }

    const refreshToken = await getRefreshToken(googleId);
    
    if (!refreshToken) throw new Error("Usuario no encontrado");

    const oAuthClient = automaticAuth(refreshToken);

    const event = {
        title: eventInfo.title,
        description: eventInfo.description,
        startDateTime: eventInfo.startDateTime,
        endDateTime: eventInfo.endDateTime,
      };

    const createdEvent = await createEvent (oAuthClient, event);
    console.log("Evento creado:", createdEvent.htmlLink);

    return res.status(200).json(createdEvent);

  } catch (error) {
    console.error("Error al crear evento en Google Calendar:", error);
    return res.status(500).json({ error: 'Error al crear el evento' });

  }
};

  
module.exports = { sendEvent };