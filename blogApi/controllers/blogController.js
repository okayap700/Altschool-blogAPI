const Blog = require('../models/Blog');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');


exports.getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { timestamp: -1 },
    };

    const blogs = await Blog.paginate({ state: 'published' }, options);
    res.json(blogs);
  } catch (err) {
    logger.error(`Error in getBlogs: ${err.message}`);
    res.status(500).send('Server Error');
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }


    blog.readCount += 1;
    await blog.save();


    res.json({ blog, author: await User.findById(blog.author) });
  } catch (err) {
    logger.error(`Error in getBlogById: ${err.message}`);
    res.status(500).send('Server Error');
  }
};


exports.createBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tags, body } = req.body;

    const blog = new Blog({
      title,
      description,
      tags,
      body,
      author: req.user.id,
    });

    await blog.save();
    res.status(201).json({ msg: 'Blog created successfully', blog });
  } catch (err) {
    logger.error(`Error in createBlog: ${err.message}`);
    res.status(500).send('Server Error');
  }
};


exports.updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { title, description, tags, body } = req.body;


    let blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }


    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    blog.title = title;
    blog.description = description;
    blog.tags = tags;
    blog.body = body;

    await blog.save();
    res.json({ msg: 'Blog updated successfully', blog });
  } catch (err) {
    logger.error(`Error in updateBlog: ${err.message}`);
    res.status(500).send('Server Error');
  }
};


exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;

    let blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }


    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }


    await blog.remove();
    res.json({ msg: 'Blog deleted successfully' });
  } catch (err) {
    logger.error(`Error in deleteBlog: ${err.message}`);
    res.status(500).send('Server Error');
  }
};
