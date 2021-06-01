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

blogsRouter.get('/:id', async (req, res, next) => {});

blogsRouter.put('/:id', async (req, res, next) => {});

blogsRouter.delete('/:id', async (req, res, next) => {});
