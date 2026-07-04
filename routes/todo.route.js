import express from 'express'
import { getAllTodo, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js'
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/", protect, getAllTodo)

router.get("/:id", protect, getTodoById)

router.post("/", protect, createTodo)

router.put("/:id", protect, updateTodo)

router.delete("/:id", protect, deleteTodo)

export default router;