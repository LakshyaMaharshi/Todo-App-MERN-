let mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todos").then(
    ()=>console.log("DB connected")
).catch((err)=>{console.log(err);
})

let taskSchema = new mongoose.Schema({
    task : {type:String, required: true}
});

const task = mongoose.model("task", taskSchema);

module.exports = task;