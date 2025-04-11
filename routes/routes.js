const express = require ('express');
const router = express.Router();
const {auth, callback} = require ('../services/googleAuth');
const { sendEvent } = require ('../services/calendar');

router.get ('/api/auth/google', auth);
router.get ('/api/auth/google/callback', callback);
router.post ('/api/calendar', sendEvent )

module.exports = router;