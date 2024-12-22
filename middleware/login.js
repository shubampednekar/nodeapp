import jwt from 'jsonwebtoken';
import config from '../config.js';
const isAuthenticated = (req,res,next) => {
    
    
        try {
            if(!req.headers['authorization']){
                res.status(401).json({message:'headers missing'});
            }else{
                const token = req.headers['authorization'].split(" ")[1];
                const decodedToken = jwt.verify(token,config.JWT_SECRET);
                req.user = decodedToken.id;
                next();
            }
        } catch (error) {
            res.status(401).json({ message: 'token verification failed'});
        }
    
}
export default isAuthenticated;