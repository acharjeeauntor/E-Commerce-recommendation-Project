
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
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var LName=pName.toLowerCase()
    var SubName = LName.toString().substring(0,2)

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

 con.query(`select * from testdb where LOWER(product_name) LIKE "%${LName}" ORDER BY price, rating DESC LIMIT 0,3`,function(error,result){

    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(result.length==0){

       // select * from testdb where LOWER(product_name) LIKE "%${SubName}%" ORDER BY price, rating DESC LIMIT 0,3
       //select * from testdb where Catagory LIKE "%${category}" AND LOWER(product_name) LIKE "%${SubName}%" ORDER BY price, rating DESC LIMIT 0,3

        con.query(`select * from testdb where LOWER(product_name) LIKE "%${SubName}%" ORDER BY price, rating DESC LIMIT 0,3`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                res.send(result)
                   }
        })
    }else{
        console.log("main call")
 res.send(result)
    }

   
})
}


exports.searchResultByRating = (req, res) => {
    //var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var LName=pName.toLowerCase()

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

con.query(`select * from testdb where LOWER(product_name) LIKE "%${LName}" ORDER BY rating DESC LIMIT 0,3`,function(error,result){
   
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}



exports.searchResultByPrice = (req, res) => {
    //var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var LName=pName.toLowerCase()

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

con.query(`select * from testdb where LOWER(product_name) LIKE "%${LName}" ORDER BY price LIMIT 0,3`,function(error,result){
   
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}







exports.filterResultByPriceAndRating = (req, res) => {
    //var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var LName=pName.toLowerCase()
    var price = req.body.price
    var rating = req.body.rating

    console.log(price)
    console.log(rating)
//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

con.query(`SELECT * FROM testdb WHERE LOWER(product_name) LIKE "%${LName}" AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC LIMIT 0,3`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}




exports.getCatagory = (req, res) => {
con.query(`SELECT DISTINCT(Catagory) FROM testdb`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}