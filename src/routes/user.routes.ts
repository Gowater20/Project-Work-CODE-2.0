import { Router } from "express";
import { Login, Logout, Signup, getUserLogged } from "../controllers/user.controllers";
export const router = Router();

router.post("/register", Signup) //Allows users to register
//TODO router.post("/admin/register", Login) //Allows you to register a new admin
router.post("/login", Login) //Allows users to log in
router.get("/logout", Logout) //Allow users to log out
//TODO router.get("/user", getUserLogged) //Returns the information of the currently authenticated user (generic or Admin).

