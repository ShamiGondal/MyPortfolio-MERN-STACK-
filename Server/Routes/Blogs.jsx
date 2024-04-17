// routes.js
const express = require('express');
const router = express.Router();
const Blog = require('../Models/BlogSchema.js');
const slugify = require('slugify');


router.post('/addBlog', async (req, res) => {
  try {
    const BlogData = req.body;
    BlogData.slug = slugify(BlogData.title, { lower: true });
  

    // Create a new Blog instance with the submitted data
    const blog = new Blog(BlogData);

    // Save the Blog to the database
    await blog.save();
    res.status(201).json({ message: 'Blog added successfully' });
  } catch (error) {
    console.error('Error storing Blog:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getBlogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching Blogs:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.put('/updateBlog/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);
      
      // If the blog post doesn't exist, return a 404 error
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Extract the updated data from the request body
      const updatedBlogData = req.body;
  
      // Update the blog post with the new data
      Object.assign(blog, updatedBlogData);
  
      // Save the updated blog post
      await blog.save();
  
      // Return a success message
      res.status(200).json({ message: 'Blog updated successfully', updatedBlog: blog });
    } catch (error) {
      // Handle errors
      console.error('Error updating blog:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

module.exports = router;