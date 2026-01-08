import express from 'express';
import authorized from '../middleware/authorized.js';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from './controller.js';
const router = express.Router();

router.post("/create", authorized, createTodo);
router.get("/get", authorized, getTodos);
router.get("/get/:id", authorized, getTodoById);
router.put("/update/:id", authorized, updateTodo);
router.delete("/delete/:id", authorized, deleteTodo);

export default router;
