function handlerError(name,error){
    return {
        name:name,
        message:'Testing Error From Developer'
    }
}

function handlerResponse(code,res){
    return {
        code:code,
        data:res
    }
}

module.exports = {
    handlerResponse,
    handlerError
}