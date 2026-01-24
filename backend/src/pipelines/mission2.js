// Mission 2: Search the Lost Team
// Teaches: $lookup (joins across collections), complex relationships

export const mission2Pipelines = {
  // Basic: Find characters with their current location
  findCharactersWithLocation: [
    {
      $lookup: {
        from: 'locations',
        localField: 'location_id',
        foreignField: '_id',
        as: 'current_location'
      }
    },
    {
      $unwind: {
        path: '$current_location',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        name: 1,
        status: 1,
        'current_location.name': 1,
        'current_location.danger_level': 1,
        'current_location.dimension': 1
      }
    }
  ],

  // Intermediate: Find missing/endangered characters with their last reports
  findMissingCharacters: [
    {
      $match: {
        status: { $in: ['missing', 'endangered', 'compromised'] }
      }
    },
    {
      $lookup: {
        from: 'status_reports',
        localField: '_id',
        foreignField: 'character_id',
        as: 'reports',
        pipeline: [
          { $sort: { timestamp: -1 } },
          { $limit: 1 }
        ]
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'location_id',
        foreignField: '_id',
        as: 'last_known_location'
      }
    },
    {
      $unwind: {
        path: '$reports',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$last_known_location',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        name: 1,
        status: 1,
        last_seen: 1,
        'last_known_location.name': 1,
        'last_known_location.danger_level': 1,
        'reports.report': 1,
        'reports.health': 1,
        'reports.timestamp': 1,
        'reports.priority': 1
      }
    },
    {
      $sort: { 'reports.timestamp': -1 }
    }
  ],

  // Advanced: Full team status with location and recent threats
  teamStatusWithThreats: [
    {
      $match: {
        team: 'hawkins_heroes'
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
      $lookup: {
        from: 'status_reports',
        localField: '_id',
        foreignField: 'character_id',
        as: 'reports',
        pipeline: [
          { $sort: { timestamp: -1 } },
          { $limit: 3 }
        ]
      }
    },
    {
      $lookup: {
        from: 'sightings',
        localField: 'location_id',
        foreignField: 'location_id',
        as: 'nearby_threats',
        pipeline: [
          { $match: { confirmed: true } },
          { $sort: { timestamp: -1 } },
          { $limit: 2 }
        ]
      }
    },
    {
      $unwind: {
        path: '$location',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        name: 1,
        status: 1,
        power_level: 1,
        abilities: 1,
        'location.name': 1,
        'location.danger_level': 1,
        reports: {
          $map: {
            input: '$reports',
            as: 'r',
            in: {
              health: '$$r.health',
              morale: '$$r.morale',
              report: '$$r.report',
              timestamp: '$$r.timestamp'
            }
          }
        },
        threat_count: { $size: '$nearby_threats' },
        nearby_threats: {
          $map: {
            input: '$nearby_threats',
            as: 't',
            in: {
              creature_id: '$$t.creature_id',
              description: '$$t.description',
              timestamp: '$$t.timestamp'
            }
          }
        }
      }
    },
    {
      $sort: { power_level: -1 }
    }
  ],

  // Expert: Rescue mission planning - find safest route to missing members
  rescueMissionPlanning: [
    {
      $match: {
        status: { $in: ['missing', 'endangered'] }
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'location_id',
        foreignField: '_id',
        as: 'target_location'
      }
    },
    {
      $unwind: '$target_location'
    },
    {
      $lookup: {
        from: 'sightings',
        let: { loc_id: '$location_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$location_id', '$$loc_id'] },
              timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
          },
          {
            $lookup: {
              from: 'creatures',
              localField: 'creature_id',
              foreignField: '_id',
              as: 'creature'
            }
          },
          { $unwind: '$creature' },
          {
            $group: {
              _id: '$creature_id',
              creature_name: { $first: '$creature.name' },
              threat_level: { $first: '$creature.threat_level' },
              sighting_count: { $sum: 1 },
              last_seen: { $max: '$timestamp' }
            }
          }
        ],
        as: 'area_threats'
      }
    },
    {
      $lookup: {
        from: 'status_reports',
        localField: '_id',
        foreignField: 'character_id',
        as: 'last_report',
        pipeline: [
          { $sort: { timestamp: -1 } },
          { $limit: 1 }
        ]
      }
    },
    {
      $unwind: {
        path: '$last_report',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        rescue_difficulty: {
          $add: [
            '$target_location.danger_level',
            { $multiply: [{ $size: '$area_threats' }, 2] }
          ]
        },
        time_since_contact: {
          $divide: [
            { $subtract: [new Date(), { $ifNull: ['$last_report.timestamp', '$last_seen'] }] },
            1000 * 60 * 60 // hours
          ]
        }
      }
    },
    {
      $project: {
        name: 1,
        status: 1,
        'target_location.name': 1,
        'target_location.danger_level': 1,
        'target_location.features': 1,
        area_threats: 1,
        'last_report.report': 1,
        'last_report.health': 1,
        rescue_difficulty: { $round: ['$rescue_difficulty', 0] },
        time_since_contact: { $round: ['$time_since_contact', 1] }
      }
    },
    {
      $sort: { rescue_difficulty: 1 }
    }
  ]
};

