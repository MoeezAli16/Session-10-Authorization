import jwt from 'jsonwebtoken';


const protect = (req, res, next) => {
    console.log('Authorization Header:', req.header('Authorization')); 
    const token = req.header('Authorization')?.split(' ')[1];
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    console.log("tttttttttttt",token)
    try {
        console.log("ggggggggg")
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      console.log("hhhhhhhhh")
      req.user = decoded;
      console.log("ffffffffff")
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

export default protect;
