require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const createError = require('http-errors')
const app = express();
const helmet = require("helmet");
const xss = require('xss-clean');

const productsRouter = require('./src/routes/products')
const categoryRouter = require('./src/routes/category')
const detTransRouter = require('./src/routes/detailtransactions')
const paymentRouter = require('./src/routes/payment')
const transactionsRouter = require('./src/routes/transactions')

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(xss());

app.use('/products', productsRouter)
app.use('/category', categoryRouter)
app.use('/transactions', transactionsRouter)
app.use('/payment', paymentRouter)
app.use('/detailtransactions', detTransRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err,req,res)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})

const host = process.env.DB_HOST;
const port = process.env.PORT;
app.listen(8080, () => {
  console.log(`server running on http://${host}:${port}`)
})