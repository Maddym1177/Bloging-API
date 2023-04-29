//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoute = require('./Routers/blogRoute');
const userRoute = require('./Routers/userRoute')

require('dotenv/config')


//initilization
const app = express()

//middelware
app.use(express.json())
app.use(cors())

//default route
app.get('/' , (req, res) => {
    res.send("Working");
})

app.use('/api/blog' ,blogRoute)
app.use('/api/user' ,userRoute)

app.listen(process.env.PORT)

async function main(){
    const res = await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    const data = await res.default
    const response = data.STATES['1']
    console.log(response);
}

main()