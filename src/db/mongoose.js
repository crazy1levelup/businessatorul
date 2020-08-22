const mongoose = require('mongoose');
//connect to database with url from ../config/dev.env using dev-env dependency
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})