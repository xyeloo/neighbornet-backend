const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { asyncHandler } = require('../middleware/error.middleware');

router.get('/profile', asyncHandler(async (req, res) => {
  const users = await query('SELECT user_id, email, name, age, occupation, bio, address, street, verification_status, profile_visibility, is_moderator, created_at FROM Users WHERE user_id = ?', [req.user.user_id]);
  if (users.length === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, user: users[0] });
}));

module.exports = router;