// Importing express and cors
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"))


const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

mongoose.connect('mongodb://127.0.0.1:27017/company-axz')



app.post('/employees/login', function (req, res) {
  const accountId = req.body.username;
  const accountPwd = req.body.password;

  // Validate username and password
  Employee.findOne({ emp_num: accountId })
    .then((employee) => {
      if (!employee) {
        return res.status(404).send('Employee not found');
      }

      if (employee.password !== accountPwd) {
        return res.status(401).send('Invalid password');
      }

      // Create and sign a JSON Web Token (JWT)
      const token = jwt.sign(
        { emp_num: employee.emp_num, name: employee.name },
        generateSecretKey,
        { expiresIn: '1h' } // Set the token expiration time
      );

      res.json({ token }); // Return the token to the client
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});



app.get('/employees/:id', function (req, res) {
    const accountId = req.params.id;
    
    Employee.find({emp_num:accountId})
        .then((employee) => {
            if (employee) {
                res.send(employee);
            } else {
                res.status(404).send('Employee not found');
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});



app.post('/employees', async function (req, res) {
    const newAccount = req.body;
    
    try{
        const newEmployee = await Employee.create({
            emp_num: newAccount.id,
            name: newAccount.name,
            surname: newAccount.name,
            email: newAccount.email,
            password: newAccount.password,
            bio: newAccount.bio,
            pic: newAccount.pic,
            birthday:newAccount.birthday,
            position: newAccount.position,
            phone:newAccount.phone
        });
        res.json({status:'Goodly'});
    }
    catch(err){
        console.log(err);
        res.json({status:'Error my god...'});
    }
});


app.patch('/employees/:id', function (req, res) {
    const accountId = req.params.id;
    const newData = req.body;
  
    Employee.findOneAndUpdate({ emp_num: accountId }, newData, { new: true })
      .then((employee) => {
        if (employee) {
          res.send(employee);
        } else {
          res.status(404).send('Employee not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  



  app.delete('/employees/:id', function (req, res) {
    const accountId = req.params.id;
  
    Employee.findOneAndDelete({ emp_num: accountId })
      .then((employee) => {
        if (employee) {
          res.send('Employee deleted successfully');
        } else {
          res.status(404).send('Employee not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});




// Listening to server at port 5000
app.listen(5000, function () {
	console.log("server started...\nClick the url to gain access: http://localhost:5000/");
})
