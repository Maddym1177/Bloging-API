const {getAllUser,postUser,putUser,deleteUser,login} = require('../Controller/userContorller')


const route = require('express').Router()

route.get('/',getAllUser)

route.post('/',postUser)

route.put('/:id',putUser)

route.delete('/:id',deleteUser)

route.post('/login',login)

module.exports = route