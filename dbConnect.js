const mongoose = require('mongoose');

const URL = 'mongodb+srv://admin-ehtisham:Shani_321@cluster0.9n9ir.mongodb.net/pos';

mongoose.connect(URL);

let connectionObj = mongoose.connection

connectionObj.on("connected", () => {
    console.log("Mongo DB Connection Successfull");
});

connectionObj.on("error", () => {
    console.log("Something went wrong");
})