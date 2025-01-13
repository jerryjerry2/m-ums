const express = require('express');
const { signupPost, signinPost, logout } = require('../../controllers/api/auth');

const router = express.Router();

router.post('/signup', signupPost);
router.post('/signin', signinPost);
router.delete('/logout', logout);

module.exports = router;