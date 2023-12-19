// routes/api.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cboard");

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

// 게시물 제출 페이지
router.get("/board", controller.board);
router.post("/board", controller.postDB);

// 게시물 확인 페이지
router.get("/boardList", controller.boardList);
router.post("/writeComment", controller.writeComment);
router.post("/readComment", controller.readComment);
module.exports = router;
