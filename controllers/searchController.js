
var con = require('../routes/connection')

exports.searchResult = (req, res) => {
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3


// SELECT iteminfo.item_name,
//   testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
//   JOIN testdb ON testdb.item_id = iteminfo.item_id
//   JOIN websites ON websites.websiteID = testdb.websiteID
//   WHERE iteminfo.item_name LIKE '%konkaac'
//  ORDER BY price, rating DESC LIMIT 0,3

 con.query(`SELECT iteminfo.item_name,
 testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
 JOIN testdb ON testdb.item_id = iteminfo.item_id
 JOIN websites ON websites.websiteID = testdb.websiteID
 WHERE iteminfo.item_name LIKE "%${name}%"
ORDER BY price, rating DESC LIMIT 0,3`,function(error,result){

    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(result.length==0){

       // select * from testdb where LOWER(product_name) LIKE "%${SubName}%" ORDER BY price, rating DESC LIMIT 0,3
       //select * from testdb where Catagory LIKE "%${category}" AND LOWER(product_name) LIKE "%${SubName}%" ORDER BY price, rating DESC LIMIT 0,3




// SELECT iteminfo.item_name,
//   testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
//   JOIN testdb ON testdb.item_id = iteminfo.item_id
//   JOIN websites ON websites.websiteID = testdb.websiteID
//   WHERE iteminfo.item_name LIKE '%konkaac'
//  ORDER BY price, rating DESC LIMIT 0,3

        con.query(`SELECT iteminfo.item_name,
        testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
        JOIN testdb ON testdb.item_id = iteminfo.item_id
        JOIN websites ON websites.websiteID = testdb.websiteID
        WHERE iteminfo.item_name LIKE "%${SubName}%"
       ORDER BY price, rating DESC LIMIT 0,3`,function(error,result){
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

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

// con.query(`select * from testdb where LOWER(product_name) LIKE "%${LName}" ORDER BY rating DESC LIMIT 0,3`,function(error,result){

    // SELECT iteminfo.item_name,
    // testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    // JOIN testdb ON testdb.item_id = iteminfo.item_id
    // JOIN websites ON websites.websiteID = testdb.websiteID
    // WHERE iteminfo.item_name LIKE '%konkaac'
    // ORDER BY rating DESC LIMIT 0,3

    con.query(` SELECT iteminfo.item_name,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE iteminfo.item_name LIKE "%${name}"
    ORDER BY rating DESC LIMIT 0,3`,function(error,result){
   
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

//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3


// SELECT iteminfo.item_name,
// testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
// JOIN testdb ON testdb.item_id = iteminfo.item_id
// JOIN websites ON websites.websiteID = testdb.websiteID
// WHERE iteminfo.item_name LIKE '%konkaac'
// ORDER BY price LIMIT 0,3


con.query(`SELECT iteminfo.item_name,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE iteminfo.item_name LIKE "%${name}"
ORDER BY price LIMIT 0,3`,function(error,result){
   
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
    var price = req.body.price
    var rating = req.body.rating

    console.log(price)
    console.log(rating)
//select * from testdb where Catagory LIKE "%${category}" AND product_name LIKE "%${pName}" ORDER BY price, rating DESC LIMIT 0,3

con.query(`SELECT iteminfo.item_name,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE iteminfo.item_name LIKE "%${name}"
AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC
LIMIT 0,3`,function(error,result){
    
//     SELECT iteminfo.item_name,
//     testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
//     JOIN testdb ON testdb.item_id = iteminfo.item_id
//     JOIN websites ON websites.websiteID = testdb.websiteID
//     WHERE iteminfo.item_name LIKE "%${LName}"
//    AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC
//    LIMIT 0,3


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

    // SELECT c_name FROM category;

con.query(`SELECT c_name FROM category`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}