export const mission2Explanations = {
  findCharactersWithLocation: {
    title: 'Basic $lookup Join',
    description: 'Join characters with their location data',
    stages: [
      {
        stage: '$lookup',
        code: '{ from: "locations", localField: "location_id", foreignField: "_id", as: "current_location" }',
        explanation: '$lookup performs a LEFT OUTER JOIN. Matches location_id in characters to _id in locations.'
      },
      {
        stage: '$unwind',
        code: '{ path: "$current_location", preserveNullAndEmptyArrays: true }',
        explanation: '$unwind flattens the array. preserveNullAndEmptyArrays keeps documents without matches.'
      },
      {
        stage: '$project',
        code: '{ name: 1, status: 1, "current_location.name": 1, ... }',
        explanation: 'Select specific fields from both parent and joined documents using dot notation.'
      }
    ],
    mongodbConcepts: ['$lookup', '$unwind', 'Dot Notation'],
    realWorldUse: 'User profiles with addresses, orders with product details, employees with departments'
  },

  findMissingCharacters: {
    title: 'Multiple Joins with Subpipelines',
    description: 'Complex lookups with nested pipeline aggregations',
    stages: [
      {
        stage: '$match',
        code: '{ status: { $in: ["missing", "endangered", "compromised"] } }',
        explanation: '$in operator matches any value in array. Filters before expensive joins.'
      },
      {
        stage: '$lookup with pipeline',
        code: '{ pipeline: [{ $sort: ... }, { $limit: 1 }] }',
        explanation: 'Subpipeline in $lookup allows sorting and limiting joined documents. Gets only latest report.'
      },
      {
        stage: 'Multiple $lookups',
        code: 'status_reports and locations',
        explanation: 'Chain multiple $lookups to join data from several collections.'
      }
    ],
    mongodbConcepts: ['$in Operator', 'Subpipeline in $lookup', 'Multiple Joins'],
    realWorldUse: 'Customer profiles with recent orders, users with latest activity, alerts with context'
  },

  teamStatusWithThreats: {
    title: 'Advanced Multi-Collection Analysis',
    description: 'Join four collections with transformations',
    stages: [
      {
        stage: '$lookup with limit',
        code: 'pipeline: [{ $sort: ... }, { $limit: 3 }]',
        explanation: 'Limiting joined documents improves performance and focuses on recent data.'
      },
      {
        stage: '$map',
        code: '{ input: "$reports", as: "r", in: { health: "$$r.health", ... } }',
        explanation: '$map transforms each element in an array. $$ references variables from "as".'
      },
      {
        stage: '$size',
        code: '{ $size: "$nearby_threats" }',
        explanation: '$size counts array elements. Useful for threat counting without full data.'
      }
    ],
    mongodbConcepts: ['$map Array Transform', '$size', 'Complex Projections'],
    realWorldUse: 'Dashboard aggregations, real-time monitoring, security threat analysis'
  },

  rescueMissionPlanning: {
    title: 'Expert Level: Variable References and Calculations',
    description: 'Dynamic joins with let/expr and computed fields',
    stages: [
      {
        stage: '$lookup with let',
        code: 'let: { loc_id: "$location_id" }, pipeline: [{ $match: { $expr: { $eq: [...] } } }]',
        explanation: '"let" passes variables to subpipeline. $expr enables field comparisons with variables.'
      },
      {
        stage: 'Nested $lookup',
        code: 'Inside subpipeline',
        explanation: '$lookup inside $lookup enables multi-level joins within a single aggregation.'
      },
      {
        stage: '$addFields',
        code: '{ rescue_difficulty: { $add: [...] } }',
        explanation: '$addFields computes new fields. Combine $add, $multiply, $size for complex calculations.'
      },
      {
        stage: 'Date arithmetic',
        code: '{ $subtract: [new Date(), "$timestamp"] }',
        explanation: 'Date subtraction returns milliseconds. Divide to convert to hours/days.'
      }
    ],
    mongodbConcepts: ['let/expr Variables', 'Nested Lookups', '$addFields', 'Date Arithmetic'],
    realWorldUse: 'Risk scoring, priority queuing, SLA calculations, recommendation engines'
  }
};

export default { mission2Pipelines, mission2Explanations };
