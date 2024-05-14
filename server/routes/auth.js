const express = require("express");
const router = express.router();

const { signinController, signupController } = require('../controllers/auth');

router.post('/signup', signupController);

router.post('/signin', signinController);
