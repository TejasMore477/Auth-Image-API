const isAdminUser = (req,res,next)=>{
    // get info of the user role form the req.userInfo crated by the auth-middleware
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success : false,
            message: "Access denied! admin rights required"
        });
    };
    next();
};

module.exports = isAdminUser;