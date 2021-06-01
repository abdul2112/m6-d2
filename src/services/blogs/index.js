import express from 'express';
import createError from 'http-errors';
import BlogModel from './schema.js';

const blogsRouter = express.Router();

export default blogsRouter;

blogsRouter.post('/', async (req, res, next) => {
  try {
    const newBlog = new BlogModel(req.body);
    console.log(req.body);

    const { _id } = await newBlog.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      next(createError(400, error));
    } else {
      next(createError(500, 'An error occurred while saving this blog'));
    }
  }
});

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while getting blogs'));
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await BlogModel.findById(id);
    if (blog) {
      res.send(blog);
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while getting blog'));
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (blog) {
      res.send(blog);
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while updating blog'));
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id);
    if (blog) {
      res.send('Blog has been DELETED');
      // res.status(204).send('Media has been DELETED');
    } else {
      next(createError(404, `blog ${req.params.id} not found`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred while deleting blog'));
  }
});
