const taskList = require("../model/model")

async function createNewTask(req, res) {
    try {
        const { task, description } = req.body
        if (!task) {
            return res.status(400).json({ message: "Task is required" })
        }
        const newTask = await taskList.create({
            task: task,
            description: description
        });

        newTask.save();
        return res.redirect('/')

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function getAllTasks(req, res) {
    const allTasks = await taskList.find({});
    try {
        res.status(200).json(allTasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params
        const task = await taskList.findByIdAndUpdate(id, req.body)
        if (!task) {
            return res.status(400).json({ message: "The Task does not exist" })
        }
        const updatedTask = await taskList.findById(id);
        res.redirect('/')

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteATask(req, res) {
    try {
        const { id } = req.params
        const task = await taskList.findByIdAndDelete(id)
        if (!task) {
            return res.status(400).json({ message: "Task does not exist" })
        }
        res.redirect('/')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getATask(req, res) {
    try {
        const { id } = req.params;
        const Task = await taskList.findById(id);
        if (!Task) {
            return res.status(400).json({ message: "The task does not exist" })
        }
        res.render("editTask.ejs", {task: Task})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createNewTask,
    getAllTasks,
    updateTask,
    deleteATask,
    getATask
}