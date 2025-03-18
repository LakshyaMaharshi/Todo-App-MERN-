const express = require('express');
const app = express();
const cors = require('cors');
const task = require("./Task");


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// let todos = [];

app.get('/',(req,res)=>{
    res.send("hello this is todo server");
});

app.get("/todos",async(req,res)=>{
    let todos = await task.find();
    res.json(todos);
})

app.post('/add',async(req,res)=>{
    let newTask = await new task({task :req.body.task});
    newTask.save();
    res.redirect('/');
})

app.post('/delete', async(req,res)=>{
    let task_name = req.body.task_name;
    if(!task_name){
        return res.status(200).json({message : "Name is Required"});
    }

    let result = await task.deleteOne({task : task_name})

    if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'task deleted successfully' });
      } else {
        return res.status(404).json({ message: 'task not found' });
      }
})


app.listen(3000,()=>{
    console.log("server start at port 3000");
})