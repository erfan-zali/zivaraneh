import User from "../models/User.js";
import bcrypt from 'bcrypt'

const signUp = async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const salt = 8
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = new User({ firstName, lastName, username, password: hashedPassword, email }); 
    await user.save();

    res.status(201).json({ success: true,  user: { id: user._id, username: user.username } });
  } catch (error) {
    res
    .status(500)
    .json({ message: "Something went wrong", error: error.message });
  }
};

export default signUp;
