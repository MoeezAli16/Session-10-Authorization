import express from 'express';
import protect from '../middleware/auth.js';


const router = express.Router();


router.get('/public', (req, res) => {
  res.send('This is a public route. No authentication required.');
});


router.get('/protected', protect, (req, res) => {
  const roleMessage = req.user.role === 'admin' ? 'Hello Admin' : 'Hello User';
  res.json({ message: roleMessage });
});

export default router;
