import express from "express";
import {
  checkAuth,
  sellerLogin,
  sellerLogout,
} from "../controllers/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";
const router = express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth", authSeller, checkAuth);
// Allow seller logout without requiring auth so cookie can be cleared
router.get("/logout", sellerLogout);

export default router;