import { Router } from "express";
import { adminSignup, logout, getUserLogged, login, signup } from "../controllers/user.controllers";
import { JWTMiddleware } from "../middlewares/user.auth";
export const router = Router();

router.post("/register", signup) //Allows users to register
router.post("/admin/register", adminSignup) //Allows you to register a new admin
router.post("/login", login) //Allows users to log in
router.get("/logout", JWTMiddleware, logout) //Allow users to log out
//TODO
router.get("/user", JWTMiddleware, getUserLogged) //Returns the information of the currently authenticated user (generic or Admin).

