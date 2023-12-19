var createError = require('http-errors') 
var express = require('express') 
var path = require('path') 
var cookieParser = require('cookie-parser') 
var logger = require('morgan')
var cors = require('cors')

const dbConfig = require('./db')


var indexRouter = require('./routes/index') 
var usersRouter = require('./routes/users') 
var roomsRouter = require('./routes/roomRoute')
var singleRoomsRouter = require('./routes/roomGet')
var registerUserRouter = require('./routes/register')
var getUserRouter = require('./routes/getUser')
var bookingRouter = require('./routes/bookRoute')
var userBookingsRouter = require('./routes/getUserBookings')
var cancelBookingsRouter = require('./routes/cancelBookings')
var submitReviewRouter = require('./routes/submitReview')
var getAllBookingsRouter = require('./routes/getBookings')
var addRoomsRouter = require('./routes/AddRoom')
var addEmployeeRouter = require('./routes/AddEmployee')
var getEmployeeRouter = require('./routes/getEmployees')

var app = express() 

// view engine setup
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'jade') 

app.use(logger('dev')) 
app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(cookieParser()) 
app.use(express.static(path.join(__dirname, 'public'))) 

/*Routes for the app*/
app.use('/', indexRouter) 
app.use('/users', usersRouter) 
app.use('/getRooms', roomsRouter) 
app.use('/getRoomById', singleRoomsRouter)
app.use('/register', registerUserRouter)  
app.use('/login', getUserRouter)  
app.use('/getUserBooking', userBookingsRouter)  
app.use('/postBooking', bookingRouter)  
app.use('/cancelBookings', cancelBookingsRouter)  
app.use('/submitReview', submitReviewRouter)  
app.use('/getAllBookings', getAllBookingsRouter)  
app.use('/addRooms', addRoomsRouter)  
app.use('/addEmployee', addEmployeeRouter)  
app.use('/getEmployee', getEmployeeRouter)  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)) 
}) 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message 
  res.locals.error = req.app.get('env') === 'development' ? err : {} 

  // render the error page
  res.status(err.status || 500) 
  res.render('error') 
}) 

module.exports = app 
