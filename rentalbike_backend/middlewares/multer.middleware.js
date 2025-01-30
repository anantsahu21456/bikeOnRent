import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if the environment is Vercel or similar
    const uploadDir = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, "../public/temp");

    // Use /tmp for Vercel, otherwise use the local directory
    cb(null, uploadDir);  
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Use the original file name for the upload
  }
});

export const upload = multer({ storage: storage });
