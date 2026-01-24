# MongoDB Aggregation Framework

The Aggregation Framework is MongoDB's data processing powerhouse. It allows you to transform, filter, group, and analyze data through a pipeline of stages.

## What is a Pipeline?

A pipeline is an array of stages. Documents enter the pipeline and are transformed as they pass through each stage.

```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 },
  // ...more stages
])
```

Think of it like an assembly line:
```
Documents → [Stage 1] → [Stage 2] → [Stage 3] → Results
```

## Core Pipeline Stages

### $match - Filter Documents

`$match` filters documents, similar to `find()`. **Place it early** in your pipeline for performance.

```javascript
// Find active characters with high power
db.characters.aggregate([
  {
    $match: {
      status: "active",
      power_level: { $gte: 5 }
    }
  }
])
```

Supports all query operators:
```javascript
{
  $match: {
    $or: [
      { status: "missing" },
      { status: "endangered" }
    ],
    team: { $in: ["hawkins_heroes"] }
  }
}
```

### $project - Reshape Documents

`$project` specifies which fields to include, exclude, or compute.

```javascript
db.characters.aggregate([
  {
    $project: {
      name: 1,                    // Include
      _id: 0,                     // Exclude
      displayName: {              // Compute new field
        $concat: ["$name", " (", "$alias", ")"]
      },
      ageNextYear: {
        $add: ["$age", 1]
      }
    }
  }
])
```

### $group - Aggregate Data

`$group` groups documents by a key and applies accumulators.

```javascript
// Count characters by status
db.characters.aggregate([
  {
    $group: {
      _id: "$status",           // Group by status
      count: { $sum: 1 },       // Count documents
      avgPower: { $avg: "$power_level" },
      members: { $push: "$name" }  // Collect names into array
    }
  }
])
```

**Accumulators:**
| Operator | Description |
|----------|-------------|
| `$sum` | Sum of values |
| `$avg` | Average |
| `$min` | Minimum value |
| `$max` | Maximum value |
| `$first` | First value in group |
| `$last` | Last value in group |
| `$push` | Collect all values into array |
| `$addToSet` | Collect unique values |

### $sort - Order Results

```javascript
// Sort by power level (descending), then name (ascending)
db.characters.aggregate([
  {
    $sort: {
      power_level: -1,  // Descending
      name: 1           // Ascending
    }
  }
])
```

### $limit and $skip - Pagination

```javascript
// Get page 2, 10 items per page
db.characters.aggregate([
  { $sort: { name: 1 } },
  { $skip: 10 },    // Skip first 10
  { $limit: 10 }    // Take next 10
])
```

### $lookup - Join Collections

`$lookup` performs a left outer join with another collection.

**Basic Syntax:**
```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",         // Collection to join
      localField: "creature_id", // Field in sightings
      foreignField: "_id",       // Field in creatures
      as: "creature"             // Output array name
    }
  }
])
```

**Advanced Pipeline Syntax:**
```javascript
db.characters.aggregate([
  {
    $lookup: {
      from: "status_reports",
      let: { charId: "$_id" },   // Variables for pipeline
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$character_id", "$$charId"] }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 1 }
      ],
      as: "latestReport"
    }
  }
])
```

### $unwind - Flatten Arrays

`$unwind` deconstructs arrays, creating one document per element.

```javascript
// Before: { name: "Eleven", abilities: ["telekinesis", "remote viewing"] }
// After $unwind:
//   { name: "Eleven", abilities: "telekinesis" }
//   { name: "Eleven", abilities: "remote viewing" }

db.characters.aggregate([
  { $unwind: "$abilities" },
  {
    $group: {
      _id: "$abilities",
      characters: { $push: "$name" }
    }
  }
])
```

**Preserving empty arrays:**
```javascript
{
  $unwind: {
    path: "$relationships",
    preserveNullAndEmptyArrays: true
  }
}
```

## Combining Stages

A typical aggregation combines multiple stages:

```javascript
// Find top 5 locations by sighting count
db.sightings.aggregate([
  // 1. Filter to confirmed sightings
  { $match: { confirmed: true } },
  
  // 2. Group by location
  {
    $group: {
      _id: "$location_id",
      sightingCount: { $sum: 1 },
      totalCasualties: { $sum: "$casualties" }
    }
  },
  
  // 3. Join with locations for names
  {
    $lookup: {
      from: "locations",
      localField: "_id",
      foreignField: "_id",
      as: "location"
    }
  },
  
  // 4. Flatten location array
  { $unwind: "$location" },
  
  // 5. Reshape output
  {
    $project: {
      _id: 0,
      locationName: "$location.name",
      dangerLevel: "$location.danger_level",
      sightingCount: 1,
      totalCasualties: 1
    }
  },
  
  // 6. Sort and limit
  { $sort: { sightingCount: -1 } },
  { $limit: 5 }
])
```

## Performance Tips

1. **$match early**: Filter documents before expensive operations
2. **$project early**: Remove unneeded fields to reduce memory
3. **Use indexes**: `$match` at the start can use indexes
4. **$group before $lookup**: Reduce documents before joining
5. **Use explain()**: Check query plans

```javascript
// Check performance
db.collection.aggregate([...]).explain("executionStats")
```

## Common Patterns

### Counting by Category
```javascript
{
  $group: {
    _id: "$category",
    count: { $sum: 1 }
  }
}
```

### Getting Latest Records
```javascript
[
  { $sort: { timestamp: -1 } },
  {
    $group: {
      _id: "$user_id",
      latestRecord: { $first: "$$ROOT" }
    }
  }
]
```

### Conditional Counting
```javascript
{
  $group: {
    _id: null,
    total: { $sum: 1 },
    active: {
      $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] }
    }
  }
}
```

## Next Steps

- Learn about [Advanced Pipelines](./advanced-pipelines.md)
- Practice in [Mission 1: Find the Demogorgon](/)
- Explore the [Playground](/playground) to test your own queries
