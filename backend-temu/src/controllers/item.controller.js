import { pool } from '../db.js';
// import bcrypt from 'bcrypt';
const app = express()
const products = [
    {
        product_id:1,
        product_name:"chanclas",
        description: "comodas",
        price: 100,
        stock_quantity:200,
        category_id:23,
        image: "img.png",
    },
]

app.get("/",(req,res) => { 
    res.send(products);
})