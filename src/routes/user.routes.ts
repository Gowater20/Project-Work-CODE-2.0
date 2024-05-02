import { Router } from "express";
import { Login, Logout, Signup, getUserLogged } from "../controllers/user.controllers";
import { JWTMiddleware } from "../middlewares/user.auth";
export const router = Router();

router.post("/register", Signup) //Allows users to register
//TODO router.post("/admin/register", Login) //Allows you to register a new admin
router.post("/login", Login) //Allows users to log in
router.get("/logout", JWTMiddleware, Logout) //Allow users to log out
//TODO
router.get("/user", JWTMiddleware, getUserLogged) //Returns the information of the currently authenticated user (generic or Admin).

