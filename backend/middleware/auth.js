import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authentication = async (req, res, next) => {
  try{
      //get cookie from request
      const cookies = req.cookies;
      
      if(!cookies){
          throw new Error("Invalid cookies");
      }

      //extract token from cookie
      const {token} = cookies;

      if(!token){
          throw new Error("Invalid token");
      }

      //validate the token
      const validatedToken = await jwt.verify(token, process.env.JWT_SECRET);

      //extract _id from the validatedToken
      const {_id} = validatedToken;

      //find the user
      const user = await User.findById(_id);

      if(!user){
          throw new Error("Invalid credentials");
      }

      //attach the user to request
      req.user = user;

      next();
  }catch(err){
      console.log(err.message);
      res.status(400).send("Unauthorized user");
}
}