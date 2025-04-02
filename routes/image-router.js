const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const adminMiddleware = require('../middlewares/admin-middleware.js');
const uploadMulterMiddleware = require('../middlewares/upload-img-middleware.js');
const { uploadeImageController, fetchImageController, deleteImageController, fetchPaginatedImageController } = require('../controllers/cloudinary-controller.js');


const router = express.Router();


// routs to upload the image
router.post('/upload', authMiddleware, adminMiddleware, uploadMulterMiddleware.single('image'), uploadeImageController)

// to get all the image
router.get('/get',authMiddleware, fetchImageController);

// delete the image
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteImageController);

// to get paginated image
router.get('/get/paginated',authMiddleware, fetchPaginatedImageController);

module.exports = router;