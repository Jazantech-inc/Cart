const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{
       //let token = null;
       /* get token from header "react - userend axiosInstance" */
       
       //token = req.headers.authorization.split(" ")[1];
       const token = req.header("authorization").split(" ")[1];
       const decryptedToken = jwt.verify(token, process.env.jwt_secret_key);
       req.body.userId = decryptedToken.userId;
       next();
    } catch(error) {
        // if(error.name === "JsonWebTokenError"){
        //     return next(createError.Unauthorized())
        // }
        res.send({
            success: false,
            message: error.message
        });
    }
};