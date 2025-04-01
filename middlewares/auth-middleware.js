const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

// getting the brearer token fom req.header
// getting the essential part of req
// verifying  and decomposing the token using JWT.verify
// pushin the object into req.userInfo 

    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(400).json({
            success : false,
            message : "access denied no user token found login again"
        });
    };

    //decoding the token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decoded token',decodedTokenInfo);
        
        req.userInfo = decodedTokenInfo;

        next();

    } catch (error) {
        return res.status(500).json({
             success : false,
            message : "access denied no user token found login again"
        });
    };

};

module.exports = authMiddleware;