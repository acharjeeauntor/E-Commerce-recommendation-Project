
var con = require('../routes/connection')

exports.searchResult = (req, res) => {
    var pName = req.body.name;
    var name = pName.replace(/\s/g, "").toLowerCase()
    var SubName = name.toString().substring(0,3)

 con.query(`SELECT products.product_name,product_info.website_name,
 product_info.price,product_info.review,product_info.rating,
 product_info.Product_url,product_info.product_image_url 
FROM product_info
 JOIN products ON products.product_id =product_info.product_id
WHERE LOWER(REPLACE(products.product_name,' ','')) LIKE "${name}" 
 OR  LOWER(REPLACE(products.product_name,' ','')) LIKE "%${name}%" OR 
 LOWER(REPLACE(products.product_name,' ','')) LIKE 
  "%${SubName}%" ORDER BY product_info.rating DESC,product_info.price
`,function(error,result){
    console.log(result.length)
    if(error){
        console.log('Error Occure')
        res.status(500).send(error)
    }else{
        return res.status(200).send(result)
    }

   
})
}


//This is Get Data From Database without Store Procedure

exports.getProduct = (req, res) => {
con.query(`SELECT product_name FROM products`,function(error,result){
    
    console.log(result.length)
    
    if(error){
        console.log('Error Occure')
        return res.status(500).send(error)
    }else{
        return res.status(200).send(result)
    }
})
}

//This is Get Data From Database using Store Procedure

// exports.getProduct = (req, res) => {
// con.query(`CALL ProductName()`,function(error,result){
//     if(error){
//         console.log('Error Occure')
//         return res.send(error)
//     }else{
//         return res.status(200).send(result)
//     }
// })
// }