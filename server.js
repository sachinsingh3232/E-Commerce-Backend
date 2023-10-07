const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./Config/database')
dotenv.config({ path: './Config/.env' })
const app = express();
const port = process.env.PORT;
const userRoute = require('./Routes/userRoute')
const orderRoute = require('./Routes/orderRoute')
const productRoute = require('./Routes/productRoute')
const cartRoute = require('./Routes/cartRoute')
const cookieParser = require('cookie-parser');


connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})