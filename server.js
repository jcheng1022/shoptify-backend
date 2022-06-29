const express = require('express')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Item = require('./models/item');



require("dotenv").config();


const {PORT, MONGODB_URL} = process.env;

mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send('hi')
})


//GET
app.get('/item', async(req,res) => {
    try{
        res.json(await Item.find())
    } catch(error) {
        console.log('error: ' + error)
        res.json({error: 'something went wrong'})
    }
})
//DELETE
app.delete('/item/:id', async(req,res,) => {
    try{
        res.json(await Item.findByIdAndDelete(req.params.id))
    }catch(error){
        console.log('error: ' + error)
        res.json({error: 'something went wrong'})
    }
})

// CREATE
app.post('/item', async(req,res) => {
    try{
        res.json(await Item.create(req.body))
    }catch(error) {
        console.log('error: ' + error)
        res.json({error: 'something went wrong'})
    }
})

// EDIT
app.put('/item/:id', async (req,res) => {
    try{
        res.json(await Item.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    }catch(error) {
        console.log('error: ' + error)
        res.json({error: 'something went wrong'})
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})