import { Todo } from "./model.js";
import { createTodoSchema, updateTodoSchema } from "./schema.js";

export const createTodo = async (req, res) => {
    try {
        const { data, error } = createTodoSchema.safeParse(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: JSON.parse(error.message)[0].message
            });
        }
                const { title, description, status } = data;
        const existingTodo = await Todo.findOne({ title, user: req.user.id });
        if (existingTodo) {
            return res.status(400).json({
                status: false,
                message: "Todo already exists"
            });
        }

        const newTodo = await Todo.create({ title, description, status, user: req.user.id });
        return res.status(201).json({
            status: true,
            message: "Todo created successfully",
            todo: newTodo
        });
    } catch (err) {
        console.log("Error creating todo", err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });

        res.status(200).json({
            status: true,
            message: "Todos fetched successfully",
            todos
        });
    } catch (err) {
        console.log("Error fetching todos", err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const getTodoById = async (req, res) => {
    try {

        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                status: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Todo fetched successfully",
            todo
        });
    } catch (err) {
        console.log("Error fetching todo", err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { data,error } = updateTodoSchema.safeParse(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: JSON.parse(error.message)[0].message
            });
        }
           const { title, description, status } = data;
        const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description, status });
        if (!todo) {
            return res.status(404).json({
                status: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Todo updated successfully",
            todo
        });
    } catch (error) {
        console.log("Error updating todo", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({
                status: false,
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Todo deleted successfully",
            todo
        });
    } catch (err) {
        console.log("Error deleting todo", err);
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}