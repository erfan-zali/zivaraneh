import User from "../models/User.js";

const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password, email }); 
    await user.save();

    res.status(201).json({ user: { id: user._id, username: user.username } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export default signUp;
