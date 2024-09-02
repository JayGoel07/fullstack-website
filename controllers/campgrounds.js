const { cloudinary } = require('../cloudinary');
const Campground = require('../models/campground');

// we can assume views directory for default 
module.exports.index = async (req, res) => {      //view/campgrounds/index.ejs
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.newform = (req, res) => {        
    res.render('campgrounds/new');
}

module.exports.createcamp = async(req, res) => {      //new ke liye (POST)
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made new');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showcamp = async (req, res) => {    //view/campgrounds/show.ejs
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    if(!campground) {   
        req.flash('error', 'Cannot find that camprgound');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.editcamp = async (req, res) => {    //view/campgrounds/edit folder
    const campground = await Campground.findById(req.params.id)
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updatecamp = async (req, res) => {      //view/campgrounds/edit folder
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }); 
    const imgs = req.files.map(f=>({url: f.path, filename: f.filename}));
    camp.images.push(...imgs);
    await camp.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await camp.updateOne({$pull: {images: {filename : { $in: req.body.deleteImages }}}})
    }
    req.flash('success', 'Successfully updated');
    res.redirect(`/campgrounds/${camp._id}`)
}

module.exports.delcamp =  async (req, res) => {   //simply delete
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}