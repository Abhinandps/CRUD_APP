const path = require('path');
const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const viewRouter = require('./Routes/viewRoutes');
const userRouter = require('./Routes/userRoutes');
const adminRouter = require('./Routes/adminRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cookieParser());

// load static assets
app.use(express.static(path.join(__dirname, 'public')));

// test middleware
// app.use((req, res, next) => {
  // console.log(req.headers)
  // next();
// });

// app.use(addCacheControlHeader);

app.use('/', viewRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);


// app.get('/', (req, res) => {
//   res.send('Welcome');
// });


app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find the ${req.originalUrl} on this server!`,
  });
  next();
});

function addCacheControlHeader(req, res, next) {
  if (!req.user) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  }
  next();
}

module.exports = app;
