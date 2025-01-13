const express = require('express');
const { signupGet, signinGet} = require('../../controllers/web/auth');

const router = express.Router();

router.get('/signup', signupGet);
router.get('/signin', signinGet);

module.exports = router;