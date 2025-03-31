const express = require('express');
const { registerController, loginController } = require('../controllers/auth-controller.js')

const router = express.Router();


// routers

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;