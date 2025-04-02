const express = require('express');
const { registerController, loginController, changePasswordController } = require('../controllers/auth-controller.js');
const authMiddleware = require('../middlewares/auth-middleware.js');


const router = express.Router();


// routers

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/change-password',authMiddleware, changePasswordController);

module.exports = router;