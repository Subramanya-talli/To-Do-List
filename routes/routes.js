const express = require("express")
const router = express.Router();
const { createNewTask, getAllTasks, updateTask, deleteATask, getATask } = require("../controllers/constroller")

router.post("/", createNewTask);
router.get("/all/tasks", getAllTasks);
router.put("/update/:id", updateTask);
router.post("/:id", deleteATask);
router.get("/edit/:id", getATask);


module.exports = router;