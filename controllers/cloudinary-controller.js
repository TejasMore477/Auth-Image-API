const ImageModel = require('../model/image-model');
const  {uploadToCloudinary }  = require('../helpers/cloudinary-helper.js');


const uploadeImageController = async ( req, res ) => {
    try {
        // checking if the file is missing or send with out the image
        if(!req.file){
            return res.status(400).json({
                success : false,
                message : "file is required! please upload an image"
            });
        };

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path)
         
        //storing the image url and publicIf along the the uploader user to the mongodb
        const newlyUploadedImage = new ImageModel({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        });

        await newlyUploadedImage.save();

        res.status(200).json({
            success : true,
            message : "Image uploaded Successfully!",
            image : newlyUploadedImage
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "something went wrong! while uploading images please try again!"
        });
    }
};

module.exports = {
    uploadeImageController
};