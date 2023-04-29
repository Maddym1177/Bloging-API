const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//Getall
exports.getAllUser = async (req, res) => {
    try {
        const data = await User.find();
        return res.json({errors:false,data:data});
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message});
    }
}


exports.postUser = async (req, res) => {
    try {
        const userExists = await User.findOne({email:req.body.email});
        if (userExists) return res.status(400).json({errors:true, message:'User Already exists'})

        //password encription
        const salt = await bcrypt.genSalt(10)

        req.body.password = await bcrypt.hash(req.body.password,salt)  // vale ia going

        const newUser = new User(req.body)
        const data = await newUser.save()
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}


//put
exports.putUser = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await User.findByIdAndUpdate(id,req.body,{new:true})
        return res.json({errors:false, data:data})
    } catch (error) {
        return res.status(400).json({errors:true, message:error.message})
        
    }
}

//delete
exports.deleteUser = async (req,res)=>{
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        return res.json({errors:false, data:data})

    } catch (error) {
        return res.status(400).json({errors:true, message:error.message})
        
    }
}


exports.login =  async (req, res) => {
    try {

        //user exist or not
        const userExists = await User.findOne({email:req.body.email});
        if (!userExists) return res.status(400).json({errors:true, message:'Email or Password Invalid'})

        //password check
        const checkPassword = await bcrypt.compare(req.body.password, userExists.password)
        if (!checkPassword) return res.status(400).json({errors:true, message:'Email or Password Invalid'})


        const token = await jwt.sign({_id:userExists._id},process.env.SEC)
        
        return res.json({ errors: false, data: {token: token,user:userExists} })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}