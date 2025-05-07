import multer from 'multer'

export const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size is too large. Max size is 3MB.' });
      }
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: `An unknown error occurred: ${err.message}` });
    }
    next(); // If no error, continue to the next middleware
  };