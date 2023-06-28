// Importing express and cors
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"))

mongoose.connect('mongodb://localhost:27017/company-axz')



// Handling GET /employees Request
app.get('/employees', function (req, res) {


});


// Handling GET /employees/id Request
app.get('/employees/:id', function (req, res) {
    const accountId = req.params.id;
    

});


app.post('/employees', async function (req, res) {
    const newAccount = req.body;
    console.log(newAccount);

    try{
        const newUser = await User.create({
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email,
            password: newAccount.password,
            bio: newAccount.bio,
            pic: newAccount.pic,
            birthday:newAccount.birthday,
            position: newAccount.position,
            phone:newAccount.phone
        })
        res.json({status:'Goodly'});
    }
    catch(err){
        res.json({status:'Error my god'});
    }
});


app.patch('/employees/:id', function (req, res) {
    const accountId = req.params.id;
    const newData = req.body;

});



app.delete('/employees/:id', function (req, res) {
    const accountId = req.params.id;


});



// Listening to server at port 5000
app.listen(5000, function () {
	console.log("server started...\nClick the url to gain access: http://localhost:5000/");
})
