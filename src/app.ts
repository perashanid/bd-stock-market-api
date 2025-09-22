import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { PriceController } from "./controllers/DseController";
import { GlobalErrorHandler } from "./middlewares/ErrorMiddleware";
import cors from "cors";

useContainer(Container);

const app = express();

// Enhanced CORS configuration for production
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
}));

// Middleware for parsing JSON bodies with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static files from public directory
app.use(express.static('public'));

// API documentation endpoint (JSON format for API clients)
app.get('/api-info', (_req, res) => {
  res.json({
    name: 'Bangladesh Stock Market API',
    version: '1.0.0',
    description: 'Unofficial API for Bangladesh Stock Exchange data',
    endpoints: {
      health: 'GET /health',
      latest: 'GET /v1/dse/latest',
      dsexData: 'GET /v1/dse/dsexdata?symbol=<optional>',
      top30: 'GET /v1/dse/top30',
      historical: 'GET /v1/dse/historical?start=<date>&end=<date>&code=<optional>',
      hello: 'GET /v1/dse/hello'
    },
    documentation: 'Visit the root URL for interactive documentation'
  });
});

// Create Express server with routing-controllers
const expressApp = createExpressServer({
  controllers: [PriceController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

// Use the routing-controllers app as middleware in the express app
app.use(expressApp);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /v1/dse/latest',
      'GET /v1/dse/dsexdata',
      'GET /v1/dse/top30',
      'GET /v1/dse/historical'
    ]
  });
});

// Start the Express server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Bangladesh Stock Market API is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
