import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadController = {
  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Create the uploads directory if it doesn't exist
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate the URL for the uploaded file
      const fileUrl = `/uploads/${req.file.filename}`;

      res.json({
        message: 'File uploaded successfully',
        url: fileUrl
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error uploading file',
        error: error.message
      });
    }
  },

  async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      res.json({
        message: 'File uploaded successfully',
        url: fileUrl
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Error uploading file',
        error: error.message
      });
    }
  }
};
