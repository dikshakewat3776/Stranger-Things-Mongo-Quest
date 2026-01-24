import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stranger_things_quest';

let client;
let db;

export async function connectToDatabase() {
  if (db) return db;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    
    // Create indexes for optimal performance (if they don't exist)
    await createIndexes(db);
    
    console.log('📊 Database connection established');
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

export function getClient() {
  return client;
}

async function createIndexes(database) {
  // Helper to safely create indexes (skips if already exists)
  const safeCreateIndexes = async (collection, indexes) => {
    for (const index of indexes) {
      try {
        await database.collection(collection).createIndex(index.key, { name: index.name });
      } catch (error) {
        // Ignore if index already exists (code 85 or 86)
        if (error.code !== 85 && error.code !== 86) {
          console.warn(`Warning creating index ${index.name} on ${collection}:`, error.message);
        }
      }
    }
  };

  // Characters collection indexes
  await safeCreateIndexes('characters', [
    { key: { name: 1 }, name: 'idx_name' },
    { key: { status: 1 }, name: 'idx_status' },
    { key: { location_id: 1 }, name: 'idx_location' },
    { key: { team: 1 }, name: 'idx_team' }
  ]);

  // Locations collection indexes
  await safeCreateIndexes('locations', [
    { key: { name: 1 }, name: 'idx_location_name' },
    { key: { dimension: 1 }, name: 'idx_dimension' },
    { key: { danger_level: -1 }, name: 'idx_danger_level' },
    { key: { type: 1 }, name: 'idx_type' }
  ]);

  // Creatures collection indexes
  await safeCreateIndexes('creatures', [
    { key: { type: 1 }, name: 'idx_creature_type' },
    { key: { threat_level: -1 }, name: 'idx_threat_level' },
    { key: { last_seen_location: 1 }, name: 'idx_last_seen' },
    { key: { status: 1 }, name: 'idx_creature_status' }
  ]);

  // Sightings collection indexes
  await safeCreateIndexes('sightings', [
    { key: { creature_id: 1 }, name: 'idx_sighting_creature' },
    { key: { location_id: 1 }, name: 'idx_sighting_location' },
    { key: { timestamp: -1 }, name: 'idx_timestamp' },
    { key: { confirmed: 1 }, name: 'idx_confirmed' }
  ]);

  // Status reports collection indexes
  await safeCreateIndexes('status_reports', [
    { key: { character_id: 1 }, name: 'idx_report_character' },
    { key: { location_id: 1 }, name: 'idx_report_location' },
    { key: { timestamp: -1 }, name: 'idx_report_timestamp' },
    { key: { status: 1 }, name: 'idx_report_status' }
  ]);

  // Events collection indexes
  await safeCreateIndexes('events', [
    { key: { type: 1 }, name: 'idx_event_type' },
    { key: { timestamp: -1 }, name: 'idx_event_timestamp' },
    { key: { severity: -1 }, name: 'idx_severity' }
  ]);
}

export async function closeConnection() {
  if (client) {
    await client.close();
    db = null;
    client = null;
  }
}
