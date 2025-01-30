import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true},{limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())


// routes import
import userRouter from './routes/user.routes.js'
import reviewRouter from './routes/review.routes.js'
// import PaymentsRouter from './routes/payments.routes.js'
// import notificationRouter from './routes/notification.routes.js'
// import bookingRouter from './routes/booking.routes.js'
import bikeRouter from './routes/bike.routes.js'




// routes decleration
app.use('/api/v1/user', userRouter)
app.use('/api/v1/review',reviewRouter)
// app.use('/api/v1/payments',PaymentsRouter)
// app.use('/api/v1/notification',notificationRouter)
// app.use('/api/v1/booking',bookingRouter)
app.use('/api/v1/bike',bikeRouter)




//& our api will be like this 
//^ http://localhost:8000/api/v1/user/register
//^ http://localhost:8000/api/v1/user/login
//^ http://localhost:8000/api/v1/user/logout
//^ http://localhost:8000/api/v1/bike/register
//^ http://localhost:8000/api/v1/bike/get-all-bike
//^ http://localhost:8000/api/v1/bike/searched
//^ http://localhost:8000/api/v1/bike/bike/:id
//^ http://localhost:8000/api/v1/review/:id
//^ 

export default app