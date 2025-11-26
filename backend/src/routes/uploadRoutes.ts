import { Router, Request, Response } from 'express';
import upload from '../config/upload';

const router = Router();

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Return the path relative to the server
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

export default router;
