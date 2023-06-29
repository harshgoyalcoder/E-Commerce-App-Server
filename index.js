
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute=require("./Routes/user");
const authRoute=require("./Routes/auth");
const productRoute=require("./Routes/product");
const cartRoute=require("./Routes/cart");
const orderRoute=require("./Routes/order");
const stripeRoute=require("./Routes/stripe");
var cors = require('cors')


dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database Connection successful")})
.catch((err)=>{console.log("Error",err)});

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Hare Krishna!");
  });