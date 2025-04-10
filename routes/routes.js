const express = require ('express');
const router = express.Router();
const {auth, callback} = require ('../services/googleAuth');

router.get ('/api/auth/google', auth);
router.get ('/api/auth/google/callback', callback);

module.exports = router;