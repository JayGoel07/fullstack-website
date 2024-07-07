const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.makereview = async(req,res)=> {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save(); 
    await campground.save();
    req.flash('success', 'Successfully created new review');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.updaterev= async(req, res) => {
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}