if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}                                  //sab kuch cloudinary mai jaayega with the help of .env file 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');  //edit ke liye 
const ejsMate = require('ejs-mate');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const flash = require('connect-flash');
const passport= require('passport');
const passportlocal = require('passport-local');
const helmet = require('helmet');

const User=require('./models/user');
const campgroundRoutes= require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/yelp-camp';


async function main() {
    try {
        await mongoose.connect(url);
        console.log('Connected successfully to server');
    } catch (error) {
        console.error('Connection error:', error);
    }
}
main();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));   //new - POST ke liye chahiye 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))   //in boilerplates .. public/hello 
app.use(mongoSanitize())   //for security issues 
app.use(helmet({ contentSecurityPolicy : false}));
const sessionconfig = {
    name:'blah',  //nam of cokie
    secret:'thisissecret',resave:false, saveUninitialized:true, 
    cookie: {
        expires: Date.now()+1000*60*60*24*7,
        maxAge :  1000*60*60*24*7
    }
 }
app.use(session(sessionconfig))
app.use(flash());
app.use(passport.initialize());      // take help from links shared
app.use(passport.session());         //for persesitent login sessions  [make sure session is used before passport.session]
passport.use(new passportlocal(User.authenticate()));  // passport uses passport-local and authenticates user itself
passport.serializeUser(User.serializeUser());      // [GO TO PASSPORT UDEMY]
passport.deserializeUser(User.deserializeUser());    // yeh methods plugin ki vajah se aaye 

app.use((req,res,next) => {
    res.locals.currentUser = req.user;   //for lofin/register/singup
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/makeuser', async(req,res) => {
    const user = new User({email: 'jay@1.com', username:'ajy'});
    const u= await User.register(user, 'chicken'); //chicken : password , hash ho jaayega 
    res.send(u);

})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);    // /campgrounds already hoga router mai ab
app.use('/campgrounds/:id/reviews', reviewRoutes);   

app.get('/', (req, res) => {     //Home page in views/home.ejs with its css file in public/stylesheets/home.css
    res.render('home')
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});



// node app.js to run the file in terminal 