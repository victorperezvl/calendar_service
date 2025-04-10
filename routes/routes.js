const express = require ('express');
const router = express.Router();
import {auth, callback} from '../services/googleAuth'

app.get ('auth/google', auth);
app.get ('auth/google/callback', callback);