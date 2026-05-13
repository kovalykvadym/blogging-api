import express from 'express';
import asyncHandler from '../../utils/async-handler';
import { createPost, deletePost, getPostById, getPosts, updatePost } from './posts.controller';

const router = express.Router();

router.get('/', asyncHandler(getPosts));
router.get('/:id', asyncHandler(getPostById));

router.post('/', asyncHandler(createPost));

router.put('/:id', asyncHandler(updatePost));

router.delete('/:id', asyncHandler(deletePost));

export default router;
