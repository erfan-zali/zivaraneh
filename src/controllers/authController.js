import User from "../models/User.js";
import bcrypt from "bcrypt";

// Register User
export const signUp = async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save user
    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      email,
    });
    await user.save();

    // Always create session
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login handler
export const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        errors: [{ message: "نام کاربری اشتباه است" }],
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        errors: [{ message: "رمز عبور اشتباه است" }],
      });
    }

    // Save to session
    req.session.user = {
      id: user._id,
      username: user.username,
    };

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "مشکلی در ورود رخ داد",
      error: error.message,
    });
  }
};

// Check if session exists
export const checkUserExist = async (req, res) => {
  try {
    if (req.session?.user) {
      const userInDb = await User.findById(req.session.user.id);
      if (!userInDb) {
        req.session.destroy(() => {});
        return res.status(200).json({ isUserLoggedIn: false, user: null });
      }

      return res.status(200).json({
        isUserLoggedIn: true,
        user: req.session.user,
      });
    }

    return res.status(200).json({ isUserLoggedIn: false, user: null });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout handler
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    res.clearCookie("connect.sid"); // Default session cookie name
    return res.status(200).json({ message: "Logged out successfully" });
  });
};
