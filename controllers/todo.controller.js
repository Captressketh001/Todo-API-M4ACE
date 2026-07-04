import TodoSchema from "../models/todo.model.js";

export const createTodo = async(req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    if (!title && !description){
        res.status(400).json({status: 400, data: null, msg: 'title or description cannot be empty'})
        return
    }
    const todo = new TodoSchema({
        title,
        description,
        createdBy: user
    })

    todo.save();
    res.status(201).json({status: 201, data: todo, msg: "Todo Created Successfully"})
}

export const getAllTodo = async(req, res) => {
    const todos = await TodoSchema.find()
    
    res.status(200).json({status: 200, data: todos, msg: "Todo Fetched Successfully"})
}

export const getTodoById = async (req, res) => {
    const todo = await TodoSchema.findById(req.params.id);
    const user = req.user
    if (!todo){
        res.status(404).json({status: 404, data: null, msg: "Not Found"})
        return
    }

    if(todo.createdBy !== user){
        res.status(403).json({status: 403, data: null, msg: "Unauthorized"})
        return
    }

    res.status(200).json({status: 200, data: todo, msg: "Todo Fetched Successfully"})
}

export const updateTodo = async (req, res) => {
    const user = req.user;
    const todo = await TodoSchema.findById(req.params.id)

    if (!todo){
        res.status(404).json({status: 404, data: null, msg: 'Not found'})
        return   
    }

    if(todo.createdBy !== user){
        res.status(403).json({status: 403, data: null, msg: "You are not authorized to edit this"})
        return
    }
    const {title, description, status} = req.body;
    if (!title && !description && (status !== 'completed' || status !== 'pending')){
        res.status(400).json({status: 400, data: null, msg: 'title or description cannot be empty, status also is invalid'})
        return
    }
    if (title) todo.title = title; 
    if (description) todo.description = description;
    if (status) todo.status = status;

    await todo.save()
    // const { id } = req.params;
    // await TodoSchema.findByIdAndUpdate(id, 
    //     {title, description, status}
    // );

    res.status(200).json({status: 200, data: [], msg: "Todo Upated Successfully"})
}

export const deleteTodo = async (req, res) => {
    const user = req.user;

    const todo = await TodoSchema.findById(req.params.id)

    if (!todo){
        res.status(404).json({status: 404, data: null, msg: 'Not found'})
        return   
    }

    if(todo.createdBy !== user){
        res.status(403).json({status: 403, data: null, msg: "You are not authorized to delete this"})
        return
    }

    await TodoSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({status: 200, data: [], msg: "Todo Deleted Successfully"})
}   