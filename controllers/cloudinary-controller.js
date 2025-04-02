const ImageModel = require('../model/image-model');
const { uploadToCloudinary } = require('../helpers/cloudinary-helper.js');
const cloudinaryConfigs = require('../config/cloudinary.js');


const uploadeImageController = async (req, res) => {

    //check if the responce contails a file that is to be uploades
    // if yes then pass the req.file.path to the uploade-image-to-cloudinary
    // -----this helper function will upload the imaeg to cloudinary and retuen an object wih the "image url" and "public id"
    // then store the url, publicid, and along with the userinfo from the req.userinfo.userid whih is created after the login to the database

    try {
        // checking if the file is missing or send with out the image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "file is required! please upload an image"
            });
        };

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path)

        //storing the image url and publicIf along the the uploader user to the mongodb
        const newlyUploadedImage = new ImageModel({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        res.status(200).json({
            success: true,
            message: "Image uploaded Successfully!",
            image: newlyUploadedImage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong! while uploading images please try again!"
        });
    }
};

const fetchImageController = async (req, res) => {
    try {
        const fetchedImages = await ImageModel.find({});

        if (fetchedImages) {
            return res.status(200).json({
                success: true,
                message: "Images fetched sucessfully!",
                data: fetchedImages
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "error occured during fetchching images!",
            });
        }
    } catch (error) {
        console.log('Error occured while fetching the images', error);
        res.status(500).json({
            success: false,
            message: "internal server error occured while fetching the images",
            error: error.message
        });
    }
};

const deleteImageController = async (req, res) => {
    // get the imageid of the image to delete
    // get the id of the user who wants to delete the image 
    //check the image exists in database
    // check is the current user is the uploder to delete the image
    // delete the image form the cloudinary first
    // dlete the image fomr the databse
    try {
        // get the imageid of the image to delete
        const imageId = req.params.id;
        // get the id of the user who wants to delete the image 
        const userId = req.userInfo.userId;
        //check get the image exists in database
        const imagetodelete = await ImageModel.findById(imageId);
        console.log(imagetodelete, "imagetodelete")

        if (!imagetodelete) {
            return res.status(404).json({
                success: false,
                message: 'No image found in the database to delete'
            });
        };

        // check is the current user is the uploder to delete the image
        if (imagetodelete.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this image"
            });
        }
        // delete the image form the cloudinary first
        await cloudinaryConfigs.uploader.destroy(imagetodelete.publicId);

        // dlete the image fomr the databse
        const deletedImage = await ImageModel.findByIdAndDelete(imageId);

        res.status(200).json({
            success: true,
            message: "image deleted successfuly!",
            data: deletedImage
        });

    } catch (error) {
        console.log('Error occured while deleting the image', error);
        res.status(500).json({
            success: false,
            message: "internal server error occured while deleting the image",
            error: error.message
        });
    }
};

const fetchPaginatedImageController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page-1)*limit;

        const sortBy = req.query.sortby || "createdAt";
        const sortOrder = req.query.sortorder === "asc" ? 1 : -1;
        const totalImages = await ImageModel.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const fetchedPaginatedImages = await ImageModel.find().sort(sortObj).skip(skip).limit(limit);

        if (fetchedPaginatedImages) {
            return res.status(200).json({
                success: true,
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                message: "paginated Images fetched sucessfully!",
                data: fetchedPaginatedImages
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "error occured during fetchching paginated images!",
            });
        }
    } catch (error) {
        console.log('Error occured while fetching the paginated images', error);
        res.status(500).json({
            success: false,
            message: "internal server error occured while fetching the paginated images",
            error: error.message
        });
    }
};

module.exports = {
    uploadeImageController,
    fetchImageController,
    deleteImageController,
    fetchPaginatedImageController
};