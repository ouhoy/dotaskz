const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    content: String,
   user_id: {
    type: String,
    required: true,
    }
});

module.exports = mongoose.model("Task" , tasksSchema);
