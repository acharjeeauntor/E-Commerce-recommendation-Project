
var con = require('../routes/connection')

exports.searchResult = (req, res) => {
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)

 con.query(`SELECT iteminfo.item_name,websites.site_image_url,
 testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
 JOIN category ON iteminfo.category_id = category.c_id
 JOIN testdb ON testdb.item_id = iteminfo.item_id
 JOIN websites ON websites.websiteID = testdb.websiteID
 WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "${name}" AND category.categoryname ="${category}"
ORDER BY rating DESC,price`,function(error,preResult){

    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,websites.site_image_url,
        testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
        JOIN category ON iteminfo.category_id = category.c_id
        JOIN testdb ON testdb.item_id = iteminfo.item_id
        JOIN websites ON websites.websiteID = testdb.websiteID
        WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "%${SubName}%" AND category.categoryname ="${category}"
       ORDER BY rating DESC,price`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                return res.status(200).send(result)
                   }
        })
    }else{
        console.log("main call")
        return res.status(200).send(preResult)
    }

   
})
}


exports.searchResultByRating = (req, res) => {
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)


    con.query(`SELECT iteminfo.item_name,category.categoryname,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN category ON iteminfo.category_id = category.c_id
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "${name}" AND category.categoryname ="${category}"
    ORDER BY rating DESC`,function(error,preResult){
   
    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,category.categoryname,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN category ON iteminfo.category_id = category.c_id
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "%${SubName}%" AND category.categoryname ="${category}"
    ORDER BY rating DESC`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                return res.status(200).send(result)
                   }
        })
    }
    else{
        return res.status(200).send(preResult)
    }
})
}



exports.searchResultByPrice = (req, res) => {
    var category = req.body.ctg;
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,4)


    con.query(`SELECT iteminfo.item_name,category.categoryname,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN category ON iteminfo.category_id = category.c_id
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "${name}" AND category.categoryname ="${category}"
    ORDER BY price`,function(error,preResult){
   
    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,category.categoryname,
    testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
    JOIN category ON iteminfo.category_id = category.c_id
    JOIN testdb ON testdb.item_id = iteminfo.item_id
    JOIN websites ON websites.websiteID = testdb.websiteID
    WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "%${SubName}%" AND category.categoryname ="${category}"
    ORDER BY price`,function(error,result){
            if(error){
                console.log('Error Occure')
                res.send(error)
            }else{
                console.log("sub call")
                return res.status(200).send(result)
                   }
        })
    }
    else{
        return res.status(200).send(preResult)
    }
})
}







exports.filterResultByPriceAndRating = (req, res) => {
    var category = req.body.ctg
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var price = req.body.price
    var rating = req.body.rating
    var SubName = name.toString().substring(0,4)

    console.log(price)
    console.log(rating)

con.query(`SELECT iteminfo.item_name,category.categoryname,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN category ON iteminfo.category_id = category.c_id
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "${name}" AND category.categoryname ="${category}"
AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC`,function(error,preResult){


    console.log(preResult.length)
    
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else if(preResult.length==0){
        con.query(`SELECT iteminfo.item_name,category.categoryname,
testdb.price,testdb.rating,testdb.Product_url,websites.site FROM iteminfo 
JOIN category ON iteminfo.category_id = category.c_id
JOIN testdb ON testdb.item_id = iteminfo.item_id
JOIN websites ON websites.websiteID = testdb.websiteID
WHERE LOWER(REPLACE(iteminfo.item_name,' ','')) LIKE "%${SubName}%" AND category.categoryname ="${category}"
AND (price <= ${price} AND rating<= ${rating}) ORDER BY price,rating DESC`,function(error,result){
    if(error){
        console.log('Error Occure')
        res.send(error)
    }else{
        console.log("sub call")
        return res.status(200).send(result)
           }
})
}
else{
    return res.status(200).send(preResult)
}
})
}




exports.getCatagory = (req, res) => {
con.query(`SELECT categoryname FROM category`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        return res.send(error)
    }else{
        //res.send(result)
        return res.status(200).send(result)
    }
})
}



exports.getProduct = (req, res) => {
con.query(`SELECT item_name FROM iteminfo`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        return res.send(error)
    }else{
        return res.status(200).send(result)
    }
})
}

exports.getProductBycategory = (req, res) => {
    var category = req.body.ctg;
    con.query(`SELECT iteminfo.item_name FROM iteminfo
    JOIN category ON iteminfo.category_id = category.c_id
    WHERE category.categoryname ="${category}" `,function(error,result){
        
        console.log(result.length)
        
        if(error){
            console.log('Error Occure')
            return res.send(error)
        }else{
            return res.status(200).send(result)
        }
    })
    }