const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const adminMiddleware = require('../middlewares/admin-middleware.js');

const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, (req,res) => {
    const { userId, userName, email, role } = req.userInfo;
    res.json({
        message:"welcome to admin page",
        user : {
            _id: userId,
            userName,
            email,
            role
        }
    });
});

module.exports = router;