const User = require('../models/user');

module.exports.registeruser = (req, res) => {
    res.render( 'users/register')
}

module.exports.registersuccess = async(req, res, next)=> {
    try {
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeruser = await User.register(user, password);
    req.login(registeruser, err=>{
        if(err) return next(err);
        req.flash('success', 'Welcome to the website');
        res.redirect('/campgrounds');
    })
    }
    catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.loginyo = (req, res) => {
    res.render('users/login');
}

module.exports.loginsucess =  (req, res)=> {
    req.flash('success', 'Welcome to the website');
    res.redirect('/campgrounds');
}

module.exports.logoutyo = (req, res, next) => {
    req.logout(function(err) {
        if (err) {     return next(err);     }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}