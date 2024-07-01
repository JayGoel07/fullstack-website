const express= require('express');
const router = express.Router({mergeParams: true});
// abhi campgrounds/:id/review wali jo hai uska :id access ho jaayega nahi toh dikkat aati 
const Campground = require('../models/campground');
const Review = require('../models/review');

//router.delete('/campgrounds/:id/reviews/:reviewId', async(req, res) => {
router.post('/', async(req,res)=> {
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        campground.reviews.push(review);
        await review.save(); 
        await campground.save();
        req.flash('success', 'Successfully created new review');
        res.redirect(`/campgrounds/${campground._id}`);
})
router.delete('/:reviewId', async(req, res) => {
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
})

module.exports=router;