const express = require("express")
const app = express();
const routes = require('./routes/routes')
const dotenv = require("dotenv")
const connectDB = require("./connection");
const TaskList = require('./model/model')
const methodOverride = require('method-override');
const path = require('path')

dotenv.config()
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Handles JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));


app.use('/Css', express.static(path.resolve(__dirname, "assets/Css")))

app.get('/', async function(req,res){
    const allTasks = await TaskList.find({});
    return res.render('home', { taskList : allTasks} )
});



app.use('/api/tasks', routes);
app.set("view engine", "ejs");


connectDB(process.env.mongodb_URL).then(() => {
    console.log("MongoDb is connected")
}).catch((err) => {
    console.log(err)
});

app.listen(PORT, ()=>{
    console.log(`The server is runnning in port ${PORT}`);
});


