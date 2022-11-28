const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const articleRoutes = require('./routes/articleRoutes')
const videoRoutes = require('./routes/videoRoutes')
const materialRoutes = require('./routes/materialRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongodb atlas database
mongoose.connect('mongodb://yohanes:yohanes@ac-fbd7i5y-shard-00-00.nugsfru.mongodb.net:27017,ac-fbd7i5y-shard-00-01.nugsfru.mongodb.net:27017,ac-fbd7i5y-shard-00-02.nugsfru.mongodb.net:27017/iconart?ssl=true&replicaSet=atlas-14ixbs-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser:true})
.then(() => {
    console.log("connect to mongodb atlas");
}).catch(error => {
    console.log("Something wrong happened",error);
})

//routes
app.use(userRoutes);
app.use(articleRoutes);
app.use(videoRoutes);
app.use(materialRoutes);
app.use(errorHandler);

// start server
app.listen(PORT, () => {
    console.log("Server started at PORT ",PORT);
})