import { Router } from 'express';
import { getDb } from '../config/database.js';

const router = Router();

// Get collection data with pagination
router.get('/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const { page = 1, limit = 20, sort, filter } = req.query;
    
    const validCollections = ['characters', 'locations', 'creatures', 'sightings', 'status_reports', 'events'];
    
    if (!validCollections.includes(collection)) {
      return res.status(400).json({ error: 'Invalid collection name' });
    }

    const db = getDb();
    const coll = db.collection(collection);

    // Build query
    let query = {};
    if (filter) {
      try {
        query = JSON.parse(filter);
      } catch (e) {
        // Ignore invalid JSON
      }
    }

    // Build sort
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOption[field] = order === 'desc' ? -1 : 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [data, totalCount] = await Promise.all([
      coll.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      coll.countDocuments(query)
    ]);

    res.json({
      collection,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Data fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Get single document
router.get('/:collection/:id', async (req, res) => {
  try {
    const { collection, id } = req.params;
    const db = getDb();
    
    const doc = await db.collection(collection).findOne({ _id: id });
    
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(doc);
  } catch (error) {
    console.error('Document fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Get collection schema/stats
router.get('/:collection/stats', async (req, res) => {
  try {
    const { collection } = req.params;
    const db = getDb();
    
    const stats = await db.collection(collection).stats();
    const indexes = await db.collection(collection).indexes();
    const sample = await db.collection(collection).findOne();

    res.json({
      collection,
      documentCount: stats.count,
      avgDocumentSize: stats.avgObjSize,
      totalSize: stats.size,
      indexes: indexes.map(idx => ({
        name: idx.name,
        key: idx.key,
        unique: idx.unique || false
      })),
      sampleDocument: sample
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Search across collections
router.get('/search/all', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const db = getDb();
    
    const searchRegex = { $regex: q, $options: 'i' };

    const [characters, creatures, locations, events] = await Promise.all([
      db.collection('characters').find({
        $or: [
          { name: searchRegex },
          { alias: searchRegex },
          { backstory: searchRegex }
        ]
      }).limit(5).toArray(),
      
      db.collection('creatures').find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: searchRegex }
        ]
      }).limit(5).toArray(),
      
      db.collection('locations').find({
        $or: [
          { name: searchRegex },
          { description: searchRegex }
        ]
      }).limit(5).toArray(),
      
      db.collection('events').find({
        $or: [
          { name: searchRegex },
          { description: searchRegex }
        ]
      }).limit(5).toArray()
    ]);

    res.json({
      query: q,
      results: {
        characters,
        creatures,
        locations,
        events
      },
      totalResults: characters.length + creatures.length + locations.length + events.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;
