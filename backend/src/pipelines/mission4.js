// Mission 4: Upside Down Intelligence
// Teaches: Complex aggregation pipelines, performance tuning, explain plans

export const mission4Pipelines = {
  // Comprehensive threat intelligence report
  threatIntelligenceReport: [
    // Stage 1: Get all events with high severity
    {
      $match: {
        severity: { $gte: 8 }
      }
    },
    // Stage 2: Join with locations
    {
      $lookup: {
        from: 'locations',
        localField: 'location_id',
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
    // Stage 3: Join with creatures involved
    {
      $lookup: {
        from: 'creatures',
        localField: 'creatures_involved',
        foreignField: '_id',
        as: 'creatures'
      }
    },
    // Stage 4: Join with characters involved
    {
      $lookup: {
        from: 'characters',
        localField: 'characters_involved',
        foreignField: '_id',
        as: 'characters'
      }
    },
    // Stage 5: Compute risk metrics
    {
      $addFields: {
        creature_threat_sum: { $sum: '$creatures.threat_level' },
        hero_power_sum: { $sum: '$characters.power_level' },
        character_count: { $size: '$characters' },
        creature_count: { $size: '$creatures' }
      }
    },
    {
      $addFields: {
        balance_ratio: {
          $cond: {
            if: { $gt: ['$creature_threat_sum', 0] },
            then: { $divide: ['$hero_power_sum', '$creature_threat_sum'] },
            else: null
          }
        },
        risk_score: {
          $multiply: [
            '$severity',
            { $add: [1, { $multiply: ['$creature_count', 0.5] }] }
          ]
        }
      }
    },
    // Stage 6: Project final structure
    {
      $project: {
        name: 1,
        type: 1,
        timestamp: 1,
        severity: 1,
        description: 1,
        casualties: 1,
        resolution_status: 1,
        location: {
          name: '$location.name',
          danger_level: '$location.danger_level',
          dimension: '$location.dimension'
        },
        creatures: {
          $map: {
            input: '$creatures',
            as: 'c',
            in: {
              name: '$$c.name',
              threat_level: '$$c.threat_level',
              type: '$$c.type'
            }
          }
        },
        heroes: {
          $map: {
            input: '$characters',
            as: 'h',
            in: {
              name: '$$h.name',
              power_level: '$$h.power_level',
              abilities: { $slice: ['$$h.abilities', 2] }
            }
          }
        },
        metrics: {
          creature_threat_sum: '$creature_threat_sum',
          hero_power_sum: '$hero_power_sum',
          balance_ratio: { $round: ['$balance_ratio', 2] },
          risk_score: { $round: ['$risk_score', 1] }
        }
      }
    },
    // Stage 7: Sort by risk
    {
      $sort: { 'metrics.risk_score': -1 }
    }
  ],

  // Timeline analysis with rolling aggregations
  timelineAnalysis: [
    {
      $match: {
        timestamp: { $exists: true }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' },
          type: '$type'
        },
        event_count: { $sum: 1 },
        total_casualties: { $sum: '$casualties' },
        avg_severity: { $avg: '$severity' },
        events: { $push: '$name' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    },
    {
      $group: {
        _id: {
          year: '$_id.year',
          month: '$_id.month'
        },
        event_types: {
          $push: {
            type: '$_id.type',
            count: '$event_count',
            casualties: '$total_casualties',
            avg_severity: '$avg_severity',
            events: '$events'
          }
        },
        total_events: { $sum: '$event_count' },
        total_casualties: { $sum: '$total_casualties' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    },
    {
      $project: {
        _id: 0,
        period: {
          $concat: [
            { $toString: '$_id.year' },
            '-',
            {
              $cond: {
                if: { $lt: ['$_id.month', 10] },
                then: { $concat: ['0', { $toString: '$_id.month' }] },
                else: { $toString: '$_id.month' }
              }
            }
          ]
        },
        total_events: 1,
        total_casualties: 1,
        event_types: 1
      }
    }
  ],

  // Network analysis - character connections
  networkAnalysis: [
    {
      $unwind: '$relationships'
    },
    {
      $lookup: {
        from: 'characters',
        localField: 'relationships',
        foreignField: '_id',
        as: 'connected_character'
      }
    },
    {
      $unwind: '$connected_character'
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        team: { $first: '$team' },
        power_level: { $first: '$power_level' },
        connection_count: { $sum: 1 },
        connections: {
          $push: {
            id: '$connected_character._id',
            name: '$connected_character.name',
            team: '$connected_character.team',
            power_level: '$connected_character.power_level'
          }
        },
        total_connected_power: { $sum: '$connected_character.power_level' },
        cross_team_connections: {
          $sum: {
            $cond: [
              { $ne: ['$team', '$connected_character.team'] },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $addFields: {
        network_influence: {
          $add: [
            '$power_level',
            { $multiply: ['$connection_count', 2] },
            { $multiply: ['$cross_team_connections', 3] }
          ]
        }
      }
    },
    {
      $sort: { network_influence: -1 }
    },
    {
      $project: {
        name: 1,
        team: 1,
        power_level: 1,
        connection_count: 1,
        cross_team_connections: 1,
        network_influence: 1,
        connections: {
          $slice: ['$connections', 5]
        },
        avg_connection_power: {
          $round: [{ $divide: ['$total_connected_power', '$connection_count'] }, 1]
        }
      }
    }
  ],

  // Performance-optimized query with explain
  optimizedSightingQuery: [
    // Uses index on creature_id and timestamp
    {
      $match: {
        confirmed: true,
        timestamp: { $gte: new Date('2024-01-01') }
      }
    },
    // Early projection to reduce memory
    {
      $project: {
        creature_id: 1,
        location_id: 1,
        timestamp: 1,
        casualties: 1,
        threat_response: 1
      }
    },
    // Group before expensive lookups
    {
      $group: {
        _id: '$creature_id',
        sighting_count: { $sum: 1 },
        total_casualties: { $sum: '$casualties' },
        locations: { $addToSet: '$location_id' },
        latest_sighting: { $max: '$timestamp' },
        responses: { $addToSet: '$threat_response' }
      }
    },
    // Lookup only after reducing document count
    {
      $lookup: {
        from: 'creatures',
        localField: '_id',
        foreignField: '_id',
        as: 'creature'
      }
    },
    {
      $unwind: '$creature'
    },
    {
      $project: {
        _id: 0,
        creature_name: '$creature.name',
        creature_type: '$creature.type',
        threat_level: '$creature.threat_level',
        sighting_count: 1,
        total_casualties: 1,
        location_spread: { $size: '$locations' },
        latest_sighting: 1,
        response_types: '$responses'
      }
    },
    {
      $sort: { sighting_count: -1 }
    }
  ],

  // Text search with scoring
  textSearchQuery: (searchTerm) => [
    {
      $match: {
        $text: { $search: searchTerm }
      }
    },
    {
      $addFields: {
        searchScore: { $meta: 'textScore' }
      }
    },
    {
      $match: {
        searchScore: { $gt: 0.5 }
      }
    },
    {
      $sort: { searchScore: -1 }
    },
    {
      $project: {
        name: 1,
        description: 1,
        tags: 1,
        threat_level: 1,
        searchScore: 1
      }
    },
    {
      $limit: 10
    }
  ]
};

export const mission4Explanations = {
  threatIntelligenceReport: {
    title: 'Complex Multi-Stage Pipeline',
    description: 'Full intelligence report combining events, locations, creatures, and characters',
    stages: [
      {
        stage: 'Early $match',
        code: '{ severity: { $gte: 8 } }',
        explanation: 'PERFORMANCE: Filter first! Reduces documents before expensive operations.'
      },
      {
        stage: 'Multiple $lookup chains',
        code: 'locations → creatures → characters',
        explanation: 'Chain lookups to build complete picture. Order matters for data dependencies.'
      },
      {
        stage: '$addFields for metrics',
        code: '{ creature_threat_sum: { $sum: "$creatures.threat_level" }, ... }',
        explanation: 'Compute aggregate values from arrays. $sum on array field sums all values.'
      },
      {
        stage: 'Conditional division',
        code: '{ $cond: { if: { $gt: [...] }, then: { $divide: [...] }, else: null } }',
        explanation: 'Avoid division by zero with $cond. Returns null instead of error.'
      },
      {
        stage: 'Nested $map with $slice',
        code: '{ $map: { input: "$creatures", in: { ... } } }',
        explanation: '$map transforms arrays. $slice inside limits nested array output.'
      }
    ],
    mongodbConcepts: ['Pipeline Optimization', 'Complex Calculations', 'Error Handling', 'Nested Transforms'],
    realWorldUse: 'Business reports, risk analysis, compliance dashboards'
  },

  timelineAnalysis: {
    title: 'Time Series Aggregation',
    description: 'Analyze events over time with date grouping',
    stages: [
      {
        stage: 'Date extraction',
        code: '{ $year: "$timestamp" }, { $month: "$timestamp" }',
        explanation: 'Extract date parts for grouping. MongoDB has $year, $month, $dayOfMonth, etc.'
      },
      {
        stage: 'Two-level grouping',
        code: 'First by type+month, then by month only',
        explanation: 'First group gets type breakdown, second group combines into monthly summary.'
      },
      {
        stage: '$concat date formatting',
        code: '{ $concat: [year, "-", month] }',
        explanation: '$concat combines strings. Use $toString to convert numbers.'
      },
      {
        stage: 'Zero-padding',
        code: '{ $cond: { if: { $lt: ["$_id.month", 10] }, ... } }',
        explanation: 'Add leading zero for months 1-9 for proper sorting and display.'
      }
    ],
    mongodbConcepts: ['Date Operators', 'Multi-Level Grouping', 'String Formatting'],
    realWorldUse: 'Time series analytics, financial reports, activity trends'
  },

  networkAnalysis: {
    title: 'Graph-Style Relationship Analysis',
    description: 'Analyze character relationships like a social network',
    stages: [
      {
        stage: '$unwind relationships',
        code: 'Creates document per relationship',
        explanation: '$unwind on array creates one document per array element. Enables individual lookups.'
      },
      {
        stage: 'Self-lookup pattern',
        code: 'Looking up characters within characters collection',
        explanation: 'Join collection to itself for relationship expansion.'
      },
      {
        stage: 'Cross-team counting',
        code: '{ $cond: [{ $ne: ["$team", "$connected_character.team"] }, 1, 0] }',
        explanation: 'Conditional count for cross-team connections. $ne is "not equal".'
      },
      {
        stage: 'Network influence score',
        code: 'power + connections*2 + cross_team*3',
        explanation: 'Compute influence weighting own power, connection count, and diversity.'
      }
    ],
    mongodbConcepts: ['Graph Queries', 'Self-Joins', 'Influence Scoring', 'Relationship Analysis'],
    realWorldUse: 'Social networks, org charts, recommendation systems, fraud rings'
  },

  optimizedSightingQuery: {
    title: 'Performance-Optimized Pipeline',
    description: 'Query designed for optimal performance with explain plan awareness',
    stages: [
      {
        stage: 'Index-aware $match',
        code: '{ confirmed: true, timestamp: { $gte: ... } }',
        explanation: 'CRITICAL: Place $match first. Compound index on (confirmed, timestamp) speeds this up.'
      },
      {
        stage: 'Early $project',
        code: 'Only needed fields',
        explanation: 'PERFORMANCE: Project early to reduce memory. Less data = faster processing.'
      },
      {
        stage: '$group before $lookup',
        code: 'Reduce documents first',
        explanation: 'CRITICAL: Aggregate first, lookup later. 1000 sightings → 10 creatures is much cheaper.'
      },
      {
        stage: '$addToSet',
        code: '{ locations: { $addToSet: "$location_id" } }',
        explanation: '$addToSet collects unique values only. Like $push but deduplicates.'
      }
    ],
    mongodbConcepts: ['Query Optimization', 'Index Usage', 'Memory Efficiency', '$addToSet'],
    realWorldUse: 'High-volume analytics, real-time dashboards, performance-critical queries',
    performanceTips: [
      'Run db.collection.explain("executionStats") to see actual performance',
      'Look for IXSCAN vs COLLSCAN - indexes should be used',
      'Check totalDocsExamined vs totalDocsReturned ratio',
      'Move $match and $project as early as possible',
      '$lookup is expensive - minimize documents before it'
    ]
  },

  textSearchQuery: {
    title: 'Full-Text Search',
    description: 'Search across text fields with relevance scoring',
    stages: [
      {
        stage: '$text search',
        code: '{ $text: { $search: "demogorgon hunter" } }',
        explanation: '$text requires a text index. Searches all indexed text fields.'
      },
      {
        stage: 'textScore',
        code: '{ $meta: "textScore" }',
        explanation: '$meta textScore returns relevance score. Higher = better match.'
      },
      {
        stage: 'Score filtering',
        code: '{ searchScore: { $gt: 0.5 } }',
        explanation: 'Filter low-relevance results for quality.'
      }
    ],
    mongodbConcepts: ['Text Indexes', 'Full-Text Search', 'Relevance Scoring'],
    realWorldUse: 'Search engines, product search, content discovery'
  }
};

export default { mission4Pipelines, mission4Explanations };
