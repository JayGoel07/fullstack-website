const express= require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const {isLoggedin} = require('../middleware')

router.get('/', async (req, res) => {      //view/campgrounds/index.ejs
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});
router.get('/new', isLoggedin, (req, res) => {        //view/campgrounds/new.ejs
    res.render('campgrounds/new');
})

router.post('/', isLoggedin, async(req, res) => {      //new ke liye (POST)
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made new');
    res.redirect(`/campgrounds/${campground._id}`)
})

router.get('/:id', async (req, res) => {    //view/campgrounds/show.ejs
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground) {
        req.flash('error', 'Cannot find that camprgound');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
});

router.get('/:id/edit',isLoggedin,  async (req, res) => {    //view/campgrounds/edit folder
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
})

router.put('/:id', async (req, res) => {      //view/campgrounds/edit folder
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });   // ID, actual query to update 
    req.flash('success', 'Successfully updated');
    res.redirect(`/campgrounds/${campground._id}`)
});

router.delete('/:id',isLoggedin,  async (req, res) => {   //simply delete
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
})

module.exports=router;