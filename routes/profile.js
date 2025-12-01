const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/profile", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const userId = req.session.user.id; 
    
    const [rows] = await db.promise().query(
      `SELECT first_name, last_name, email, role, twofa_enabled, created_at 
       FROM users 
       WHERE id = ?`, 
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ error: "Server error fetching profile" });
  }
});

module.exports = router;