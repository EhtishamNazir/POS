const express = require('express');
const dbConnect = require('./dbConnect.js');
const itemsRoute = require('./routes/itemsRoute');
const usersRoute = require('./routes/userRoute');
const billsRoute = require('./routes/billRoute');

const app = express();

app.use(express.json());

app.use("/api/items/", itemsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bills/", billsRoute);

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));
    app.get('*', ((req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    }))
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at " + port);
});

