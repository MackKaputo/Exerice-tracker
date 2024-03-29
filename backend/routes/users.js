const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()   //returns a promise with all the users in the db
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username

    const newUser = new User({username})
    console.log("Adding a user")
    newUser.save()
        .then(() => {
            console.log(`A user ${username} has been saved`)
            res.json('The User has been added!')
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router