import { Router } from 'express';
import { getDb } from '../config/database.js';
import { 
  mission1Pipelines, mission1Explanations,
  mission2Pipelines, mission2Explanations,
  mission3Pipelines, mission3Explanations,
  mission4Pipelines, mission4Explanations
} from '../pipelines/index.js';

const router = Router();

// Get all missions metadata
router.get('/', (req, res) => {
  const missions = [
    {
      id: 1,
      title: 'Find the Demogorgon',
      subtitle: 'Master Filtering & Matching',
      description: 'Use $match and $filter to locate Demogorgon sightings across Hawkins. Learn filtering operators and index optimization.',
      icon: '🧟',
      difficulty: 'Beginner',
      concepts: ['$match', '$filter', 'Comparison Operators', 'Indexes', '$sort', '$project'],
      storyIntro: 'Reports are coming in from across Hawkins about strange disappearances. Chief Hopper needs you to analyze the sighting data to track the Demogorgon\'s movements.',
      estimatedTime: '15-20 mins',
      unlocked: true
    },
    {
      id: 2,
      title: 'Search the Lost Team',
      subtitle: 'Master Joins & Lookups',
      description: 'Use $lookup to join characters, locations, and status reports. Find our missing team members.',
      icon: '🧭',
      difficulty: 'Intermediate',
      concepts: ['$lookup', '$unwind', 'Subpipelines', 'Multiple Joins', 'let/expr'],
      storyIntro: 'Several team members have gone missing during reconnaissance missions. Joyce needs you to cross-reference their last known locations with status reports to plan rescue operations.',
      estimatedTime: '25-30 mins',
      unlocked: true
    },
    {
      id: 3,
      title: 'Parallel Dimensions',
      subtitle: 'Master Faceted Analysis',
      description: 'Use $facet to run parallel analytics pipelines. Analyze threats across multiple dimensions simultaneously.',
      icon: '🔀',
      difficulty: 'Advanced',
      concepts: ['$facet', 'Parallel Pipelines', '$bucket', 'Multi-Perspective Analysis'],
      storyIntro: 'The Mind Flayer is planning something big. We need comprehensive intelligence - threat levels, survivor counts, danger zones, and resource allocation - all at once.',
      estimatedTime: '30-35 mins',
      unlocked: true
    },
    {
      id: 4,
      title: 'Upside Down Intelligence',
      subtitle: 'Master Complex Pipelines',
      description: 'Build sophisticated aggregation pipelines with performance optimization. Create the ultimate intelligence report.',
      icon: '📊',
      difficulty: 'Expert',
      concepts: ['Complex Pipelines', 'Performance Tuning', 'Text Search', 'Explain Plans', 'Network Analysis'],
      storyIntro: 'The final battle approaches. Eleven needs the complete picture - every event, every creature, every connection. Build the intelligence system that will help us save Hawkins.',
      estimatedTime: '40-45 mins',
      unlocked: true
    }
  ];

  res.json(missions);
});

