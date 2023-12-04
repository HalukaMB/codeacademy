const requestCheck=(req)=>{
    let responseCode=500
    if (!(req.body.email).includes("@")){
        responseCode="422"
    }

    return 
}
