import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // 1️⃣ Validate input
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // 5️⃣ Send response
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Check for missing fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required.",
      });
    }

    // 2️⃣ Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 3️⃣ Check password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // 4️⃣ Check role match (optional but useful if multiple user roles exist)
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "No account found for this role.",
      });
    }

    // 5️⃣ Create JWT token (payload = user ID)
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    // 6️⃣ Send token inside secure cookie
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true,          
      sameSite: "none",      
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    // ✅ ADD ROLE COOKIE FOR MIDDLEWARE ACCESS


    // 7️⃣ Prepare safe user object (no password)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // 8️⃣ Send response
    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.fullname}`,
      user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};



export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile.",
    });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/", // 🔥 THIS IS THE FIX
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    // ✅ Get logged-in user from middleware
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ✅ Update allowed fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile.",
    });
  }
};
