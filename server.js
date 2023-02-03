const dotenv = require("dotenv");
dotenv.config({ path: "./Config/.env" });
const connectDB = require("./config/database");
const app = require('./app') 
const port = 8000

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting the server due to UnCaught Exception');
    process.exit(1); // to get exit
})

app.get('/', (req, res) => {
    res.send('E-commerce Server!')
})

connectDB();
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting the server due to UnHandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});


