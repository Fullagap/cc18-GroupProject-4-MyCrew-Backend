const createError = (statuscode, message)=>{
    const error = new Error(message)
    error.statuscode = statuscode
    throw error
}

module.exports = createError