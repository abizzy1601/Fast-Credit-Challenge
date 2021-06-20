const router = require('express').Router();
const User = require('../model/users.model');
const authKeys = require('../config')
 
var jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;



router.post('/add_user', async(req, res) => {
    // Variables for the request shoulf follow this naming convention
    const { 
        firstname,
        lastname,
        email,
        phone,
        gender,
        DOB,
        nationality,
        passwordd
        
     } = req.body;
     console.log(req.body)

    // Check if user  exits
    if (
        firstname == '' || 
        firstname == null ||
        lastname == '' ||
        lastname == null ||
        email == '' ||
        email == null ||
        phone == '' ||
        phone == null || 
        gender == '' ||
        gender == '' ||
        DOB == null ||
        DOB == null ||
        nationality == null ||
        nationality == null ||
        passwordd == '' ||
        passwordd == null
    ) {
        res.status(500).json({
            status: false,
            message: 'Fill out all required feilds',
            data: null,
        });
    } else {
        // get the total users object of available users
        var all_users = await User.find({}).then((users) => users).catch(() => null);

        // check user email
        var check_email = await User.findOne({ email: email }).then((user) => user).catch(() => null);

        // check user phone
        var check_phone = await User.findOne({ phone: phone }).then((user) => user).catch(() => null);



        // if email exist
        if (check_email) {
            // If user exists with same email
            res.status(400).json({
                status: false,
                message: 'A user exist with same email',
                data: null,
            });
        }

           // If phone number exists. 
           else if (check_phone) {
            res.status(400).json({
                status: false,
                message: 'A user exists with same number',
                data: null,
            });
        } 
        else {
            var create_new_user = async() => {
                 var doc = await new User({
                    firstname,
                    lastname,
                    email,
                    phone,
                    gender,
                    DOB,
                    nationality,
                     password: bcrypt.hashSync(passwordd, 10),
                
                 }).save({}).then((user) => user).catch(() => {
                     res.status(500).json({
                         status: false,
                         message: 'Error saving user',
                         data: null,
                     });
                 }) 

            if (doc) {
                 
                new User({ 
                    email,
                    user_id: doc._id,   
                    
                   
                }).save({}).then((User) => {  
            

            jwt.sign({ doc, }, authKeys.apiKey, (err, token) => {
                res.status(200).json({
                    status: true,
                    token,
                    user: doc,
                    message: 'Registration Successful',
                });
              });
            }) 
            .catch((err) => console.log(err));
         }
        }
        if (phone == "" || phone == null || phone == undefined) {
            //Create the user
            create_new_user();
 
        } else {
            // mobi
            if (!phone) {
                res.status(400).json({
                    status: false,
                    message: 'null',
                    data: null,
                });
            } else {
                // Create the user
                create_new_user();
            }
        }
    }
}
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('No user found with the id');
    // get by id
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
            
        } else {
            console.log('Error retrieving user: ' + JSON.stringify(err, undefined, 2));
        }
    });
})
// edit user and update
router.put('/user/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update USER with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User with id=" + id
          });
        });
  });


// delete user
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).send('No user found with the id');
    // delete data by id
    User.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
            // res.send('deleted already!!!');
        } else {
            console.log('Error retrieving user: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

// delete multiple  









module.exports = router;  