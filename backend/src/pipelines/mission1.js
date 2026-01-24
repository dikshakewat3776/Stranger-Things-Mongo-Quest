// Mission 1: Find the Demogorgon
// Teaches: $match, $filter, operators, and indexes

export const mission1Pipelines = {
  // Basic: Find all demogorgon sightings
  findDemogorgonSightings: [
    {
      $match: {
        creature_id: 'creature_001'
      }
    },
    {
      $sort: { timestamp: -1 }
    }
  ],

  // Intermediate: Find confirmed demogorgon sightings with casualties
  findConfirmedWithCasualties: [
    {
      $match: {
        creature_id: 'creature_001',
        confirmed: true,
        casualties: { $gt: 0 }
      }
    },
    {
      $project: {
        _id: 1,
        location_id: 1,
        timestamp: 1,
        casualties: 1,
        description: 1,
        resolution: 1
      }
    },
    {
      $sort: { casualties: -1 }
    }
  ],

  // Advanced: Find demogorgon activity patterns by location
  activityByLocation: [
    {
      $match: {
        creature_id: 'creature_001'
      }
    },
    {
      $group: {
        _id: '$location_id',
        total_sightings: { $sum: 1 },
        total_casualties: { $sum: '$casualties' },
        first_sighting: { $min: '$timestamp' },
        last_sighting: { $max: '$timestamp' },
        confirmed_count: {
          $sum: { $cond: ['$confirmed', 1, 0] }
        }
      }
    },
    {
      $sort: { total_sightings: -1 }
    }
  ],

  // Expert: Full demogorgon threat analysis with location details
  fullThreatAnalysis: [
    {
      $match: {
        creature_id: 'creature_001'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'location_id',
        foreignField: '_id',
        as: 'location'
      }
    },
    {
      $unwind: '$location'
    },
    {
      $lookup: {
        from: 'creatures',
        localField: 'creature_id',
        foreignField: '_id',
        as: 'creature'
      }
    },
    {
      $unwind: '$creature'
    },
    {
      $project: {
        _id: 1,
        timestamp: 1,
        confirmed: 1,
        description: 1,
        casualties: 1,
        resolution: 1,
        'location.name': 1,
        'location.danger_level': 1,
        'location.dimension': 1,
        'creature.name': 1,
        'creature.threat_level': 1,
        'creature.weaknesses': 1
      }
    },
    {
      $sort: { timestamp: -1 }
    }
  ]
};

export const mission1Explanations = {
  findDemogorgonSightings: {
    title: 'Basic $match Query',
    description: 'Find all records where creature_id matches the Demogorgon',
    stages: [
      {
        stage: '$match',
        code: '{ creature_id: "creature_001" }',
        explanation: '$match filters documents like WHERE in SQL. It uses indexes for fast lookups.'
      },
      {
        stage: '$sort',
        code: '{ timestamp: -1 }',
        explanation: '$sort orders results. -1 means descending (newest first).'
      }
    ],
    mongodbConcepts: ['Filtering', 'Sorting', 'Index Usage'],
    realWorldUse: 'Finding specific records in logs, filtering user activities, search functionality'
  },

  findConfirmedWithCasualties: {
    title: 'Compound Conditions with $match',
    description: 'Filter with multiple conditions and comparison operators',
    stages: [
      {
        stage: '$match',
        code: '{ creature_id: "creature_001", confirmed: true, casualties: { $gt: 0 } }',
        explanation: 'Multiple conditions act as AND. $gt is "greater than" comparison operator.'
      },
      {
        stage: '$project',
        code: '{ _id: 1, location_id: 1, timestamp: 1, casualties: 1, description: 1, resolution: 1 }',
        explanation: '$project shapes output. 1 includes field, 0 excludes. Like SELECT in SQL.'
      },
      {
        stage: '$sort',
        code: '{ casualties: -1 }',
        explanation: 'Sort by casualties descending to see worst incidents first.'
      }
    ],
    mongodbConcepts: ['Comparison Operators', 'Projection', 'Compound Queries'],
    realWorldUse: 'Fraud detection (suspicious transactions), alerting systems, priority queues'
  },

  activityByLocation: {
    title: 'Grouping and Aggregation',
    description: 'Analyze patterns by grouping sightings per location',
    stages: [
      {
        stage: '$match',
        code: '{ creature_id: "creature_001" }',
        explanation: 'First filter to relevant documents before expensive operations.'
      },
      {
        stage: '$group',
        code: '{ _id: "$location_id", total_sightings: { $sum: 1 }, ... }',
        explanation: '$group aggregates documents. $sum counts, $min/$max find extremes. Like GROUP BY in SQL.'
      },
      {
        stage: '$sort',
        code: '{ total_sightings: -1 }',
        explanation: 'Sort grouped results to find hotspots.'
      }
    ],
    mongodbConcepts: ['$group', 'Accumulators ($sum, $min, $max)', 'Conditional Aggregation'],
    realWorldUse: 'Analytics dashboards, sales reports, user behavior analysis'
  },

  fullThreatAnalysis: {
    title: 'Joins with $lookup',
    description: 'Combine data from multiple collections for complete analysis',
    stages: [
      {
        stage: '$match',
        code: '{ creature_id: "creature_001" }',
        explanation: 'Filter early to reduce data flowing through pipeline.'
      },
      {
        stage: '$lookup',
        code: '{ from: "locations", localField: "location_id", foreignField: "_id", as: "location" }',
        explanation: '$lookup performs LEFT OUTER JOIN. Links sightings to location details.'
      },
      {
        stage: '$unwind',
        code: '"$location"',
        explanation: '$unwind deconstructs arrays. After $lookup, result is array - unwind flattens it.'
      },
      {
        stage: '$project',
        code: '{ ... }',
        explanation: 'Shape final output with only needed fields from both collections.'
      }
    ],
    mongodbConcepts: ['$lookup (Joins)', '$unwind', 'Cross-Collection Queries'],
    realWorldUse: 'Order details with product info, user profiles with activity, reports combining data sources'
  }
};

export default { mission1Pipelines, mission1Explanations };
