import express from 'express';

const app = express();

app.use(express.json());
app.use((req, _res, next) => {
  console.log(`Method: ${req.method}\n URL: ${req.originalUrl}`);
  next();
});

app.get('/health', (_req, res) => {
  const result = {
    success: true,
    data: {},
    error: null,
  };

  res.status(200).send(result);
});

export default app;
