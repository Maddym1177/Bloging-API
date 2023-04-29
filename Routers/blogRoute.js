const { getBlog ,postBlog , putBlog , deleteBlog } = require('../Controller/blogController');
const auth = require('../MiddelWare/auth');

const route = require('express').Router()

route.get('/',getBlog)

route.post('/',postBlog)

route.put('/:id' , putBlog)

route.delete('/:id' , deleteBlog)


module.exports = route