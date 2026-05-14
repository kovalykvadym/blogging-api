import express from 'express';
import errorHandler from '../middleware/errors/error-handler.middleware';
import postsRoutes from '../modules/posts/posts.routes';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  const result = {
    success: true,
    data: {},
    error: null,
  };

  res.status(200).send(result);
});

app.use('/posts', postsRoutes);

app.use(errorHandler);

export default app;
