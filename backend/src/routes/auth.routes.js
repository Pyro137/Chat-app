import express from "express"
import { checkAuth, logOut, signIn, signUp, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router =express.Router()


router.post("/signup",signUp)

router.post("/signin",signIn)

router.post("/logout",logOut)

router.put("/update-profile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)


export default router