import express from 'express';
import authorized from '../middleware/authorized.js';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from './controller.js';
const router = express.Router();

router.post("/createTodo", authorized, createTodo);
router.get("/getTodos", authorized, getTodos);
router.get("/getTodo/:id", authorized, getTodoById);
router.put("/updateTodo/:id", authorized, updateTodo);
router.delete("/deleteTodo/:id", authorized, deleteTodo);

export default router;
