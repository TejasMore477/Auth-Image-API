const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router  = express.Router();

// home page router

router.get('/content', authMiddleware , (req,res) => {
    const { userId, userName, email, role } = req.userInfo;
    res.json({
        message:"welcome to home page",
        user : {
            _id: userId,
            userName,
            email,
            role
        }
    });
});

module.exports = router;