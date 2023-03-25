import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
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
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/brands', brandsRouter);
app.use('/categories', categoriesRouter);
app.use('/customers', customersRouter);
app.use('/suppliers', suppliersRouter);
app.use('/expenses', expensesRouter);
app.use('/purchases', purchasesRouter);
app.use('/sales', salesRouter);
app.use('/returns', returnsRouter);

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
