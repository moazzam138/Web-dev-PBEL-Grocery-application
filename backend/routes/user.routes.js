import express from "express";
import {
  checkAuth,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", authUser, checkAuth);
// Allow logout even if auth middleware fails (clears cookie)
router.get("/logout", logout);

export default router;