import express from 'express';
import { handleStudentProcessing } from '../utils/studentProcessor.js';

const router = express.Router();

// Route: GET /api/students/processed
router.get('/processed', async (req, res) => {
  try {
    const result = await handleStudentProcessing();
    res.status(200).json(result);
  } catch (error) {
    console.error('Processing error:', error.message);
    res.status(500).json({ message: 'Something went wrong while processing students.' });
  }
});

export default router;


