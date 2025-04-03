# Auth-Image API
 A fully functional and scalable authentication-based image upload API built with Node.js, Express, MongoDB, JWT, and Cloudinary. Ideal for mini-projects and hackathons.

## Features
✅ User authentication (Register/Login)
✅ Role-based access (User/Admin)
✅ Secure image upload (Cloudinary)
✅ Pagination for image viewing
✅ Admin-restricted image deletion (only uploader can delete)
✅ Protected routes for users and admins

## Tech Stack
Backend: Node.js, Express, MongoDB, Mongoose

## Authentication: 
JWT, bcrypt.js

## File Upload: 
Multer.js, Cloudinary

## Testing: 
Postman

## Getting Started
1) Fork & Clone the Repo  
2) Install Dependencies : npm install                                                                                  
3) Setup Environment Variables : Create a .env file in the root directory & Add the following variables:                                                   
        MONGO_URI=your_mongodb_connection_string                                                      
        JWT_SECRET=your_jwt_secret                                                                        
        CLOUDINARY_CLOUD_NAME=your_cloudinary_name                                                                  
        CLOUDINARY_API_KEY=your_cloudinary_api_key                                                 
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret                                                      
4) Run the Server : npm run dev

## API Testing
Use Postman to test the endpoints. Screenshots of testing are available in the repo.

## Contributing
Feel free to fork and contribute! Proper commit messages and structured code make it easy for beginners to understand.

