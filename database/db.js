const mongoose = require('mongoose');


const connectToDB = async () => {
    try {
        if(!process.env.MONGODB_URI){
            throw new Error("\n MONGODB_URI dossent exist in the dotenv file, please check the token");
        };

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('\n Database connected Successfully');

    } catch (error) {
        console.error('\n Error occured while connecting to DataBase', error);
        process.exit(1);
    }
};

module.exports = connectToDB;