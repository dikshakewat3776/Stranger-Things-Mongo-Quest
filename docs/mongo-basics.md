# MongoDB Basics

## What is MongoDB?

MongoDB is a **document-oriented NoSQL database**. Instead of storing data in tables with rows and columns like traditional SQL databases, MongoDB stores data as **JSON-like documents** in collections.

## Key Concepts

### Documents

A document is the basic unit of data in MongoDB, similar to a row in SQL. Documents are stored in BSON (Binary JSON) format.

```javascript
// Example Character Document
{
  "_id": "char_001",
  "name": "Eleven",
  "age": 14,
  "abilities": ["telekinesis", "remote viewing"],
  "status": "active",
  "metadata": {
    "created_at": ISODate("2024-01-15"),
    "last_seen": ISODate("2024-03-20")
  }
}
```

### Collections

A collection is a group of documents, similar to a table in SQL. Collections don't enforce a schema - documents in the same collection can have different fields.

```
Database: stranger_things_quest
├── Collection: characters
├── Collection: creatures
├── Collection: locations
├── Collection: sightings
├── Collection: status_reports
└── Collection: events
```

### _id Field

Every document has a unique `_id` field. If you don't provide one, MongoDB automatically generates an ObjectId.

```javascript
// Auto-generated ObjectId
{ "_id": ObjectId("507f1f77bcf86cd799439011") }

// Custom string ID
{ "_id": "char_001" }
```

## CRUD Operations

### Create

```javascript
// Insert one document
db.characters.insertOne({
  name: "Eleven",
  age: 14,
  status: "active"
})

// Insert multiple documents
db.characters.insertMany([
  { name: "Mike", age: 14 },
  { name: "Dustin", age: 14 }
])
```

### Read

```javascript
// Find all documents
db.characters.find()

// Find with filter
db.characters.find({ status: "active" })

// Find one document
db.characters.findOne({ name: "Eleven" })

// Find with projection (select specific fields)
db.characters.find(
  { status: "active" },
  { name: 1, age: 1, _id: 0 }
)
```

### Update

```javascript
// Update one document
db.characters.updateOne(
  { name: "Eleven" },
  { $set: { power_level: 10 } }
)

// Update multiple documents
db.characters.updateMany(
  { team: "hawkins_heroes" },
  { $inc: { missions_completed: 1 } }
)

// Replace entire document
db.characters.replaceOne(
  { _id: "char_001" },
  { name: "El", age: 15, status: "active" }
)
```

### Delete

```javascript
// Delete one document
db.characters.deleteOne({ name: "Billy" })

// Delete multiple documents
db.characters.deleteMany({ status: "deceased" })
```

## Query Operators

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Equal | `{ age: { $eq: 14 } }` |
| `$ne` | Not equal | `{ status: { $ne: "deceased" } }` |
| `$gt` | Greater than | `{ power_level: { $gt: 5 } }` |
| `$gte` | Greater than or equal | `{ age: { $gte: 18 } }` |
| `$lt` | Less than | `{ threat_level: { $lt: 5 } }` |
| `$lte` | Less than or equal | `{ casualties: { $lte: 10 } }` |
| `$in` | In array | `{ status: { $in: ["active", "missing"] } }` |
| `$nin` | Not in array | `{ role: { $nin: ["antagonist"] } }` |

### Logical Operators

```javascript
// $and - All conditions must match
db.characters.find({
  $and: [
    { age: { $gte: 14 } },
    { status: "active" }
  ]
})

// $or - Any condition matches
db.characters.find({
  $or: [
    { status: "missing" },
    { status: "endangered" }
  ]
})

// $not - Negates condition
db.characters.find({
  age: { $not: { $lt: 18 } }
})
```

### Array Operators

```javascript
// $elemMatch - Match array element
db.characters.find({
  abilities: { $elemMatch: { $eq: "telekinesis" } }
})

// $size - Match array length
db.characters.find({
  relationships: { $size: 3 }
})

// $all - Match all values
db.characters.find({
  abilities: { $all: ["telekinesis", "remote viewing"] }
})
```

## Indexes

Indexes improve query performance by allowing MongoDB to quickly locate documents.

### Creating Indexes

```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Unique index
db.characters.createIndex({ name: 1 }, { unique: true })

// Text index for search
db.creatures.createIndex({ name: "text", description: "text" })
```

### Viewing Indexes

```javascript
// List all indexes on a collection
db.characters.getIndexes()

// Check if query uses index
db.characters.find({ name: "Eleven" }).explain("executionStats")
```

## Schema Design

### Embedding vs Referencing

**Embed** when:
- Data is accessed together
- One-to-few relationship
- Data doesn't change often

```javascript
// Embedded - abilities are part of character
{
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing"]
}
```

**Reference** when:
- Data is accessed independently
- One-to-many or many-to-many
- Data changes frequently

```javascript
// Referenced - sighting references creature
{
  creature_id: "creature_001",  // Reference to creatures collection
  location_id: "loc_006",       // Reference to locations collection
  casualties: 3
}
```

## Next Steps

- Learn about the [Aggregation Framework](./aggregations.md)
- Explore [Advanced Pipelines](./advanced-pipelines.md)
- Start [Mission 1](/) to practice these concepts!
