require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const cloudinary = require('cloudinary').v2
const fileupload = require('express-fileupload')
const PORT = process.env.PORT || 3030
const authRouter = require('./Routes/authRouter')
const storyRouter = require('./Routes/storyRouter')
const auth = require('./Midware/authentication')



//cloudinary config functions
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//middleware
app.use(fileupload ({ useTempFiles: true}))
app.use(express.json());
app.use(cors())

//routes
app.get('/api', (req, res) => {
    res.send('WELCOME TO POST IT API')
})
app.use('/api', authRouter)
app.use('/api',auth, storyRouter)


//error routes
app.use((req,res) =>{
    res.status(404).json({ message: "Resource no found"});
});

//db Connection 

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "POSTITDB"
        });
        app.listen(PORT, () => {
            console.log(`server running on port : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    };
};

startServer();