import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { characters } from '../datasets/characters.js';
import { locations } from '../datasets/locations.js';
import { creatures } from '../datasets/creatures.js';
import { sightings } from '../datasets/sightings.js';
import { statusReports } from '../datasets/statusReports.js';
import { events } from '../datasets/events.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stranger_things_quest';

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('🔮 Connected to the Upside Down Database');
    
    const db = client.db();
    
    // Drop existing collections
    const collections = ['characters', 'locations', 'creatures', 'sightings', 'status_reports', 'events'];
    
    for (const collectionName of collections) {
      try {
        await db.collection(collectionName).drop();
        console.log(`🗑️  Dropped collection: ${collectionName}`);
      } catch (error) {
        // Collection doesn't exist, that's fine
      }
    }
    
    // Insert data
    console.log('\n📊 Seeding collections...\n');
    
    await db.collection('characters').insertMany(characters);
    console.log(`✅ Inserted ${characters.length} characters`);
    
    await db.collection('locations').insertMany(locations);
    console.log(`✅ Inserted ${locations.length} locations`);
    
    await db.collection('creatures').insertMany(creatures);
    console.log(`✅ Inserted ${creatures.length} creatures`);
    
    await db.collection('sightings').insertMany(sightings);
    console.log(`✅ Inserted ${sightings.length} sightings`);
    
    await db.collection('status_reports').insertMany(statusReports);
    console.log(`✅ Inserted ${statusReports.length} status reports`);
    
    await db.collection('events').insertMany(events);
    console.log(`✅ Inserted ${events.length} events`);
    
    // Create indexes
    console.log('\n🔧 Creating indexes...\n');
    
    // Characters indexes
    await db.collection('characters').createIndexes([
      { key: { name: 1 }, name: 'idx_name' },
      { key: { status: 1 }, name: 'idx_status' },
      { key: { location_id: 1 }, name: 'idx_location' },
      { key: { team: 1 }, name: 'idx_team' },
      { key: { power_level: -1 }, name: 'idx_power' },
      { key: { name: 'text', abilities: 'text', backstory: 'text' }, name: 'idx_text_search' }
    ]);
    console.log('✅ Characters indexes created');
    
    // Locations indexes
    await db.collection('locations').createIndexes([
      { key: { name: 1 }, name: 'idx_location_name' },
      { key: { dimension: 1 }, name: 'idx_dimension' },
      { key: { danger_level: -1 }, name: 'idx_danger_level' },
      { key: { type: 1 }, name: 'idx_type' }
    ]);
    console.log('✅ Locations indexes created');
    
    // Creatures indexes
    await db.collection('creatures').createIndexes([
      { key: { type: 1 }, name: 'idx_creature_type' },
      { key: { threat_level: -1 }, name: 'idx_threat_level' },
      { key: { last_seen_location: 1 }, name: 'idx_last_seen' },
      { key: { status: 1 }, name: 'idx_creature_status' },
      { key: { name: 'text', description: 'text', tags: 'text' }, name: 'idx_creature_text' }
    ]);
    console.log('✅ Creatures indexes created');
    
    // Sightings indexes
    await db.collection('sightings').createIndexes([
      { key: { creature_id: 1 }, name: 'idx_sighting_creature' },
      { key: { location_id: 1 }, name: 'idx_sighting_location' },
      { key: { timestamp: -1 }, name: 'idx_timestamp' },
      { key: { confirmed: 1 }, name: 'idx_confirmed' },
      { key: { creature_id: 1, location_id: 1 }, name: 'idx_creature_location' },
      { key: { casualties: -1 }, name: 'idx_casualties' }
    ]);
    console.log('✅ Sightings indexes created');
    
    // Status reports indexes
    await db.collection('status_reports').createIndexes([
      { key: { character_id: 1 }, name: 'idx_report_character' },
      { key: { location_id: 1 }, name: 'idx_report_location' },
      { key: { timestamp: -1 }, name: 'idx_report_timestamp' },
      { key: { status: 1 }, name: 'idx_report_status' },
      { key: { priority: 1 }, name: 'idx_priority' },
      { key: { health: 1 }, name: 'idx_health' }
    ]);
    console.log('✅ Status reports indexes created');
    
    // Events indexes
    await db.collection('events').createIndexes([
      { key: { type: 1 }, name: 'idx_event_type' },
      { key: { timestamp: -1 }, name: 'idx_event_timestamp' },
      { key: { severity: -1 }, name: 'idx_severity' },
      { key: { location_id: 1 }, name: 'idx_event_location' },
      { key: { resolution_status: 1 }, name: 'idx_resolution' }
    ]);
    console.log('✅ Events indexes created');
    
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🔮 DATABASE SEEDED SUCCESSFULLY 🔮                         ║
║                                                              ║
║   The Upside Down awaits your queries...                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
