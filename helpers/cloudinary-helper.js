const cloudinaryConfigs = require('../config/cloudinary.js');

const uploadToCloudinary = async (filepath) => {
    try {
        const result = await cloudinaryConfigs.uploader.upload(filepath)

        return {
            url : result.secure_url,
            publicId : result.public_id
        };

    } catch (error) {
        console.log('Error occured while uploading data to Cloudinary \n', error);
        throw new Error('Error occured while uploading data to Cloudinary')
        
    }
};

module.exports = {uploadToCloudinary} ;