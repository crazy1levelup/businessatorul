//modules
require('./db/mongoose');
const express = require('express');

//routes
const userRouter = require('./routers/user');
const businessRouter = require('./routers/business');
const pictureRouter = require('./routers/picture');
const reservationRouter = require('./routers/reservation');

//app settings
const app = express();
const port = process.env.PORT //grab production port if found else run on local

app.use(express.json());
app.use(userRouter);
app.use(businessRouter);
app.use(pictureRouter);
app.use(reservationRouter);

app.listen(port, () => {
    console.log("Server is up on port  " + port)
});