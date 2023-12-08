require('dotenv').config()
const express = require('express')
const colors = require('colors')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const AuthRoutes = require('./routes/authRoute')
const categoryRoutes = require('./routes/categoryRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const app = express()

const corsOrigin ={
    origin: ["https://e-commerce-frontend-nine-alpha.vercel.app"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}
app.use(cors(corsOrigin));

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
// app.use('/api/v1/auth',AuthRoutes)
app.use('/auth',AuthRoutes)
app.use('/api/v1/category',categoryRoutes)
// app.use('/api/v1/product',productRoutes)
 app.use('/product',productRoutes)


//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Ecommerce app</h1>")
})

//connect to db
// mongoose.connect(process.env.MONG_URI)
mongoose.connect('mongodb+srv://anujvaid:Anujvaid%402003@e-commerce.ltbpaqk.mongodb.net/?retryWrites=true&w=majority')
// .then(()=>{
//     //listen for requests
//     app.listen(process.env.PORT,()=>{
//         console.log(`connected to db&listening on port ${process.env.PORT}`.bgCyan.white)
//     })

// })
// .catch((err)=>{
//     console.log(`${err}`.bgRed.white)
// })

app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})