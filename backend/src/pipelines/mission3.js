// Mission 3: Parallel Dimensions
// Teaches: $facet (parallel pipelines), multi-dimensional analysis

export const mission3Pipelines = {
  // Basic: Parallel analysis of threats
  parallelThreatAnalysis: [
    {
      $facet: {
        // Count creatures by type
        creaturesByType: [
          {
            $group: {
              _id: '$type',
              count: { $sum: 1 },
              avg_threat: { $avg: '$threat_level' },
              creatures: { $push: '$name' }
            }
          },
          { $sort: { avg_threat: -1 } }
        ],
        // Top threats
        topThreats: [
          { $sort: { threat_level: -1 } },
          { $limit: 5 },
          {
            $project: {
              name: 1,
              type: 1,
              threat_level: 1,
              weaknesses: 1
            }
          }
        ],
        // Active vs contained
        statusBreakdown: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              total_confirmed_kills: { $sum: '$confirmed_kills' }
            }
          }
        ]
      }
    }
  ],

  // Intermediate: Zone danger analysis with survivor counts
  zoneDangerAnalysis: [
    {
      $facet: {
        // Danger by location type
        dangerByZone: [
          {
            $group: {
              _id: '$type',
              locations: { $sum: 1 },
              avg_danger: { $avg: '$danger_level' },
              max_danger: { $max: '$danger_level' },
              portal_count: {
                $sum: { $cond: ['$portal_nearby', 1, 0] }
              }
            }
          },
          { $sort: { avg_danger: -1 } }
        ],
        // Danger by dimension
        dangerByDimension: [
          {
            $group: {
              _id: '$dimension',
              count: { $sum: 1 },
              avg_danger: { $avg: '$danger_level' },
              locations: { $push: '$name' }
            }
          }
        ],
        // Most dangerous locations
        hotspots: [
          { $match: { danger_level: { $gte: 8 } } },
          {
            $project: {
              name: 1,
              type: 1,
              danger_level: 1,
              features: 1,
              portal_nearby: 1
            }
          },
          { $sort: { danger_level: -1 } }
        ],
        // Safe zones
        safeZones: [
          { $match: { danger_level: { $lte: 3 } } },
          {
            $project: {
              name: 1,
              type: 1,
              danger_level: 1,
              accessibility: 1
            }
          }
        ]
      }
    }
  ],

  // Advanced: Complete situation analysis
  completeSituationAnalysis: [
    {
      $facet: {
        // Character status overview
        characterStatus: [
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              total_power: { $sum: '$power_level' },
              avg_missions: { $avg: '$missions_completed' },
              members: { $push: { name: '$name', power: '$power_level' } }
            }
          },
          { $sort: { count: -1 } }
        ],
        // Team composition
        teamAnalysis: [
          {
            $group: {
              _id: '$team',
              size: { $sum: 1 },
              total_power: { $sum: '$power_level' },
              avg_age: { $avg: '$age' },
              top_abilities: { $push: '$abilities' }
            }
          }
        ],
        // Power distribution
        powerDistribution: [
          {
            $bucket: {
              groupBy: '$power_level',
              boundaries: [0, 3, 5, 7, 10, 11],
              default: 'Unknown',
              output: {
                count: { $sum: 1 },
                characters: { $push: '$name' }
              }
            }
          }
        ],
        // Most experienced
        veteranMembers: [
          { $sort: { missions_completed: -1 } },
          { $limit: 5 },
          {
            $project: {
              name: 1,
              missions_completed: 1,
              power_level: 1,
              abilities: { $slice: ['$abilities', 2] }
            }
          }
        ]
      }
    }
  ],

  // Expert: Multi-collection faceted analysis
  strategicIntelligence: [
    {
      $lookup: {
        from: 'sightings',
        localField: '_id',
        foreignField: 'creature_id',
        as: 'sightings'
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'last_seen_location',
        foreignField: '_id',
        as: 'location'
      }
    },
    {
      $unwind: {
        path: '$location',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $facet: {
        // Threat level ranking with activity
        threatRanking: [
          {
            $project: {
              name: 1,
              type: 1,
              threat_level: 1,
              sighting_count: { $size: '$sightings' },
              total_casualties: { $sum: '$sightings.casualties' },
              last_location: '$location.name',
              weaknesses: 1,
              threat_score: {
                $add: [
                  { $multiply: ['$threat_level', 10] },
                  { $multiply: [{ $size: '$sightings' }, 5] },
                  { $sum: '$sightings.casualties' }
                ]
              }
            }
          },
          { $sort: { threat_score: -1 } }
        ],
        // Activity timeline
        activityTimeline: [
          { $unwind: '$sightings' },
          {
            $group: {
              _id: {
                creature: '$name',
                month: { $month: '$sightings.timestamp' }
              },
              incidents: { $sum: 1 },
              casualties: { $sum: '$sightings.casualties' }
            }
          },
          { $sort: { '_id.month': 1 } }
        ],
        // Vulnerability analysis
        vulnerabilityReport: [
          { $unwind: '$weaknesses' },
          {
            $group: {
              _id: '$weaknesses',
              effective_against: { $push: '$name' },
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ],
        // Geographic spread
        geographicSpread: [
          {
            $project: {
              name: 1,
              threat_level: 1,
              locations_active: {
                $setUnion: [
                  ['$last_seen_location'],
                  '$sightings.location_id'
                ]
              }
            }
          },
          {
            $addFields: {
              location_count: { $size: '$locations_active' }
            }
          },
          { $sort: { location_count: -1 } }
        ]
      }
    }
  ]
};

export const mission3Explanations = {
  parallelThreatAnalysis: {
    title: 'Introduction to $facet',
    description: 'Run multiple aggregation pipelines in parallel on the same data',
    stages: [
      {
        stage: '$facet',
        code: '{ creaturesByType: [...], topThreats: [...], statusBreakdown: [...] }',
        explanation: '$facet runs separate pipelines simultaneously. Each key becomes a field with pipeline results.'
      },
      {
        stage: 'creaturesByType pipeline',
        code: '$group by type',
        explanation: 'Groups creatures by type with counts and averages.'
      },
      {
        stage: 'topThreats pipeline',
        code: '$sort + $limit',
        explanation: 'Gets top 5 threats sorted by threat_level.'
      }
    ],
    mongodbConcepts: ['$facet', 'Parallel Pipelines', 'Multiple Aggregations'],
    realWorldUse: 'Dashboard widgets, multi-metric reports, search result facets (like filters on e-commerce)'
  },

  zoneDangerAnalysis: {
    title: 'Multi-Faceted Location Analysis',
    description: 'Analyze locations from multiple perspectives simultaneously',
    stages: [
      {
        stage: 'dangerByZone',
        code: '$group by type with portal counting',
        explanation: 'Conditional $sum counts portals: $cond returns 1 if true, 0 if false.'
      },
      {
        stage: 'hotspots vs safeZones',
        code: 'Different $match filters',
        explanation: 'Same data, opposite filters. $facet lets you do both in one query.'
      },
      {
        stage: 'dangerByDimension',
        code: '$push collects into array',
        explanation: '$push accumulates values into an array during grouping.'
      }
    ],
    mongodbConcepts: ['Conditional Counting', 'Multiple Perspectives', 'Array Accumulation'],
    realWorldUse: 'Real estate analysis, risk assessment, geographic data analysis'
  },

  completeSituationAnalysis: {
    title: 'Advanced Facet with $bucket',
    description: 'Comprehensive analysis including bucketed distributions',
    stages: [
      {
        stage: '$bucket',
        code: '{ groupBy: "$power_level", boundaries: [0, 3, 5, 7, 10, 11], ... }',
        explanation: '$bucket groups numeric values into ranges. Perfect for histograms and distributions.'
      },
      {
        stage: 'teamAnalysis',
        code: 'Nested arrays with $push',
        explanation: 'Pushing arrays creates array of arrays - useful for collecting abilities.'
      },
      {
        stage: '$slice',
        code: '{ $slice: ["$abilities", 2] }',
        explanation: '$slice limits array output. Here: first 2 abilities only.'
      }
    ],
    mongodbConcepts: ['$bucket Distribution', '$slice Array Limit', 'Complex Nested Data'],
    realWorldUse: 'Age demographics, price ranges, performance tiers, analytics histograms'
  },

  strategicIntelligence: {
    title: 'Expert: Cross-Collection Faceted Analysis',
    description: 'Combine $lookup with $facet for multi-dimensional intelligence',
    stages: [
      {
        stage: 'Pre-facet $lookup',
        code: 'Join before $facet',
        explanation: 'Lookups before $facet make joined data available to all facet pipelines.'
      },
      {
        stage: 'Computed threat_score',
        code: '{ $add: [ { $multiply: [...] }, ... ] }',
        explanation: 'Complex calculations combining base threat, activity, and casualties.'
      },
      {
        stage: '$setUnion',
        code: '{ $setUnion: [...] }',
        explanation: '$setUnion combines arrays removing duplicates. Gets all unique locations.'
      },
      {
        stage: 'activityTimeline',
        code: '$unwind + $group by month',
        explanation: 'Unwind sightings array, then group by creature and month for timeline.'
      }
    ],
    mongodbConcepts: ['$setUnion', 'Computed Scores', 'Timeline Analysis', 'Cross-Collection Facets'],
    realWorldUse: 'Business intelligence, security dashboards, competitive analysis, trend detection'
  }
};

export default { mission3Pipelines, mission3Explanations };
