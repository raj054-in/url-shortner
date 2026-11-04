const sendEmail=async (email) => {
    console.log("job started")

    await  new Promise((resolve, reject) => {
        setTimeout(resolve,5000)
    })
    console.log("job completed")
    
}

export default sendEmail