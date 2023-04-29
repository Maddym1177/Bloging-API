const Blog = require('../Model/Blog')

exports.getBlog = async (req, res) => {
    try {
        const data = await Blog.find()
        return res.json({errors: false, data:data})
    } catch (error) {
        return res.status(404).json({ errors: true, message: error.message})
    }
}

exports.postBlog = async (req, res) => {
    try {
        const newBlog = new Blog(req.body)
        const data = await newBlog.save();
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message });
    }
}


//put
exports.putBlog = async (req,res) =>{
    try {
        const id = req.params.id;
        const data = await Blog.findByIdAndUpdate(id,req.body,{new:true})
        return res.json({errors:false, data:data})
    } catch (error) {
        return res.status(400).json({errors:true, message:error.message})
        
    }
}

//delete
exports.deleteBlog = async (req,res)=>{
    try {
        const data = await Blog.findByIdAndDelete(req.params.id);
        return res.json({errors:false, data:data})

    } catch (error) {
        return res.status(400).json({errors:true, message:error.message})
        
    }
}

