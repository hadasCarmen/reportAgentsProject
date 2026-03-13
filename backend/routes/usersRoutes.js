import express from "express";
import multer from "multer";
const upload = multer();

import { loginController } from "../controllers/loginController.js";
import { signinController } from "../controllers/signinController.js";
import { allUsersController } from "../controllers/allUsersController.js";
import { reportRegularController } from "../controllers/reportRegularController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { reportCsvController } from "../controllers/reportCsvController.js";
import { justAdmin } from "../middleware/authAdmin.js";
import { allReportsController } from "../controllers/allReportsController.js";
import { myReportsController } from "../controllers/myReportsController.js";
import { uploadImg } from "../middleware/multerImg.js";

const router = express.Router();

router.post("/api/login", loginController);
router.post('/api/signin',authMiddleware,justAdmin,signinController)
router.get('/api/allUsers',authMiddleware,justAdmin,allUsersController)
router.get('/api/allReports',authMiddleware,justAdmin,allReportsController)
router.get('/api/myReports',authMiddleware,myReportsController)
router.post('/api/reportRegular',authMiddleware,uploadImg.single('image'),reportRegularController)
router.post('/api/reportCsv',authMiddleware,upload.single("csv"),reportCsvController)

export default router;
