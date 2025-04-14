const express = require ('express');
const router = express.Router();
const {auth, callback} = require ('../services/googleAuth');
const { sendEvent } = require ('../services/calendar');

//Authentication and redirection routes
router.get ('/api/auth/google', auth);
router.get ('/api/auth/google/callback', callback);

//Route to send the event to Google Calendar
router.post ('/api/calendar', sendEvent )

module.exports = router;