# Advanced MongoDB Pipelines

This guide covers advanced aggregation techniques used in Missions 3 and 4.

## $facet - Parallel Pipelines

`$facet` runs multiple pipelines in parallel on the same input documents. Each facet produces an independent result array.

```javascript
db.creatures.aggregate([
  {
    $facet: {
      // Pipeline 1: Count by type
      byType: [
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ],
      
      // Pipeline 2: Top threats
      topThreats: [
        { $sort: { threat_level: -1 } },
        { $limit: 5 },
        { $project: { name: 1, threat_level: 1 } }
      ],
      
      // Pipeline 3: Status breakdown
      statusBreakdown: [
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]
    }
  }
])
```

**Output:**
```javascript
{
  byType: [
    { _id: "predator", count: 4 },
    { _id: "hive_mind", count: 2 }
  ],
  topThreats: [
    { name: "Mind Flayer", threat_level: 10 },
    { name: "Vecna", threat_level: 10 }
  ],
  statusBreakdown: [
    { _id: "active", count: 7 },
    { _id: "destroyed", count: 2 }
  ]
}
```

### Use Cases for $facet
- Dashboard queries (multiple metrics in one call)
- Search result facets (counts by category)
- Multi-dimensional analysis

## $bucket - Group into Ranges

`$bucket` groups numeric values into specified ranges, perfect for histograms and distributions.

```javascript
db.characters.aggregate([
  {
    $bucket: {
      groupBy: "$power_level",
      boundaries: [0, 3, 5, 7, 10, 11],  // Creates ranges: 0-2, 3-4, 5-6, 7-9, 10
      default: "Unknown",                 // Catch-all for values outside boundaries
      output: {
        count: { $sum: 1 },
        characters: { $push: "$name" }
      }
    }
  }
])
```

**Output:**
```javascript
[
  { _id: 0, count: 2, characters: ["...", "..."] },   // power_level 0-2
  { _id: 3, count: 8, characters: ["...", "..."] },   // power_level 3-4
  { _id: 5, count: 2, characters: ["...", "..."] },   // power_level 5-6
  { _id: 7, count: 2, characters: ["...", "..."] },   // power_level 7-9
  { _id: 10, count: 1, characters: ["Eleven"] }       // power_level 10
]
```

### $bucketAuto - Automatic Boundaries

Let MongoDB determine optimal boundaries:

```javascript
{
  $bucketAuto: {
    groupBy: "$age",
    buckets: 4,  // Create 4 buckets
    output: {
      count: { $sum: 1 },
      avgPower: { $avg: "$power_level" }
    }
  }
}
```

## $addFields and $set

Add computed fields without removing existing ones.

```javascript
db.events.aggregate([
  {
    $addFields: {
      // Calculate risk score
      riskScore: {
        $multiply: [
          "$severity",
          { $add: [1, { $multiply: ["$casualties", 0.1] }] }
        ]
      },
      
      // Time since event in hours
      hoursSince: {
        $divide: [
          { $subtract: [new Date(), "$timestamp"] },
          1000 * 60 * 60  // milliseconds to hours
        ]
      },
      
      // Conditional field
      urgency: {
        $cond: {
          if: { $gte: ["$severity", 8] },
          then: "critical",
          else: {
            $cond: {
              if: { $gte: ["$severity", 5] },
              then: "high",
              else: "normal"
            }
          }
        }
      }
    }
  }
])
```

## Advanced $lookup Patterns

### Self-Join (Same Collection)

```javascript
// Find character connections
db.characters.aggregate([
  { $unwind: "$relationships" },
  {
    $lookup: {
      from: "characters",
      localField: "relationships",
      foreignField: "_id",
      as: "connectedCharacter"
    }
  },
  { $unwind: "$connectedCharacter" },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      connections: { $push: "$connectedCharacter.name" }
    }
  }
])
```

### Nested $lookup (Lookup within Lookup)

```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",
      let: { creatureId: "$creature_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$creatureId"] } } },
        {
          $lookup: {
            from: "locations",
            localField: "last_seen_location",
            foreignField: "_id",
            as: "lastLocation"
          }
        }
      ],
      as: "creatureDetails"
    }
  }
])
```

## Array Expressions

### $map - Transform Array Elements

```javascript
{
  $project: {
    name: 1,
    // Transform abilities array
    abilityDescriptions: {
      $map: {
        input: "$abilities",
        as: "ability",
        in: { $concat: ["Skill: ", "$$ability"] }
      }
    }
  }
}
```

### $filter - Filter Array Elements

