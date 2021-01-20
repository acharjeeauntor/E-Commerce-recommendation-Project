var con = require('../routes/connection')

exports.addFeedBack = (req, res) => {
    var email = req.body.email;
    var feedback = req.body.message;

    console.log(feedback)
 con.query(`INSERT INTO feedback (email,message)
 VALUES ('${email}','${feedback}')`,function(error,result){
    if(error){
        
        return res.status(400).send(error)
    }
    
    return res.status(200).send("Success")
    
})
}
