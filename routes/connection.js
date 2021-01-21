var mysql = require('mysql')

// var pool = mysql.createPool(
//     {
//         host:'sql104.epizy.com',
//         user:'epiz_27081209',
//         password:'summersoldier',
//         database:'epiz_27081209_product_data',
//         multipleStatements:true
//     }
// )



const con = mysql.createConnection({
  host:'localhost',
        user:'root',
        password:'',
        database:'ecommerce_products',
});
  
con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});
 


module.exports = con