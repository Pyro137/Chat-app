import express from "express"
import { logOut, signIn, signUp } from "../controllers/auth.controller.js"

const router =express.Router()


router.post("/signup",signUp)

router.post("/signin",signIn)

router.post("/logout",logOut)

export default router