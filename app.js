const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override')

//app object of express
const app = express();
app.use(express.static('public'))

//working with body-parser
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// set port number
const port = 3000;

//connect mongoose with localhost:27017
mongoose.connect('mongodb://localhost:27017/UserData');
//exports schema
const User = require("./model/user")

// set ejs engine
app.set("view engine", "ejs");

// get index.ejs file
app.get ('/' , (req , res)=>{
    res.render("index");
})


// post the form values in the database
app.post('/create',  (req, res) =>{
    const data = new User(req.body)
    data.save()
  res.redirect("/show")
})

app.get('/show', async(req,res)=>{
    const items = await User.find({})
    res.render('show', {items :items})
})



app.get('/show/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findById(id)
    res.render('edit', {items})
})


app.put('/show/:id', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    res.redirect('/show')
})

app.delete('/show/:id', (req,res)=> {
    let searchQuery = {_id: req.params.id};
    User.deleteOne(searchQuery)
    .then(user => {
        res.redirect('/show');
    })
    .catch(err => {
        res.redirect('/show');
    });
});

//connect mongoose with localhost:27017
mongoose.connect('mongodb://localhost:27017/UserData');





// Active server at port 3000
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
}) 

