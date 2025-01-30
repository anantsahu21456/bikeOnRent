import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use absolute path for the destination
    cb(null, path.join(__dirname, "../public/temp"));  // Ensure correct directory path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Use the original file name for the upload
  }
});

export const upload = multer({ storage: storage });
