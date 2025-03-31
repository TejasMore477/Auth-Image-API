const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const adminMiddleware = require('../middlewares/admin-middleware.js');
const uploadMulterMiddleware = require('../middlewares/upload-img-middleware.js');
const { uploadeImageController } = require('../controllers/cloudinary-controller.js');


const router = express.Router();


// routs to upload the image
router.post('/upload', authMiddleware, adminMiddleware, uploadMulterMiddleware.single('image'), uploadeImageController)

// to get all the image

module.exports = router;