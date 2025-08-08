// src/routes/certificateRoutes.js
import express from 'express';
import multer from 'multer';
import {
  generateCertificate,
  verifyCertificatePdf,
  verifyCertificateById
} from '../controllers/certificate.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
// Multer setup
const upload = multer({
  dest: 'uploads/', // Matches your filePath usage
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});
// Protected route for generating certificate (Institute only)
router.post('/institute/generate-certificate', authMiddleware, generateCertificate);

// Route for verifying certificate via PDF upload (open to all)
router.post('/verify/pdf', upload.single('certificate'), verifyCertificatePdf);

// Route for verifying certificate by certificate ID
router.get('/verify/:certificateId', verifyCertificateById);

export default router;
