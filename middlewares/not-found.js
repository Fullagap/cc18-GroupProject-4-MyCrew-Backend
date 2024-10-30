const notFoundHandler = (req,res)=>{
    res.status(400).json({message: "Path not found"})
}

module.exports = notFoundHandler
