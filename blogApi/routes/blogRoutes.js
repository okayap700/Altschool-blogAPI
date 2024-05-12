const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate } = require('../middlewares/authMiddleware');


router.get('/blogs', authenticate, blogController.getBlogs); // must be logged in to view blogs
//router.get('/blogs', blogController.getBlogs); // don't need to be logged in to view blog
router.get('/blogs/:id', authenticate, blogController.getBlogById);
router.post('/blogs', authenticate, blogController.createBlog);
router.put('/blogs/:id', authenticate, blogController.updateBlog);
router.delete('/blogs/:id', authenticate, blogController.deleteBlog);

module.exports = router;