```javascript
{
  $project: {
    name: 1,
    // Keep only high-priority reports
    criticalReports: {
      $filter: {
        input: "$reports",
        as: "report",
        cond: { $eq: ["$$report.priority", "critical"] }
      }
    }
  }
}
```

### $reduce - Aggregate Array Values

```javascript
{
  $project: {
    name: 1,
    totalDamage: {
      $reduce: {
        input: "$incidents",
        initialValue: 0,
        in: { $add: ["$$value", "$$this.damage"] }
      }
    }
  }
}
```

### $setUnion, $setIntersection - Set Operations

```javascript
{
  $project: {
    allLocations: {
      $setUnion: ["$homeLocations", "$visitedLocations"]
    },
    commonLocations: {
      $setIntersection: ["$homeLocations", "$visitedLocations"]
    }
  }
}
```

## Date Operations

### Extract Date Parts

```javascript
{
  $project: {
    year: { $year: "$timestamp" },
    month: { $month: "$timestamp" },
    day: { $dayOfMonth: "$timestamp" },
    hour: { $hour: "$timestamp" },
    dayOfWeek: { $dayOfWeek: "$timestamp" }
  }
}
```

### Date Formatting

```javascript
{
  $project: {
    formattedDate: {
      $dateToString: {
        format: "%Y-%m-%d %H:%M",
        date: "$timestamp"
      }
    }
  }
}
```

### Timeline Grouping

```javascript
// Group events by month
db.events.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" }
      },
      eventCount: { $sum: 1 },
      events: { $push: "$name" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
])
```

## Text Search

Requires a text index:

```javascript
// Create text index
db.creatures.createIndex({ name: "text", description: "text", tags: "text" })

// Search
db.creatures.aggregate([
  { $match: { $text: { $search: "demogorgon hunter" } } },
  {
    $addFields: {
      searchScore: { $meta: "textScore" }
    }
  },
  { $sort: { searchScore: -1 } },
  { $limit: 10 }
])
```

## Performance Optimization

### 1. Pipeline Order Matters

```javascript
// GOOD: Filter early
[
  { $match: { status: "active" } },  // Reduces docs first
  { $lookup: { ... } }               // Fewer lookups
]

// BAD: Filter late
[
  { $lookup: { ... } },              // Lookups on all docs
  { $match: { status: "active" } }   // Filter after
]
```

### 2. Use explain()

```javascript
db.collection.aggregate([...]).explain("executionStats")

// Check for:
// - IXSCAN vs COLLSCAN (index scan vs collection scan)
// - totalDocsExamined vs nReturned ratio
// - executionTimeMillis
```

### 3. Index for $match

```javascript
// If you frequently run:
{ $match: { status: "active", timestamp: { $gte: date } } }

// Create compound index:
db.collection.createIndex({ status: 1, timestamp: -1 })
```

### 4. Limit Early When Possible

```javascript
// If you only need top 10
[
  { $match: { ... } },
  { $sort: { score: -1 } },
  { $limit: 10 },           // Limit before expensive operations
  { $lookup: { ... } }
]
```

## Complex Example: Intelligence Report

```javascript
db.events.aggregate([
  // 1. Filter high-severity events
  { $match: { severity: { $gte: 8 } } },
  
  // 2. Join with locations
  {
    $lookup: {
      from: "locations",
      localField: "location_id",
      foreignField: "_id",
      as: "location"
    }
  },
  { $unwind: { path: "$location", preserveNullAndEmptyArrays: true } },
  
  // 3. Join with creatures
  {
    $lookup: {
      from: "creatures",
      localField: "creatures_involved",
      foreignField: "_id",
      as: "creatures"
    }
  },
  
  // 4. Calculate threat metrics
  {
    $addFields: {
      threatSum: { $sum: "$creatures.threat_level" },
      riskScore: {
        $multiply: [
          "$severity",
          { $add: [1, { $size: "$creatures" }] }
        ]
      }
    }
  },
  
  // 5. Multi-faceted analysis
  {
    $facet: {
      topEvents: [
        { $sort: { riskScore: -1 } },
        { $limit: 5 }
      ],
      byLocation: [
        { $group: { _id: "$location.name", count: { $sum: 1 } } }
      ],
      timeline: [
        {
          $group: {
            _id: { $month: "$timestamp" },
            events: { $sum: 1 },
            avgSeverity: { $avg: "$severity" }
          }
        }
      ]
    }
  }
])
```

## Next Steps

- Practice these techniques in [Mission 3: Parallel Dimensions](/)
- Master complex pipelines in [Mission 4: Upside Down Intelligence](/)
- Experiment in the [Query Playground](/playground)
