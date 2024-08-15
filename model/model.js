const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            require: true,
        },

        description : {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
)

const taskList = mongoose.model("TaskList", taskSchema);
module.exports = taskList;