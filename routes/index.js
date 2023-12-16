// routes/api.js

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Get test data
 *     tags:
 *       - Test
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "Hello, Swagger!"
 */
router.get("/test", (req, res) => {
  res.json({ message: "Hello, Swagger!" });
});

module.exports = router;
