const express= require('express');
const router = express.Router();                   //Router helps to combine the things 

const {isLoggedin} = require('../middleware');
const {storage} = require('../cloudinary');
const campgrounds = require('../controllers/campgrounds');

const multer  = require('multer');                         //multer is required to store 'files' (images)
const upload = multer({storage});         // now all image files get stored to cloudinary rather to terminal as thye are very large 

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedin, upload.array('image'),campgrounds.createcamp)

router.get('/new', isLoggedin, campgrounds.newform)

router.route('/:id')
    .get(campgrounds.showcamp)
    .put(isLoggedin, upload.array('image'), campgrounds.updatecamp)
    .delete(isLoggedin, campgrounds.delcamp)

router.get('/:id/edit', isLoggedin, campgrounds.editcamp)

module.exports=router;