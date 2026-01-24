import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, getDb } from './config/database.js';
import missionRoutes from './api/missions.js';
import dataRoutes from './api/data.js';
import pipelineRoutes from './api/pipelines.js';
import learningRoutes from './api/learning.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Welcome to the Upside Down Database World',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/missions', missionRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/pipelines', pipelineRoutes);
app.use('/api/learning', learningRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong in the Upside Down',
    message: err.message 
  });
});

// Start server
async function startServer() {
  try {
    await connectToDatabase();
    console.log('🔮 Connected to the Upside Down Database');
    
    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🔮 STRANGER THINGS MONGO QUEST 🔮                          ║
║                                                              ║
║   Server running on port ${PORT}                               ║
║   The Upside Down awaits...                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
