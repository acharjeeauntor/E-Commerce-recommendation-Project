
var con = require('../routes/connection')

exports.searchResult = (req, res) => {
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)

 con.query(`CALL prodSearch("${name}");`,function(error,preResult){

    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,
        testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
        JOIN testdb ON testdb.item_id = iteminfo.item_id
        JOIN websites ON websites.websiteID = testdb.websiteID
        WHERE iteminfo.item_name LIKE "%${SubName}%"
       ORDER BY rating DESC,price`,function(error,result){
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
 res.send(preResult)
    }

   
})
}


exports.searchResultByRating = (req, res) => {
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)


    con.query(`SELECT iteminfo.item_name,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE iteminfo.item_name LIKE "${name}"
    ORDER BY rating DESC`,function(error,preResult){
   
    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE iteminfo.item_name LIKE "%${SubName}%"
    ORDER BY rating DESC`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                res.send(result)
                   }
        })
    }
    else{
        res.send(preResult)
    }
})
}



exports.searchResultByPrice = (req, res) => {
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)


    con.query(`SELECT iteminfo.item_name,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE iteminfo.item_name LIKE "${name}"
    ORDER BY price`,function(error,preResult){
   
    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE iteminfo.item_name LIKE "%${SubName}%"
    ORDER BY price`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                res.send(result)
                   }
        })
    }
    else{
        res.send(preResult)
    }
})
}







exports.filterResultByPriceAndRating = (req, res) => {
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var price = req.body.price
    var rating = req.body.rating
    var SubName = name.toString().substring(0,4)

    console.log(price)
    console.log(rating)

con.query(`SELECT iteminfo.item_name,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE iteminfo.item_name LIKE "${name}"
AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC`,function(error,preResult){


    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE iteminfo.item_name LIKE "%${SubName}%"
AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC`,function(error,result){
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        console.log("sub call")
        res.send(result)
           }
})
}
else{
    res.send(preResult)
}
})
}




exports.getCatagory = (req, res) => {
con.query(`CALL ProcedureCategory()`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}



exports.getProduct = (req, res) => {
con.query(`CALL ProcedureGetProduct()`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        res.send(result)
    }
})
}