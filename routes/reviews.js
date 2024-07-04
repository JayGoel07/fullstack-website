const express= require('express');
const router = express.Router({mergeParams: true});       // abhi campgrounds/:id/review wali jo hai uska :id access ho jaayega nahi toh dikkat aati 
const rev = require('../controllers/review');

router.post('/', rev.makereview)  //controller   

router.delete('/:reviewId', rev.updaterev)

module.exports=router;