// Get specific mission
router.get('/:id', (req, res) => {
  const missionId = parseInt(req.params.id);
  
  const missionData = {
    1: {
      id: 1,
      title: 'Find the Demogorgon',
      subtitle: 'Master Filtering & Matching',
      icon: '🧟',
      difficulty: 'Beginner',
      storyIntro: `
        **CLASSIFIED - HAWKINS POLICE DEPARTMENT**
        
        Reports are flooding in from across Hawkins about strange occurrences. 
        People are disappearing. Lights are flickering. Something is hunting in our town.
        
        Chief Hopper has given you access to the sighting database. Your mission: 
        analyze the data to track the creature's movements, identify patterns, 
        and help us predict where it will strike next.
        
        The creature we're tracking is called a **Demogorgon**. It's dangerous. 
        It's fast. And it's attracted to blood.
        
        *"Mornings are for coffee and contemplation... but tonight, we hunt."* - Hopper
      `,
      objectives: [
        'Find all Demogorgon sightings using $match',
        'Filter confirmed sightings with casualties',
        'Analyze activity patterns by location using $group',
        'Create comprehensive threat report with $lookup'
      ],
      schema: {
        collection: 'sightings',
        fields: {
          creature_id: 'Reference to creature',
          location_id: 'Reference to location',
          witness_ids: 'Array of character references',
          timestamp: 'When sighting occurred',
          confirmed: 'Boolean - was it verified',
          casualties: 'Number of casualties',
          description: 'What happened',
          evidence: 'Array of evidence types',
          resolution: 'How it ended'
        }
      },
      queries: Object.keys(mission1Pipelines),
      explanations: mission1Explanations
    },
    2: {
      id: 2,
      title: 'Search the Lost Team',
      subtitle: 'Master Joins & Lookups',
      icon: '🧭',
      difficulty: 'Intermediate',
      storyIntro: `
        **URGENT - RESCUE OPERATION BRIEFING**
        
        We've lost contact with several team members. Hopper went dark in Russia. 
        Will's connection to the Upside Down has him... compromised. 
        Max is being hunted by something worse than the Demogorgon.
        
        Joyce has tasked you with cross-referencing our databases to find them.
        We need to join character data with their last known locations and 
        status reports.
        
        In MongoDB, we use **$lookup** to join collections - it's like SQL joins 
        but more flexible. We'll also learn to use subpipelines for complex joins.
        
        *"I need you to trust me. I know things get crazy, but we've survived 
        worse. We can find them. We just need the right information."* - Joyce
      `,
      objectives: [
        'Join characters with their current locations',
        'Find missing members with their last status reports',
        'Build complete team overview with threat data',
        'Create rescue mission planning report'
      ],
      schema: {
        collections: ['characters', 'locations', 'status_reports', 'sightings'],
        relationships: {
          'characters.location_id': '→ locations._id',
          'status_reports.character_id': '→ characters._id',
          'status_reports.location_id': '→ locations._id',
          'sightings.location_id': '→ locations._id'
        }
      },
      queries: Object.keys(mission2Pipelines),
      explanations: mission2Explanations
    },
    3: {
      id: 3,
      title: 'Parallel Dimensions',
      subtitle: 'Master Faceted Analysis',
      icon: '🔀',
      difficulty: 'Advanced',
      storyIntro: `
        **HAWKINS LAB - DIMENSIONAL ANALYSIS DIVISION**
        
        The Upside Down isn't just a place - it's a mirror dimension. 
        And just like we need to understand our world from multiple angles, 
        we need to analyze our data from multiple perspectives simultaneously.
        
        The **$facet** operator is our secret weapon. It lets us run 
        multiple aggregation pipelines in parallel on the same data.
        
        Think of it like Eleven viewing multiple locations at once in the Void.
        We can count survivors, analyze threats, rank danger levels, and 
        assess resources - all in a single query.
        
        *"The Mind Flayer doesn't just see one thing at a time. 
        It sees everything. We need to match that."* - Dustin
      `,
      objectives: [
        'Run parallel threat analysis with $facet',
        'Analyze zone dangers from multiple perspectives',
        'Create comprehensive situation analysis with $bucket',
        'Build strategic intelligence dashboard'
      ],
      schema: {
        note: '$facet creates multiple output arrays from single input',
        structure: {
          result: {
            facet1: '[...results from pipeline 1...]',
            facet2: '[...results from pipeline 2...]',
            facet3: '[...results from pipeline 3...]'
          }
        }
      },
      queries: Object.keys(mission3Pipelines),
      explanations: mission3Explanations
    },
    4: {
      id: 4,
      title: 'Upside Down Intelligence',
      subtitle: 'Master Complex Pipelines',
      icon: '📊',
      difficulty: 'Expert',
      storyIntro: `
        **FINAL BRIEFING - OPERATION: SAVE HAWKINS**
        
        This is it. Vecna is preparing his final assault. The gates are opening 
        across Hawkins. We have one chance to stop him.
        
        We need the ultimate intelligence report - every event analyzed, 
        every threat mapped, every connection understood. We need to know 
        our enemies' weaknesses and our own strengths.
        
        This mission will push your MongoDB skills to the limit. Complex 
        multi-stage pipelines, performance optimization, text search, 
        network analysis. Everything you've learned comes together here.
        
        *"Friends don't lie. And the data doesn't lie either. 
        We can do this. Together."* - Eleven
      `,
      objectives: [
        'Build comprehensive threat intelligence report',
        'Analyze events over time with timeline aggregation',
        'Map character relationship networks',
        'Optimize queries for performance'
      ],
      schema: {
        note: 'This mission combines all collections',
        performanceTips: [
          'Place $match early to reduce documents',
          'Project only needed fields',
          '$group before $lookup when possible',
          'Use indexes for frequently filtered fields',
          'Run explain() to verify query plans'
        ]
      },
      queries: Object.keys(mission4Pipelines),
      explanations: mission4Explanations
    }
  };

  const mission = missionData[missionId];
  
  if (!mission) {
    return res.status(404).json({ error: 'Mission not found' });
  }

  res.json(mission);
});

// Execute mission query
router.post('/:missionId/execute/:queryName', async (req, res) => {
  try {
    const { missionId, queryName } = req.params;
    const { customPipeline } = req.body;
    const db = getDb();

    const pipelines = {
      1: mission1Pipelines,
      2: mission2Pipelines,
      3: mission3Pipelines,
      4: mission4Pipelines
    };

    const collections = {
      1: 'sightings',
      2: 'characters',
      3: { 
        parallelThreatAnalysis: 'creatures',
        zoneDangerAnalysis: 'locations',
        completeSituationAnalysis: 'characters',
        strategicIntelligence: 'creatures'
      },
      4: {
        threatIntelligenceReport: 'events',
        timelineAnalysis: 'events',
        networkAnalysis: 'characters',
        optimizedSightingQuery: 'sightings',
        textSearchQuery: 'creatures'
      }
    };

    const missionPipelines = pipelines[missionId];
    if (!missionPipelines) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    let pipeline;
    if (customPipeline && Array.isArray(customPipeline)) {
      pipeline = customPipeline;
    } else {
      pipeline = missionPipelines[queryName];
      if (!pipeline) {
        return res.status(404).json({ error: 'Query not found' });
      }
      // Handle function pipelines (like textSearchQuery)
      if (typeof pipeline === 'function') {
        pipeline = pipeline(req.body.searchTerm || 'demogorgon');
      }
    }

    // Determine collection
    let collectionName;
    const missionCollection = collections[missionId];
    if (typeof missionCollection === 'string') {
      collectionName = missionCollection;
    } else {
      collectionName = missionCollection[queryName] || 'sightings';
    }

    const collection = db.collection(collectionName);
    
    // Execute with explain option if requested
    if (req.body.explain) {
      const explainResult = await collection.aggregate(pipeline).explain('executionStats');
      return res.json({
        explainPlan: explainResult,
        collection: collectionName,
        pipeline: pipeline
      });
    }

    const results = await collection.aggregate(pipeline).toArray();

    res.json({
      success: true,
      collection: collectionName,
      pipeline: pipeline,
      resultCount: results.length,
      results: results
    });
  } catch (error) {
    console.error('Query execution error:', error);
    res.status(500).json({ 
      error: 'Query execution failed',
      message: error.message,
      hint: 'Check your pipeline syntax'
    });
  }
});

export default router;
