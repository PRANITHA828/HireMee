import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getMyProfile,
} from "../controllers/usercontroller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get("/profile", isAuthenticated, getMyProfile);
router.route("/profile/update").put(isAuthenticated, updateProfile);

export default router;
