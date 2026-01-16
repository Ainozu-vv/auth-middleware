const jwt=require("jsonwebtoken");
const SECRET_KEY="your-secret-key-here";

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json({message:'No token provided'})
    }

    try {
        const decoded =jwt.verify(token,SECRET_KEY)
        req.user=decoded
        next()
    } catch (error) {
        
    }
}
module.exports=authMiddleware