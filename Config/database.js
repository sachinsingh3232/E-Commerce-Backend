const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then((res) => {
        console.log("connected");
    }).catch((e) => {
        console.log("not connected");
    })
}
module.exports = connectDB;