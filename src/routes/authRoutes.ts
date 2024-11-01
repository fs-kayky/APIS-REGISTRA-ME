import { Router } from "express";
import { DecryptUserInformation, login, register } from "../controllers/AuthController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

// Register

router.post("/register", register);
router.post("/login", login);
router.get("/decrypt", DecryptUserInformation, verifyJWT);

export default router;