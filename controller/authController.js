import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const register = async (req, res) => {
  console.log("hello");
  console.log("hello11111");

  try {
    const { role, email, password } = req.body; 

    console.log("hello222222", role, email, password);

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      role: role || 'user', 
      email,
      password: hashedPassword,
    });

    console.log("hello33333");

    await newUser.save();
    console.log("errrrrrrr")
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};


const login = async (req, res) => {
    console.log("Starting login process");
  
    try {
      const { email, password } = req.body;
  
      console.log("Login request body:", { email, password });
  
      const user = await User.findOne({ email });
      console.log("Found user:", user);
  
      if (!user) {
        console.log("User not found in the database");
        return res.status(400).json({ message: 'User not found' });
      }
  
     
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isMatch);
  
      if (!isMatch) {
        console.log("Invalid password");
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      console.log("JWT token generated");
  
  
      res.json({ token });
  
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: 'Error logging in', error: err });
    }
  };
  

export { login, register };
