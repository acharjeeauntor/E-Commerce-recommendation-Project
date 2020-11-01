
var con = require('../routes/connection')

//exports.searchResult = (req, res) => {
    // var category = req.body.ctg;
    // var pName = req.body.name;

// pool.query('select * from admin',function(error,result){
//     if(error){
//         console.log('Error Occure')
//         res.send(error)
//     }else{
//         res.send(result)
//     }
// })
//}


exports.searchResult = (req, res) => {
    //var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

con.query(`select * from testdb where product_name LIKE "%${name}" ORDER BY price, rating DESC LIMIT 0,3`,function(error,result){
   
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}