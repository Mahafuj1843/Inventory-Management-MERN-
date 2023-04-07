import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'
import brandsRouter from './routes/brands.js'
import categoriesRouter from './routes/categories.js'
import customersRouter from './routes/customers.js'
import suppliersRouter from './routes/suppliers.js'
import expensesRouter from './routes/expenses.js'
import purchasesRouter from './routes/purchases.js'
import salesRouter from './routes/sales.js'
import returnsRouter from './routes/returns.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

mongoose.set('strictQuery', false);

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connect to MongoDB.")
      } catch (error) {
        throw error
      }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/customers', customersRouter);
app.use('/api/suppliers', suppliersRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/sales', salesRouter);
app.use('/api/returns', returnsRouter);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something wents wrong."
  return res.status(errorStatus).json({
    success : false,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack,
  });
});

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.")
})
