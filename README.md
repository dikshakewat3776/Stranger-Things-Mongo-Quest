# 🔮 Stranger Things Mongo Quest

<div align="center">

![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

**A game-based learning application that teaches advanced MongoDB/NoSQL concepts through interactive missions inspired by the Stranger Things universe.**

[🎮 Start Playing](#quick-start) • [📚 Learn MongoDB](#mongodb-concepts) • [🗺️ Missions](#missions) • [💻 Tech Stack](#tech-stack)

</div>

---

## 🎯 What is This Project?

Stranger Things Mongo Quest is a **portfolio-grade full-stack application** that serves three purposes:

1. **🎮 A Playable Learning Game** - Complete missions, track progress, and learn through story-driven challenges
2. **📘 A Step-by-Step MongoDB Guide** - Each mission teaches specific concepts with detailed explanations
3. **💼 A Technical Showcase** - Demonstrates deep MongoDB expertise and modern web development skills

## 🖼️ Screenshots

### Home Page - Mission Selection
```
╔══════════════════════════════════════════════════════════════╗
║  🔮 STRANGER THINGS MONGO QUEST                              ║
║                                                              ║
║  [🧟 Mission 1] [🧭 Mission 2] [🔀 Mission 3] [📊 Mission 4] ║
║                                                              ║
║  Master MongoDB through the Upside Down...                   ║
╚══════════════════════════════════════════════════════════════╝
```

### Mission Interface - Three-Panel Layout
```
┌─────────────┬─────────────────────────┬─────────────────┐
│  Objectives │   Query Editor          │  Explanations   │
│             │                         │                 │
│  ○ Task 1   │  db.sightings.aggregate │  💡 $match      │
│  ● Task 2   │  ([                     │  filters docs   │
│  ○ Task 3   │    { $match: {...} }    │  early in the   │
│  ○ Task 4   │  ])                     │  pipeline...    │
│             │                         │                 │
│  [Execute]  │  Results: 15 docs       │  Concepts:      │
│             │  Time: 3ms              │  • Filtering    │
│  Progress   │                         │  • Indexing     │
│  ████░░ 50% │  [View Results ↓]       │  • Operators    │
└─────────────┴─────────────────────────┴─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **MongoDB 6.0+** (local or Atlas)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stranger-things-mongo-quest.git
cd stranger-things-mongo-quest

# Install dependencies
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
# Edit .env with your MongoDB connection string

# Seed the database with Stranger Things data
npm run seed

# Start the development servers
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## 🧠 MongoDB Concepts

This project teaches MongoDB **from basics to advanced**, with each concept tied to a game mission.

### Why NoSQL / MongoDB?

MongoDB is ideal for this project because:

| Requirement | Why MongoDB Excels |
|-------------|-------------------|
| **Flexible Schema** | Characters, creatures, and events have varying attributes |
| **Nested Data** | Abilities, equipment, and relationships embed naturally |
| **Aggregation Power** | Complex analytics for threat assessment and intelligence |
| **Real-time Queries** | Quick lookups for interactive gameplay |
| **Scalability** | Handles growing datasets as the story expands |

### Core Concepts Covered

#### 1. **Aggregation Framework**
The heart of MongoDB data processing - a pipeline of stages that transform data.

```javascript
db.sightings.aggregate([
  { $match: { confirmed: true } },           // Filter
  { $group: { _id: "$location_id", count: { $sum: 1 } } },  // Group
  { $sort: { count: -1 } },                  // Sort
  { $limit: 5 }                              // Limit
])
```

#### 2. **Pipeline Stages**

| Stage | Purpose | Mission |
|-------|---------|---------|
| `$match` | Filter documents | Mission 1 |
| `$project` | Reshape documents | Mission 1 |
| `$group` | Aggregate data | Mission 1 |
| `$sort` | Order results | Mission 1 |
| `$lookup` | Join collections | Mission 2 |
| `$unwind` | Flatten arrays | Mission 2 |
| `$facet` | Parallel pipelines | Mission 3 |
| `$bucket` | Group into ranges | Mission 3 |
| `$addFields` | Compute new fields | Mission 4 |

#### 3. **Indexing Strategies**

```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Text index for search
db.creatures.createIndex({ name: "text", description: "text" })
```

#### 4. **Schema Design**

**Embedded Documents** (One-to-Few):
```javascript
// Character with embedded abilities
{
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing", "dimensional travel"]
}
```

**Referenced Documents** (One-to-Many):
```javascript
// Sighting referencing creature and location
{
  creature_id: "creature_001",  // Reference
  location_id: "loc_006",       // Reference
  casualties: 3
}
```

---

## 🗺️ Missions

### 🧟 Mission 1: Find the Demogorgon
**Difficulty:** Beginner | **Concepts:** `$match`, `$project`, `$sort`, `$group`

> *"Reports are flooding in from across Hawkins. Something is hunting in our town..."*

**Objectives:**
1. Find all Demogorgon sightings using `$match`
2. Filter confirmed sightings with casualties
3. Analyze activity patterns by location
4. Create comprehensive threat report with `$lookup`

**Key Learning:**
```javascript
// Finding high-threat sightings
{
  $match: {
    creature_id: "creature_001",
    confirmed: true,
    casualties: { $gt: 0 }
  }
}
```

---

### 🧭 Mission 2: Search the Lost Team
**Difficulty:** Intermediate | **Concepts:** `$lookup`, `$unwind`, Subpipelines

> *"We've lost contact with several team members. Joyce needs you to find them..."*

**Objectives:**
1. Join characters with their current locations
2. Find missing members with their last status reports
3. Build complete team overview with threat data
4. Create rescue mission planning report

**Key Learning:**
```javascript
// Joining characters with locations
{
  $lookup: {
    from: "locations",
    localField: "location_id",
    foreignField: "_id",
    as: "current_location"
  }
}
```

---

### 🔀 Mission 3: Parallel Dimensions
**Difficulty:** Advanced | **Concepts:** `$facet`, `$bucket`, Multi-perspective Analysis

> *"We need comprehensive intelligence - threat levels, survivor counts, danger zones - all at once..."*

**Objectives:**
1. Run parallel threat analysis with `$facet`
2. Analyze zone dangers from multiple perspectives
3. Create situation analysis with `$bucket` distributions
4. Build strategic intelligence dashboard

**Key Learning:**
```javascript
// Parallel analysis with $facet
{
  $facet: {
    byType: [{ $group: { _id: "$type", count: { $sum: 1 } } }],
    topThreats: [{ $sort: { threat_level: -1 } }, { $limit: 5 }],
    statusBreakdown: [{ $group: { _id: "$status", count: { $sum: 1 } } }]
  }
}
```

---

### 📊 Mission 4: Upside Down Intelligence
**Difficulty:** Expert | **Concepts:** Complex Pipelines, Performance, Text Search

> *"The final battle approaches. Build the intelligence system that will save Hawkins..."*

**Objectives:**
1. Build comprehensive threat intelligence report
2. Analyze events over time with timeline aggregation
3. Map character relationship networks
4. Optimize queries for performance

**Key Learning:**
```javascript
// Performance-optimized pipeline
[
  { $match: { confirmed: true } },           // Filter early (uses index)
  { $project: { creature_id: 1, casualties: 1 } },  // Reduce data
  { $group: { _id: "$creature_id", total: { $sum: "$casualties" } } },
  { $lookup: { from: "creatures", ... } }    // Lookup AFTER grouping
]
```

---

## 💼 Real-World Applications

The skills learned in this game apply directly to production scenarios:

| Game Concept | Real-World Use Case |
|--------------|---------------------|
| Finding Demogorgon sightings | **Fraud Detection** - Finding suspicious transactions |
| Tracking team members | **User Analytics** - Joining user profiles with activities |
| Threat level analysis | **Risk Assessment** - Scoring and categorizing risks |
| Timeline analysis | **Financial Reports** - Time-series aggregations |
| Network relationships | **Social Networks** - Friend graphs, recommendations |
| Text search | **Search Engines** - Product/content discovery |
| Performance optimization | **High-Volume Analytics** - Dashboard queries |

---

## 💻 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Driver** - Native MongoDB connection
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **react-syntax-highlighter** - Code display
- **Lucide React** - Icons

### Database
- **MongoDB 6.0+** - Document database
- 6 collections with rich relationships
- Comprehensive indexing strategy
- 15+ pre-built aggregation pipelines

---

## 📦 Project Structure

```
Stranger-Things-Mongo-Quest/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── missions.js      # Mission endpoints
│   │   │   ├── data.js          # Data exploration
│   │   │   ├── pipelines.js     # Custom pipeline execution
│   │   │   └── learning.js      # Learning content
│   │   ├── config/
│   │   │   └── database.js      # MongoDB connection
│   │   ├── datasets/
│   │   │   ├── characters.js    # 15 characters
│   │   │   ├── creatures.js     # 10 creatures
│   │   │   ├── locations.js     # 15 locations
│   │   │   ├── sightings.js     # 15 sightings
│   │   │   ├── statusReports.js # 15 reports
│   │   │   └── events.js        # 15 events
│   │   ├── pipelines/
│   │   │   ├── mission1.js      # $match, $group
│   │   │   ├── mission2.js      # $lookup, $unwind
│   │   │   ├── mission3.js      # $facet, $bucket
│   │   │   └── mission4.js      # Complex pipelines
│   │   ├── seed/
│   │   │   └── seedDatabase.js  # Database seeding
│   │   └── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx       # App layout
│   │   │   ├── QueryEditor.jsx  # Pipeline editor
│   │   │   ├── ResultsPanel.jsx # Query results
│   │   │   └── ExplanationPanel.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Mission.jsx      # Mission interface
│   │   │   ├── DataExplorer.jsx # Browse data
│   │   │   ├── Learning.jsx     # Concept docs
│   │   │   └── Playground.jsx   # Custom queries
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css            # Stranger Things theme
│   ├── tailwind.config.js       # Custom theme
│   └── package.json
├── docs/
│   ├── mongo-basics.md
│   ├── aggregations.md
│   └── advanced-pipelines.md
└── README.md
```

---

## 🎨 UI Theme

The interface is designed with a **dark, cinematic aesthetic** inspired by Stranger Things:

- **Background**: Deep black / charcoal (#0a0a0a)
- **Primary Color**: Blood red / neon red (#8B0000, #FF0040)
- **Secondary**: Muted greys, fog textures
- **Accents**: Subtle glowing effects, neon highlights

### Visual Effects
- Fog overlays and particle animations
- Glitch effects on titles
- Neon border glows
- Scanline textures
- Flickering animations

---

## 🔧 API Endpoints

### Missions
```
GET  /api/missions           # List all missions
GET  /api/missions/:id       # Get mission details
POST /api/missions/:id/execute/:queryName  # Execute mission query
```

### Data
```
GET  /api/data/:collection   # Browse collection data
GET  /api/data/:collection/:id  # Get single document
GET  /api/data/search/all?q=  # Search across collections
```

### Pipelines
```
POST /api/pipelines/execute  # Run custom pipeline
GET  /api/pipelines/stages   # Pipeline stage reference
GET  /api/pipelines/operators # Operator reference
POST /api/pipelines/validate # Validate pipeline syntax
```

### Learning
```
GET  /api/learning/concepts  # MongoDB concepts
GET  /api/learning/missions/:id/explanations  # Mission explanations
POST /api/learning/pipeline/visualize  # Step-by-step visualization
GET  /api/learning/quiz/:missionId  # Quiz questions
```

---

## 🧪 Database Schema

### Characters Collection
```javascript
{
  _id: "char_001",
  name: "Eleven",
  alias: "El",
  age: 14,
  status: "active",
  role: "protagonist",
  abilities: ["telekinesis", "remote viewing"],
  power_level: 10,
  location_id: "loc_001",
  team: "hawkins_heroes",
  relationships: ["char_002", "char_003"]
}
```

### Creatures Collection
```javascript
{
  _id: "creature_001",
  name: "Demogorgon",
  type: "predator",
  threat_level: 9,
  abilities: ["dimension travel", "regeneration"],
  weaknesses: ["fire", "telekinesis"],
  confirmed_kills: 12,
  status: "active"
}
```

### Sightings Collection
```javascript
{
  _id: "sight_001",
  creature_id: "creature_001",
  location_id: "loc_006",
  witness_ids: ["char_001", "char_012"],
  timestamp: ISODate("2024-01-15"),
  confirmed: true,
  casualties: 3,
  threat_response: "combat"
}
```

---

## 📈 Performance Considerations

### Indexing Strategy
```javascript
// Characters - text search and lookups
{ name: 1 }, { status: 1 }, { location_id: 1 }
{ name: "text", abilities: "text", backstory: "text" }

// Sightings - frequent query patterns
{ creature_id: 1 }, { location_id: 1 }, { timestamp: -1 }
{ creature_id: 1, location_id: 1 }  // Compound

// Events - timeline queries
{ timestamp: -1 }, { type: 1 }, { severity: -1 }
```

### Query Optimization Tips
1. **Place $match first** - Reduces documents before expensive operations
2. **Project early** - Only include needed fields
3. **$group before $lookup** - Aggregate first, join later
4. **Use covered queries** - Include all fields in index
5. **Check with explain()** - Verify index usage

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Stranger Things** - For the amazing universe and aesthetic inspiration
- **MongoDB** - For the powerful aggregation framework
- **The MongoDB Community** - For excellent documentation and resources

---

<div align="center">

**Built with 🔮 by a MongoDB enthusiast**

*"Friends don't lie. And the data doesn't lie either."*

</div>



## 6. MongoDB Concepts & Advanced Questions

This section covers all MongoDB concepts taught in this project and provides comprehensive  preparation with advanced questions and answers.

---

### 6.1 MongoDB Concepts Learned in This Project

#### Core Aggregation Framework Concepts

**1. Aggregation Pipeline Basics**
- Pipeline is an array of stages that transform documents sequentially
- Documents flow through stages like an assembly line
- Each stage processes documents and passes results to the next stage

**2. Essential Pipeline Stages**

| Stage | Purpose | Example Use Case |
|-------|---------|------------------|
| `$match` | Filter documents (like WHERE in SQL) | Find active characters, confirmed sightings |
| `$project` | Reshape documents (like SELECT in SQL) | Include/exclude fields, compute new fields |
| `$group` | Aggregate data (like GROUP BY in SQL) | Count by category, calculate averages |
| `$sort` | Order results | Sort by timestamp, power level |
| `$limit` / `$skip` | Pagination | Get top 10, skip first 20 |
| `$lookup` | Join collections (like JOIN in SQL) | Combine sightings with creature details |
| `$unwind` | Flatten arrays | Expand abilities array into separate documents |
| `$facet` | Run parallel pipelines | Multiple analyses in one query |
| `$bucket` | Group into ranges | Create histograms, distributions |
| `$addFields` / `$set` | Add computed fields | Calculate risk scores, time differences |

**3. Comparison Operators**

```javascript
// Used in $match stages
{
  $match: {
    power_level: { $gt: 5 },        // Greater than
    age: { $gte: 18 },               // Greater than or equal
    casualties: { $lt: 10 },          // Less than
    threat_level: { $lte: 7 },       // Less than or equal
    status: { $in: ["active", "missing"] },  // In array
    name: { $nin: ["Vecna", "Mind Flayer"] }, // Not in array
    status: { $ne: "destroyed" },    // Not equal
    description: { $exists: true },   // Field exists
    abilities: { $size: 3 }           // Array size
  }
}
```

**4. Logical Operators**

```javascript
{
  $match: {
    $or: [
      { status: "missing" },
      { status: "endangered" }
    ],
    $and: [
      { team: "hawkins_heroes" },
      { power_level: { $gte: 5 } }
    ],
    $not: { status: "destroyed" }
  }
}
```

**5. Accumulators (Used in $group)**

| Accumulator | Purpose | Example |
|-------------|---------|--------|
| `$sum` | Sum values or count | `{ count: { $sum: 1 } }` |
| `$avg` | Calculate average | `{ avgPower: { $avg: "$power_level" } }` |
| `$min` / `$max` | Find extremes | `{ firstSighting: { $min: "$timestamp" } }` |
| `$first` / `$last` | Get first/last value | `{ latest: { $first: "$reports" } }` |
| `$push` | Collect into array | `{ members: { $push: "$name" } }` |
| `$addToSet` | Collect unique values | `{ uniqueLocations: { $addToSet: "$location_id" } }` |

**6. Array Expressions**

```javascript
// $filter - Filter array elements
{
  $project: {
    criticalReports: {
      $filter: {
        input: "$reports",
        as: "report",
        cond: { $eq: ["$$report.priority", "critical"] }
      }
    }
  }
}

// $map - Transform array elements
{
  $project: {
    abilityDescriptions: {
      $map: {
        input: "$abilities",
        as: "ability",
        in: { $concat: ["Skill: ", "$$ability"] }
      }
    }
  }
}

// $reduce - Aggregate array values
{
  $project: {
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

**7. Conditional Expressions**

```javascript
// $cond - If/else logic
{
  $project: {
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

// $switch - Multiple conditions
{
  $project: {
    statusLabel: {
      $switch: {
        branches: [
          { case: { $eq: ["$status", "active"] }, then: "Operational" },
          { case: { $eq: ["$status", "missing"] }, then: "Missing in Action" },
          { case: { $eq: ["$status", "endangered"] }, then: "At Risk" }
        ],
        default: "Unknown"
      }
    }
  }
}
```

**8. Date Operations**

```javascript
// Extract date parts
{
  $project: {
    year: { $year: "$timestamp" },
    month: { $month: "$timestamp" },
    day: { $dayOfMonth: "$timestamp" },
    hour: { $hour: "$timestamp" },
    dayOfWeek: { $dayOfWeek: "$timestamp" }
  }
}

// Format dates
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

// Calculate time differences
{
  $project: {
    hoursSince: {
      $divide: [
        { $subtract: [new Date(), "$timestamp"] },
        1000 * 60 * 60  // milliseconds to hours
      ]
    }
  }
}
```

**9. String Operations**

```javascript
{
  $project: {
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    upperName: { $toUpper: "$name" },
    lowerName: { $toLower: "$name" },
    nameLength: { $strLenCP: "$name" },
    substring: { $substr: ["$description", 0, 100] }
  }
}
```

**10. Mathematical Operations**

```javascript
{
  $project: {
    total: { $add: ["$price", "$tax"] },
    discount: { $subtract: ["$price", "$salePrice"] },
    totalCost: { $multiply: ["$quantity", "$price"] },
    average: { $divide: ["$total", "$count"] },
    power: { $pow: ["$base", 2] },
    rounded: { $round: ["$value", 2] }
  }
}
```

#### Advanced Concepts

**1. $lookup with Pipeline**
```javascript
{
  $lookup: {
    from: "status_reports",
    let: { charId: "$_id" },
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
```

**2. $facet - Parallel Pipelines**
```javascript
{
  $facet: {
    byType: [
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],
    topThreats: [
      { $sort: { threat_level: -1 } },
      { $limit: 5 }
    ],
    statusBreakdown: [
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]
  }
}
```

**3. $bucket - Group into Ranges**
```javascript
{
  $bucket: {
    groupBy: "$power_level",
    boundaries: [0, 3, 5, 7, 10, 11],
    default: "Unknown",
    output: {
      count: { $sum: 1 },
      characters: { $push: "$name" }
    }
  }
}
```

**4. Indexing Strategies**
```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Text index for search
db.creatures.createIndex({ name: "text", description: "text" })

// TTL index (auto-delete after time)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

**5. Performance Optimization**
- Place `$match` early to filter documents
- Use `$project` early to reduce document size
- Create indexes for fields used in `$match`
- Use `$group` before `$lookup` when possible
- Use `$limit` early when you only need top N results

---

### 6.2 Advanced MongoDB  Questions & Answers

#### Aggregation Framework

**Q1: What is the MongoDB Aggregation Framework and how does it differ from simple queries?**

**Answer:**
The Aggregation Framework is MongoDB's data processing pipeline that allows you to transform, filter, group, and analyze documents through a series of stages.

**Differences from simple queries:**
- **Simple queries** (`find()`) return documents as-is
- **Aggregation** can transform documents, compute new fields, join collections, and perform complex analytics
- Aggregation supports multi-stage processing, while `find()` is single-stage
- Aggregation can return computed results (counts, averages, grouped data)

```javascript
// Simple query - returns documents
db.characters.find({ status: "active" })

// Aggregation - transforms and analyzes
db.characters.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

---

**Q2: Explain the difference between $match and $group stages.**

**Answer:**

| `$match` | `$group` |
|----------|----------|
| Filters documents (like WHERE) | Aggregates documents (like GROUP BY) |
| Returns individual documents | Returns grouped/aggregated results |
| Can use indexes | Cannot use indexes directly |
| Place early in pipeline | Usually after $match |
| Output: Same structure, fewer docs | Output: Different structure, grouped data |

```javascript
// $match - filters
{ $match: { status: "active" } }
// Input: 100 docs → Output: 50 docs (same structure)

// $group - aggregates
{ $group: { _id: "$team", count: { $sum: 1 } } }
// Input: 50 docs → Output: 5 docs (different structure)
```

---

**Q3: What is $lookup and how does it differ from SQL JOINs?**

**Answer:**
`$lookup` performs a left outer join between collections. It's similar to SQL's LEFT OUTER JOIN but with some differences:

**Key Differences:**
- **SQL JOIN**: Combines rows into a single row
- **MongoDB $lookup**: Adds matched documents as an array field
- **SQL**: Can do INNER, LEFT, RIGHT, FULL joins
- **MongoDB**: Only LEFT OUTER JOIN (all docs from left collection)

```javascript
// Basic $lookup
{
  $lookup: {
    from: "locations",           // Collection to join
    localField: "location_id",   // Field in current collection
    foreignField: "_id",         // Field in joined collection
    as: "location"               // Output array name
  }
}

// After $lookup, you get:
// { _id: 1, name: "Eleven", location: [{ name: "Hawkins Lab" }] }
// Need $unwind to flatten: { _id: 1, name: "Eleven", location: { name: "Hawkins Lab" } }
```

**Advanced $lookup with pipeline:**
```javascript
{
  $lookup: {
    from: "status_reports",
    let: { charId: "$_id" },
    pipeline: [
      { $match: { $expr: { $eq: ["$character_id", "$$charId"] } } },
      { $sort: { timestamp: -1 } },
      { $limit: 1 }
    ],
    as: "latestReport"
  }
}
```

---

**Q4: What is $facet and when would you use it?**

**Answer:**
`$facet` runs multiple independent pipelines in parallel on the same input documents. Each facet produces its own result array.

**Use Cases:**
- Dashboard queries (multiple metrics in one call)
- Search result facets (counts by category, price ranges, etc.)
- Multi-dimensional analysis
- Reducing round trips to database

```javascript
{
  $facet: {
    byType: [
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ],
    topThreats: [
      { $sort: { threat_level: -1 } },
      { $limit: 5 }
    ],
    statusBreakdown: [
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]
  }
}

// Output:
{
  byType: [{ _id: "predator", count: 4 }],
  topThreats: [{ name: "Mind Flayer", threat_level: 10 }],
  statusBreakdown: [{ _id: "active", count: 7 }]
}
```

**Benefits:**
- Single database call instead of multiple
- All facets use same input data (consistent snapshot)
- Better performance than multiple separate queries

---

**Q5: Explain $unwind and when you need preserveNullAndEmptyArrays.**

**Answer:**
`$unwind` deconstructs an array field, creating one document per array element.

```javascript
// Before $unwind
{ name: "Eleven", abilities: ["telekinesis", "remote viewing"] }

// After $unwind
{ name: "Eleven", abilities: "telekinesis" }
{ name: "Eleven", abilities: "remote viewing" }
```

**preserveNullAndEmptyArrays:**
- **Default (false)**: Documents with null/empty arrays are removed
- **true**: Documents with null/empty arrays are preserved (with null value)

```javascript
// Without preserveNullAndEmptyArrays
{ name: "Mike", abilities: [] }  // This document is REMOVED

// With preserveNullAndEmptyArrays: true
{
  $unwind: {
    path: "$abilities",
    preserveNullAndEmptyArrays: true
  }
}
// { name: "Mike", abilities: null }  // This document is KEPT
```

**When to use preserveNullAndEmptyArrays:**
- When you need to keep documents that don't have the array field
- When doing LEFT JOIN-like operations
- When you want to count documents with/without certain arrays

---

**Q6: What is the difference between $addFields and $project?**

**Answer:**

| `$addFields` | `$project` |
|-------------|------------|
| Adds new fields | Can add, remove, or reshape fields |
| Keeps all existing fields | Must explicitly include fields (or exclude with 0) |
| Cannot remove fields | Can remove fields by setting to 0 |
| Simpler syntax for adding | More control over output shape |

```javascript
// $addFields - adds fields, keeps all existing
{
  $addFields: {
    riskScore: { $multiply: ["$severity", "$casualties"] },
    isCritical: { $gte: ["$severity", 8] }
  }
}
// Output: All original fields + riskScore + isCritical

// $project - can reshape completely
{
  $project: {
    name: 1,                    // Include
    _id: 0,                     // Exclude
    riskScore: { $multiply: ["$severity", "$casualties"] },
    // All other fields are EXCLUDED unless specified
  }
}
// Output: Only name + riskScore
```

**When to use each:**
- `$addFields`: When you want to add computed fields but keep all existing data
- `$project`: When you want to control exactly what fields appear in output

---

**Q7: How do you optimize aggregation pipeline performance?**

**Answer:**

**1. Place $match early:**
```javascript
// GOOD
[
  { $match: { status: "active" } },  // Filter first (uses index)
  { $lookup: { ... } }               // Fewer documents to join
]

// BAD
[
  { $lookup: { ... } },              // Joins all documents
  { $match: { status: "active" } }   // Filter after
]
```

**2. Use $project early:**
```javascript
// Remove unneeded fields early to reduce memory
[
  { $match: { ... } },
  { $project: { name: 1, status: 1 } },  // Reduce document size
  { $group: { ... } }                    // Less data to process
]
```

**3. Create indexes for $match:**
```javascript
// If you frequently filter by status and timestamp
db.collection.createIndex({ status: 1, timestamp: -1 })

// Then $match can use index
{ $match: { status: "active", timestamp: { $gte: date } } }
```

**4. $group before $lookup:**
```javascript
// GOOD - reduce documents before expensive join
[
  { $match: { ... } },
  { $group: { _id: "$location_id", count: { $sum: 1 } } },
  { $lookup: { from: "locations", ... } }  // Join fewer documents
]
```

**5. Use $limit early:**
```javascript
// If you only need top 10
[
  { $match: { ... } },
  { $sort: { score: -1 } },
  { $limit: 10 },                    // Limit before expensive operations
  { $lookup: { ... } }
]
```

**6. Use explain() to analyze:**
```javascript
db.collection.aggregate([...]).explain("executionStats")

// Check for:
// - IXSCAN vs COLLSCAN (index scan vs collection scan)
// - totalDocsExamined vs nReturned ratio
// - executionTimeMillis
```

---

**Q8: What is $bucket and how does it differ from $group?**

**Answer:**

| `$bucket` | `$group` |
|-----------|----------|
| Groups numeric values into predefined ranges | Groups by any field/value |
| Creates histogram-like distributions | More flexible grouping |
| Requires boundaries array | No boundaries needed |
| Automatically handles ranges | Manual range logic needed |

```javascript
// $bucket - automatic range grouping
{
  $bucket: {
    groupBy: "$power_level",
    boundaries: [0, 3, 5, 7, 10, 11],  // Ranges: 0-2, 3-4, 5-6, 7-9, 10
    default: "Unknown",
    output: {
      count: { $sum: 1 },
      characters: { $push: "$name" }
    }
  }
}
// Output: [{ _id: 0, count: 2 }, { _id: 3, count: 8 }, ...]

// $group - manual grouping
{
  $group: {
    _id: {
      $cond: {
        if: { $lt: ["$power_level", 3] },
        then: "Low",
        else: {
          $cond: {
            if: { $lt: ["$power_level", 5] },
            then: "Medium",
            else: "High"
          }
        }
      }
    },
    count: { $sum: 1 }
  }
}
```

**$bucketAuto** - Let MongoDB determine boundaries:
```javascript
{
  $bucketAuto: {
    groupBy: "$age",
    buckets: 4,  // Create 4 equal-sized buckets
    output: {
      count: { $sum: 1 },
      avgPower: { $avg: "$power_level" }
    }
  }
}
```

---

**Q9: How do you handle array operations in aggregation?**

**Answer:**

**1. $unwind - Expand arrays:**
```javascript
// One doc with array → multiple docs
{ $unwind: "$abilities" }
```

**2. $filter - Filter array elements:**
```javascript
{
  $project: {
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

**3. $map - Transform array elements:**
```javascript
{
  $project: {
    formattedAbilities: {
      $map: {
        input: "$abilities",
        as: "ability",
        in: { $concat: ["Skill: ", "$$ability"] }
      }
    }
  }
}
```

**4. $reduce - Aggregate array values:**
```javascript
{
  $project: {
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

**5. $size - Get array length:**
```javascript
{
  $project: {
    abilityCount: { $size: "$abilities" }
  }
}
```

**6. $slice - Get subset of array:**
```javascript
{
  $project: {
    recentReports: { $slice: ["$reports", -5] }  // Last 5
  }
}
```

---

**Q10: What are accumulator operators and when are they used?**

**Answer:**
Accumulator operators are used in `$group` stage to compute aggregated values across documents in a group.

**Common Accumulators:**

| Operator | Purpose | Example |
|----------|---------|---------|
| `$sum` | Sum values or count | `{ count: { $sum: 1 } }` |
| `$avg` | Calculate average | `{ avgPower: { $avg: "$power_level" } }` |
| `$min` / `$max` | Find extremes | `{ firstSighting: { $min: "$timestamp" } }` |
| `$first` / `$last` | Get first/last value | `{ latest: { $first: "$reports" } }` |
| `$push` | Collect into array | `{ members: { $push: "$name" } }` |
| `$addToSet` | Collect unique values | `{ uniqueLocations: { $addToSet: "$location_id" } }` |
| `$stdDevPop` / `$stdDevSamp` | Standard deviation | `{ stdDev: { $stdDevPop: "$scores" } }` |

**Example:**
```javascript
{
  $group: {
    _id: "$team",
    totalMembers: { $sum: 1 },                    // Count
    avgPower: { $avg: "$power_level" },           // Average
    strongest: { $max: "$power_level" },          // Maximum
    weakest: { $min: "$power_level" },           // Minimum
    memberNames: { $push: "$name" },             // Array of all names
    uniqueLocations: { $addToSet: "$location_id" }, // Unique locations
    firstMember: { $first: "$name" }              // First document's name
  }
}
```

**Note:** Accumulators can only be used in `$group` and `$bucket` stages, not in `$project`.

---

#### Indexing & Performance

**Q11: What types of indexes does MongoDB support?**

**Answer:**

**1. Single Field Index:**
```javascript
db.collection.createIndex({ name: 1 })  // Ascending
db.collection.createIndex({ age: -1 })  // Descending
```

**2. Compound Index:**
```javascript
db.collection.createIndex({ status: 1, timestamp: -1 })
// Order matters! Use for queries like:
// { status: "active", timestamp: { $gte: date } }
```

**3. Multikey Index (Arrays):**
```javascript
// Automatically created for array fields
db.characters.createIndex({ abilities: 1 })
// Can use: { abilities: "telekinesis" }
```

**4. Text Index:**
```javascript
db.creatures.createIndex({ name: "text", description: "text" })
// Search: { $text: { $search: "demogorgon hunter" } }
```

**5. Geospatial Index:**
```javascript
db.locations.createIndex({ coordinates: "2dsphere" })
// Query: { coordinates: { $near: { $geometry: {...}, $maxDistance: 1000 } } }
```

**6. Hashed Index:**
```javascript
db.collection.createIndex({ _id: "hashed" })
// Used for sharding
```

**7. TTL Index:**
```javascript
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
// Automatically deletes documents after 1 hour
```

**8. Partial Index:**
```javascript
db.characters.createIndex(
  { name: 1 },
  { partialFilterExpression: { status: "active" } }
)
// Only indexes documents where status is "active"
```

**9. Sparse Index:**
```javascript
db.characters.createIndex({ email: 1 }, { sparse: true })
// Only indexes documents that have the email field
```

---

**Q12: Explain index intersection and when it's used.**

**Answer:**
Index intersection allows MongoDB to use multiple indexes to satisfy a query when a single compound index doesn't exist.

**Example:**
```javascript
// Two separate indexes
db.collection.createIndex({ status: 1 })
db.collection.createIndex({ timestamp: -1 })

// Query uses both indexes
db.collection.find({ status: "active", timestamp: { $gte: date } })
// MongoDB can intersect results from both indexes
```

**When it happens:**
- Query uses multiple fields
- Each field has its own index
- No compound index exists for the combination

**Limitations:**
- Less efficient than compound index
- Only works with equality conditions (not range queries on multiple fields)
- MongoDB prefers compound index if available

**Best Practice:**
Create compound index for common query patterns:
```javascript
// Better than index intersection
db.collection.createIndex({ status: 1, timestamp: -1 })
```

---

**Q13: What is the difference between IXSCAN and COLLSCAN in explain() output?**

**Answer:**

| IXSCAN (Index Scan) | COLLSCAN (Collection Scan) |
|---------------------|----------------------------|
| Uses index to find documents | Scans entire collection |
| Fast (logarithmic time) | Slow (linear time) |
| Efficient for large collections | Inefficient for large collections |
| Uses B-tree structure | Reads every document |

**Example explain() output:**
```javascript
db.collection.find({ status: "active" }).explain("executionStats")

// GOOD - Uses index
{
  "stage": "IXSCAN",
  "indexName": "status_1",
  "executionTimeMillis": 5,
  "totalDocsExamined": 100,
  "nReturned": 100
}

// BAD - Collection scan
{
  "stage": "COLLSCAN",
  "executionTimeMillis": 5000,
  "totalDocsExamined": 1000000,
  "nReturned": 100
}
```

**How to fix COLLSCAN:**
1. Create index on queried field
2. Ensure query can use index (avoid functions on indexed field)
3. Check index is actually used (verify with explain())

---

#### Schema Design

**Q14: When should you embed documents vs. reference them?**

**Answer:**

**Embed (One-to-Few):**
- Small, bounded arrays (typically < 100 items)
- Data accessed together
- Data doesn't change independently
- One-to-one or one-to-few relationships

```javascript
// GOOD for embedding
{
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing"],  // Small array
  stats: {                                       // One-to-one
    power_level: 10,
    health: 100
  }
}
```

**Reference (One-to-Many, Many-to-Many):**
- Large, unbounded arrays
- Data accessed independently
- Data changes frequently
- Many-to-many relationships
- Need to query referenced documents independently

```javascript
// GOOD for referencing
{
  name: "Eleven",
  character_id: ObjectId("...")
}

// In separate collection
{
  character_id: ObjectId("..."),
  timestamp: ISODate("..."),
  report: "..."
}
```

**Decision Matrix:**

| Factor | Embed | Reference |
|--------|-------|-----------|
| Array size | < 100 items | > 100 items |
| Access pattern | Always together | Sometimes separate |
| Update frequency | Rare | Frequent |
| Growth | Bounded | Unbounded |
| Query needs | Simple | Complex joins needed |

---

**Q15: What is the difference between normalized and denormalized schemas in MongoDB?**

**Answer:**

**Normalized Schema (References):**
- Data stored in separate collections
- References used to link documents
- Similar to relational databases
- Reduces duplication
- Requires joins ($lookup) to combine data

```javascript
// Normalized
// characters collection
{ _id: 1, name: "Eleven", location_id: ObjectId("loc1") }

// locations collection
{ _id: ObjectId("loc1"), name: "Hawkins Lab", danger_level: 8 }

// Need $lookup to combine
db.characters.aggregate([
  { $lookup: { from: "locations", localField: "location_id", foreignField: "_id", as: "location" } }
])
```

**Denormalized Schema (Embedded):**
- Related data stored in same document
- Duplication of data
- Faster reads (no joins needed)
- Slower writes (update multiple documents)
- Better for read-heavy workloads

```javascript
// Denormalized
{
  _id: 1,
  name: "Eleven",
  location: {
    name: "Hawkins Lab",
    danger_level: 8,
    dimension: "normal"
  }
}
// No join needed, but if location changes, must update all character docs
```

**When to use each:**
- **Normalized**: Write-heavy, data changes frequently, need consistency
- **Denormalized**: Read-heavy, data rarely changes, need performance

---

#### Transactions & Consistency

**Q16: How do transactions work in MongoDB?**

**Answer:**
MongoDB supports multi-document ACID transactions (since version 4.0 for replica sets, 4.2 for sharded clusters).

**Basic Transaction:**
```javascript
const session = client.startSession();

try {
  session.startTransaction();
  
  await db.collection1.insertOne({ name: "Eleven" }, { session });
  await db.collection2.updateOne(
    { _id: locationId },
    { $inc: { character_count: 1 } },
    { session }
  );
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

**Transaction Options:**
```javascript
// Read concern
session.startTransaction({ readConcern: { level: "snapshot" } });

// Write concern
session.commitTransaction({ writeConcern: { w: "majority" } });
```

**Limitations:**
- Collections must be in same replica set or shard
- Some operations cannot be in transactions (createIndex, dropCollection)
- Performance overhead (use sparingly)
- Maximum transaction time (default 60 seconds)

---

**Q17: What are read and write concerns in MongoDB?**

**Answer:**

**Read Concern:**
Controls what data a read operation can see.

```javascript
// Levels:
// "local" - Default, may see uncommitted data
// "majority" - Only see data committed to majority
// "snapshot" - Consistent snapshot (transactions)
// "linearizable" - Strongest consistency

db.collection.find({}).readConcern("majority")
```

**Write Concern:**
Controls acknowledgment requirements for write operations.

```javascript
// Levels:
// { w: 1 } - Acknowledge after writing to primary (default)
// { w: "majority" } - Acknowledge after majority of nodes
// { w: 2 } - Acknowledge after 2 nodes
// { j: true } - Wait for journal commit
// { wtimeout: 5000 } - Timeout in milliseconds

db.collection.insertOne({ name: "Eleven" }, {
  writeConcern: { w: "majority", j: true, wtimeout: 5000 }
})
```

**Use Cases:**
- **Read Concern "majority"**: Critical reads that must see committed data
- **Write Concern "majority"**: Critical writes that must be durable
- **Read Concern "snapshot"**: Transactions requiring consistent view

---

#### Sharding & Scalability

**Q18: What is sharding in MongoDB and when should you use it?**

**Answer:**
Sharding is MongoDB's method for distributing data across multiple machines (shards) to support horizontal scaling.

**When to Shard:**
- Collection size approaching single server limits
- High write throughput exceeding single server capacity
- Need geographic distribution
- Memory requirements exceed available RAM

**Sharding Components:**
1. **Shards**: MongoDB instances holding subset of data
2. **Config Servers**: Store cluster metadata
3. **Mongos**: Router that routes queries to appropriate shards

**Shard Key:**
```javascript
// Choose shard key carefully
sh.shardCollection("db.collection", { user_id: 1, timestamp: -1 })

// Good shard key:
// - High cardinality (many unique values)
// - Even distribution
// - Used in most queries

// Bad shard key:
// - Low cardinality (few unique values)
// - Skewed distribution
// - Not used in queries
```

**Challenges:**
- Shard key cannot be changed after sharding
- Some queries may hit all shards (scatter-gather)
- Balancing requires careful planning

---

**Q19: What is a replica set and how does it provide high availability?**

**Answer:**
A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability.

**Replica Set Members:**
1. **Primary**: Handles all writes and reads (by default)
2. **Secondaries**: Replicate data from primary, can handle reads
3. **Arbiter**: Votes in elections but doesn't hold data

**High Availability Features:**
- **Automatic Failover**: If primary fails, secondaries elect new primary
- **Data Redundancy**: Multiple copies of data
- **Read Scaling**: Distribute reads across secondaries

```javascript
// Read from secondary
db.collection.find({}).readPref("secondary")

// Read preference options:
// "primary" - Default, read from primary
// "primaryPreferred" - Primary, fallback to secondary
// "secondary" - Read from secondary
// "secondaryPreferred" - Secondary, fallback to primary
// "nearest" - Lowest latency
```

**Election Process:**
- Requires majority of voting members
- New primary elected automatically
- Typically completes in < 12 seconds

---

#### Advanced Topics

**Q20: How do you perform text search in MongoDB?**

**Answer:**

**1. Create Text Index:**
```javascript
db.creatures.createIndex({
  name: "text",
  description: "text",
  tags: "text"
})
```

**2. Search:**
```javascript
// Basic search
db.creatures.find({ $text: { $search: "demogorgon hunter" } })

// With score
db.creatures.aggregate([
  { $match: { $text: { $search: "demogorgon" } } },
  { $addFields: { score: { $meta: "textScore" } } },
  { $sort: { score: -1 } }
])

// Language-specific
db.creatures.createIndex(
  { description: "text" },
  { default_language: "english" }
)
```

**3. Text Search Operators:**
```javascript
// Phrase search
{ $text: { $search: "\"demogorgon hunter\"" } }

// Exclude terms
{ $text: { $search: "demogorgon -hunter" } }

// Language
{ $text: { $search: "demogorgon", $language: "en" } }
```

**Limitations:**
- One text index per collection
- Case-insensitive
- Language-specific stemming
- No phrase proximity matching

---

**Q21: What is change streams and how do you use it?**

**Answer:**
Change streams allow applications to access real-time data changes without polling.

**Basic Usage:**
```javascript
const changeStream = db.collection.watch();

changeStream.on('change', (change) => {
  console.log(change);
  // {
  //   _id: { ... },
  //   operationType: 'insert',
  //   fullDocument: { ... },
  //   ...
  // }
});
```

**Filter Changes:**
```javascript
const pipeline = [
  { $match: { 'fullDocument.status': 'active' } }
];

const changeStream = db.collection.watch(pipeline);
```

**Operation Types:**
- `insert`
- `update`
- `replace`
- `delete`
- `invalidate` (collection/database dropped)

**Use Cases:**
- Real-time notifications
- Cache invalidation
- Data synchronization
- Audit logging
- Event-driven architectures

---

**Q22: Explain the difference between $expr and regular query operators.**

**Answer:**

**Regular Query Operators:**
- Compare field values to constants
- Cannot compare two fields
- Use indexes efficiently

```javascript
// Regular - compares field to constant
{ power_level: { $gt: 5 } }
{ status: { $in: ["active", "missing"] } }
```

**$expr:**
- Allows field-to-field comparisons
- Can use aggregation expressions
- May not use indexes efficiently

```javascript
// $expr - compares two fields
{ $expr: { $gt: ["$power_level", "$threat_level"] } }
{ $expr: { $eq: ["$location_id", "$home_location"] } }

// Complex expressions
{
  $expr: {
    $and: [
      { $gt: ["$power_level", 5] },
      { $lt: ["$age", "$max_age"] }
    ]
  }
}
```

**When to use $expr:**
- Need to compare two fields
- Complex conditional logic
- When regular operators aren't sufficient

**Performance Note:**
- `$expr` may not use indexes
- Prefer regular operators when possible
- Use `$expr` only when necessary

---

**Q23: How do you handle time-series data in MongoDB?**

**Answer:**

**Time-Series Collections (MongoDB 5.0+):**
```javascript
// Create time-series collection
db.createCollection("sensor_data", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensor_id",
    granularity: "hours"
  }
})

// Insert data
db.sensor_data.insertMany([
  { timestamp: ISODate("2024-01-01"), sensor_id: "sensor1", value: 25.5 },
  { timestamp: ISODate("2024-01-01"), sensor_id: "sensor2", value: 30.2 }
])
```

**Benefits:**
- Optimized storage (compression)
- Faster queries on time ranges
- Automatic bucketing
- Better performance for time-based analytics

**Querying:**
```javascript
// Efficient time-range queries
db.sensor_data.find({
  timestamp: { $gte: startDate, $lte: endDate },
  sensor_id: "sensor1"
})
```

**Aggregation:**
```javascript
// Group by time intervals
db.sensor_data.aggregate([
  {
    $group: {
      _id: {
        $dateTrunc: {
          date: "$timestamp",
          unit: "hour"
        }
      },
      avgValue: { $avg: "$value" }
    }
  }
])
```

---

**Q24: What is the difference between $merge and $out stages?**

**Answer:**

| `$out` | `$merge` |
|--------|----------|
| Replaces entire collection | Can insert, merge, or replace documents |
| Destructive (drops collection) | Non-destructive |
| Simple output | Flexible merge strategies |
| Cannot specify database | Can specify database and collection |

**$out:**
```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  { $out: "team_stats" }  // Replaces team_stats collection
])
```

**$merge:**
```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  {
    $merge: {
      into: "team_stats",
      whenMatched: "replace",  // or "merge", "keepExisting", "fail"
      whenNotMatched: "insert"
    }
  }
])
```

**Merge Strategies:**
- `replace`: Replace matched document
- `merge`: Merge fields (like $set)
- `keepExisting`: Keep existing, ignore new
- `fail`: Error if document exists
- `pipeline`: Custom merge logic

**Use Cases:**
- `$out`: One-time reports, complete replacement
- `$merge`: Incremental updates, data synchronization

---

**Q25: How do you handle geospatial queries in MongoDB?**

**Answer:**

**1. Create Geospatial Index:**
```javascript
// 2dsphere index (for GeoJSON)
db.locations.createIndex({ coordinates: "2dsphere" })

// 2d index (for legacy coordinates)
db.locations.createIndex({ coordinates: "2d" })
```

**2. GeoJSON Format:**
```javascript
{
  name: "Hawkins Lab",
  coordinates: {
    type: "Point",
    coordinates: [-87.6298, 41.8781]  // [longitude, latitude]
  }
}
```

**3. Query Operators:**
```javascript
// $near - Find nearest points
db.locations.find({
  coordinates: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      },
      $maxDistance: 1000  // meters
    }
  }
})

// $geoWithin - Find points within area
db.locations.find({
  coordinates: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[...]]
      }
    }
  }
})

// $geoIntersects - Find geometries that intersect
db.locations.find({
  coordinates: {
    $geoIntersects: {
      $geometry: {
        type: "LineString",
        coordinates: [[...]]
      }
    }
  }
})
```

**4. Aggregation:**
```javascript
db.locations.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      },
      distanceField: "distance",
      maxDistance: 5000,
      spherical: true
    }
  },
  { $sort: { distance: 1 } },
  { $limit: 10 }
])
```

---

### Summary of MongoDB Concepts

This project covers:

**Core Concepts:**
- Aggregation Framework and pipeline stages
- Query operators and expressions
- Indexing strategies
- Schema design patterns

**Advanced Topics:**
- $lookup joins and relationships
- $facet parallel pipelines
- Array operations
- Performance optimization
- Transactions and consistency
- Sharding and scalability
- Text search and geospatial queries

**Real-World Applications:**
- Analytics dashboards
- Data transformation
- Multi-collection queries
- Time-series data
- Search functionality

---

## 7. Complete MongoDB  Questions

This section contains 100 comprehensive MongoDB  questions organized by topic, covering everything from fundamentals to advanced concepts.

---

### 7.1 MongoDB Fundamentals (Questions 1-10)

#### Q1: What is MongoDB and what are its main features?

**Answer:**
MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents called BSON (Binary JSON).

**Main Features:**
1. **Document-Oriented**: Data stored as documents (not rows/columns)
2. **Schema Flexibility**: No fixed schema, documents can have different structures
3. **Horizontal Scalability**: Sharding for distributing data across servers
4. **High Availability**: Replica sets for automatic failover
5. **Rich Query Language**: Supports complex queries, aggregations, text search
6. **Indexing**: Supports various index types (single, compound, text, geospatial)
7. **Aggregation Framework**: Powerful data processing pipeline
8. **GridFS**: Store files larger than 16MB
9. **ACID Transactions**: Multi-document transactions (since v4.0)
10. **Ad Hoc Queries**: Support for field, range, and regular expression queries

**Use Cases:**
- Content management systems
- Real-time analytics
- Mobile applications
- Internet of Things (IoT)
- Gaming applications
- E-commerce platforms

---

#### Q2: How does MongoDB differ from relational databases?

**Answer:**

| MongoDB (NoSQL) | Relational Databases (SQL) |
|-----------------|----------------------------|
| Document-oriented | Table-oriented |
| Schema-less/flexible | Fixed schema |
| Stores JSON-like documents | Stores rows and columns |
| No joins (uses $lookup instead) | Uses SQL JOINs |
| Horizontal scaling (sharding) | Primarily vertical scaling |
| Denormalized data | Normalized data |
| Embedded documents | Foreign keys and relationships |
| Dynamic queries | Structured Query Language (SQL) |
| Better for unstructured data | Better for structured data |

**Key Differences:**

**1. Data Model:**
```javascript
// MongoDB - Document
{
  _id: ObjectId("..."),
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing"],
  stats: { power_level: 10, health: 100 }
}

// SQL - Tables
// characters table: id, name
// abilities table: character_id, ability
// stats table: character_id, power_level, health
```

**2. Relationships:**
- **MongoDB**: Embedding or referencing (manual)
- **SQL**: Foreign keys and JOINs (automatic)

**3. Scalability:**
- **MongoDB**: Built for horizontal scaling
- **SQL**: Primarily vertical scaling

**4. Transactions:**
- **MongoDB**: Multi-document transactions (since v4.0)
- **SQL**: ACID transactions from the start

---

#### Q3: Can you describe the structure of data in MongoDB?

**Answer:**
MongoDB uses a hierarchical structure:

```
Database
  └── Collection (like a table)
      └── Document (like a row)
          └── Field (like a column)
```

**1. Database:**
- Container for collections
- Can have multiple databases
- Example: `hawkins_db`, `analytics_db`

**2. Collection:**
- Group of documents
- Similar to a table in SQL
- No fixed schema
- Example: `characters`, `sightings`, `locations`

**3. Document:**
- Basic unit of data
- JSON-like structure (BSON)
- Can contain nested documents and arrays
- Example:
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Eleven",
  age: 14,
  abilities: ["telekinesis", "remote viewing"],
  location: {
    name: "Hawkins Lab",
    coordinates: [-87.6298, 41.8781]
  }
}
```

**4. Field:**
- Key-value pair in a document
- Can be any BSON data type
- Example: `name: "Eleven"`, `age: 14`

**BSON Data Types:**
- String, Integer, Double, Boolean
- Date, ObjectId, Null
- Array, Embedded Document
- Binary Data, Code, Regular Expression

---

#### Q4: What is a Document in MongoDB?

**Answer:**
A document is the basic unit of data in MongoDB, stored in BSON (Binary JSON) format.

**Characteristics:**
1. **Key-Value Pairs**: Field names and values
2. **Ordered**: Fields maintain insertion order
3. **Dynamic Schema**: Documents in same collection can have different fields
4. **Nested**: Can contain arrays and embedded documents
5. **Unique _id**: Every document has a unique `_id` field

**Example:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Eleven",
  age: 14,
  status: "active",
  abilities: ["telekinesis", "remote viewing", "dimensional travel"],
  stats: {
    power_level: 10,
    health: 100,
    stamina: 85
  },
  relationships: [
    { name: "Mike", type: "friend" },
    { name: "Hopper", type: "guardian" }
  ],
  last_seen: ISODate("2024-01-15T10:30:00Z")
}
```

**Document Size Limit:**
- Maximum document size: 16MB
- For larger files, use GridFS

**Benefits:**
- Natural mapping to objects in programming languages
- No need for joins (can embed related data)
- Flexible schema allows evolution over time

---

#### Q5: How is data stored in collections in MongoDB?

**Answer:**
Collections are groups of MongoDB documents, similar to tables in relational databases.

**Characteristics:**
1. **No Schema**: Documents in a collection can have different structures
2. **Dynamic Creation**: Created automatically when first document is inserted
3. **Namespace**: `database.collection` (e.g., `hawkins_db.characters`)
4. **No Fixed Structure**: Unlike SQL tables, no predefined columns

**Collection Creation:**
```javascript
// Explicit creation
db.createCollection("characters", {
  capped: false,
  size: 100000,
  max: 5000
})

// Implicit creation (automatic)
db.characters.insertOne({ name: "Eleven" })
// Collection "characters" is created automatically
```

**Collection Types:**
1. **Regular Collections**: Standard collections (default)
2. **Capped Collections**: Fixed-size collections (FIFO)
3. **Views**: Read-only collections based on aggregation pipeline
4. **Time-Series Collections**: Optimized for time-series data (MongoDB 5.0+)

**Capped Collection Example:**
```javascript
db.createCollection("logs", {
  capped: true,
  size: 10000000,  // 10MB
  max: 10000       // Max 10,000 documents
})
// When full, oldest documents are automatically deleted
```

**Best Practices:**
- Use descriptive collection names
- Group related documents together
- Consider collection size and access patterns
- Use indexes for frequently queried fields

---

#### Q6: Describe what a MongoDB database is.

**Answer:**
A MongoDB database is a container for collections, similar to a schema in SQL databases.

**Structure:**
```
MongoDB Instance
  └── Database 1
      └── Collection 1
      └── Collection 2
  └── Database 2
      └── Collection 1
```

**Characteristics:**
1. **Namespace**: Database name + collection name
2. **Isolation**: Data in different databases is isolated
3. **Multiple Databases**: Single MongoDB instance can have multiple databases
4. **Default Database**: `test` (if no database specified)

**Database Operations:**
```javascript
// Switch to database (creates if doesn't exist)
use hawkins_db

// Show current database
db.getName()

// List all databases
show dbs

// Drop database
db.dropDatabase()

// Get database stats
db.stats()
```

**Database Naming:**
- Cannot contain: `/`, `\`, `.`, `"`, `*`, `<`, `>`, `:`, `|`, `?`, `$`, ` ` (space), `\0`
- Case-sensitive
- Max length: 64 bytes

**System Databases:**
- `admin`: Administrative operations
- `local`: Replica set metadata
- `config`: Sharding configuration

**Best Practices:**
- Use descriptive database names
- Separate databases for different applications
- Consider resource limits per database

---

#### Q7: What is the default port on which MongoDB listens?

**Answer:**
MongoDB's default port is **27017**.

**Port Configuration:**
```javascript
// Default connection
mongodb://localhost:27017

// Custom port
mongodb://localhost:30000

// Connection string with port
mongodb://username:password@host:27017/database
```

**Common MongoDB Ports:**
- **27017**: Default MongoDB port
- **27018**: Common alternative for second instance
- **27019**: Common for third instance
- **28017**: HTTP interface (if enabled)

**Changing Default Port:**
```bash
# Command line
mongod --port 30000

# Configuration file (mongod.conf)
net:
  port: 30000
```

**Security Note:**
- Default port is well-known
- Consider changing in production
- Use firewall rules to restrict access
- Enable authentication

---

#### Q8: How does MongoDB provide high availability and disaster recovery?

**Answer:**
MongoDB provides high availability through **Replica Sets** and disaster recovery through **backups** and **replication**.

**1. Replica Sets:**
```javascript
// Replica set with 3 members
{
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb1:27017" },  // Primary
    { _id: 1, host: "mongodb2:27017" },  // Secondary
    { _id: 2, host: "mongodb3:27017" }   // Secondary
  ]
}
```

**Features:**
- **Automatic Failover**: If primary fails, secondary becomes primary (< 12 seconds)
- **Data Redundancy**: Multiple copies of data
- **Read Scaling**: Distribute reads across secondaries
- **Rolling Updates**: Update without downtime

**2. Oplog (Operations Log):**
- Records all write operations
- Used for replication
- Secondaries read from primary's oplog
- Enables point-in-time recovery

**3. Backups:**
```bash
# mongodump - backup
mongodump --host localhost:27017 --db hawkins_db --out /backup

# mongorestore - restore
mongorestore --host localhost:27017 --db hawkins_db /backup/hawkins_db
```

**4. Journaling:**
- Write-ahead logging
- Ensures data durability
- Enables crash recovery

**5. Write Concern:**
```javascript
// Wait for majority of nodes
db.collection.insertOne({ name: "Eleven" }, {
  writeConcern: { w: "majority", j: true }
})
```

**Disaster Recovery Strategy:**
1. Regular backups (daily/hourly)
2. Replica sets in different data centers
3. Test restore procedures
4. Monitor replication lag
5. Document recovery procedures

---

#### Q9: What are indexes in MongoDB, and why are they used?

**Answer:**
Indexes are data structures that improve query performance by allowing MongoDB to find documents without scanning the entire collection.

**Why Use Indexes:**
1. **Performance**: Faster queries (logarithmic vs linear time)
2. **Efficiency**: Reduces disk I/O
3. **Sorting**: Enables efficient sorting operations
4. **Unique Constraints**: Enforce uniqueness
5. **Text Search**: Enable full-text search

**Index Types:**
```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Text index
db.creatures.createIndex({ name: "text", description: "text" })

// Geospatial index
db.locations.createIndex({ coordinates: "2dsphere" })

// TTL index
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

**Index Impact:**
```javascript
// Without index - COLLSCAN (slow)
db.characters.find({ name: "Eleven" }).explain()
// executionTimeMillis: 5000
// stage: "COLLSCAN"

// With index - IXSCAN (fast)
db.characters.createIndex({ name: 1 })
db.characters.find({ name: "Eleven" }).explain()
// executionTimeMillis: 5
// stage: "IXSCAN"
```

**Trade-offs:**
- **Pros**: Faster queries, efficient sorting
- **Cons**: Slower writes, additional storage space

**Best Practices:**
- Index frequently queried fields
- Index fields used in sorting
- Monitor index usage
- Remove unused indexes
- Consider compound indexes for multi-field queries

---

#### Q10: What is the role of the `_id` field in MongoDB documents?

**Answer:**
The `_id` field is a unique identifier for each document in a MongoDB collection.

**Characteristics:**
1. **Required**: Every document must have an `_id` field
2. **Unique**: Cannot have duplicate `_id` values in a collection
3. **Immutable**: Cannot be changed after document creation
4. **Indexed**: Automatically indexed (primary key)
5. **Default Type**: ObjectId (if not specified)

**ObjectId Structure:**
```
ObjectId: 507f1f77bcf86cd799439011
          └─┬─┘└─┬─┘└─┬─┘└───┬────┘
            │    │    │      └─ Random
            │    │    └─ Process ID
            │    └─ Machine ID
            └─ Timestamp (4 bytes)
```

**Custom _id:**
```javascript
// Use custom _id
db.characters.insertOne({
  _id: "eleven_001",
  name: "Eleven",
  age: 14
})

// Use ObjectId (default)
db.characters.insertOne({
  name: "Mike",
  age: 15
  // _id: ObjectId("...") automatically generated
})
```

**Benefits:**
- Fast lookups (indexed)
- Guaranteed uniqueness
- Can be used for sharding
- Contains timestamp information

**Use Cases:**
- Primary key for documents
- Shard key (in sharded clusters)
- Reference in other documents
- Sorting by insertion time

---

### 7.2 CRUD Operations (Questions 11-20)

#### Q11: How do you create a new MongoDB collection?

**Answer:**
Collections are created automatically when you insert the first document, or you can create them explicitly.

**Method 1: Implicit Creation (Automatic)**
```javascript
// Collection created automatically on first insert
db.characters.insertOne({ name: "Eleven" })
// Collection "characters" is now created
```

**Method 2: Explicit Creation**
```javascript
// Create regular collection
db.createCollection("characters")

// Create with options
db.createCollection("logs", {
  capped: true,           // Fixed-size collection
  size: 10000000,         // 10MB max size
  max: 10000,             // Max 10,000 documents
  autoIndexId: true       // Auto-index _id field
})

// Create time-series collection (MongoDB 5.0+)
db.createCollection("sensor_data", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensor_id",
    granularity: "hours"
  }
})
```

**Collection Options:**
- `capped`: Fixed-size collection (FIFO)
- `size`: Max size in bytes (for capped)
- `max`: Max number of documents (for capped)
- `validator`: Document validation rules
- `timeseries`: Time-series collection options

**Check if Collection Exists:**
```javascript
// List all collections
show collections

// Check specific collection
db.getCollectionNames().includes("characters")
```

---

#### Q12: What is the syntax to insert a document into a MongoDB collection?

**Answer:**
MongoDB provides several methods to insert documents.

**1. insertOne() - Single Document**
```javascript
db.characters.insertOne({
  name: "Eleven",
  age: 14,
  status: "active",
  abilities: ["telekinesis", "remote viewing"]
})
// Returns: { acknowledged: true, insertedId: ObjectId("...") }
```

**2. insertMany() - Multiple Documents**
```javascript
db.characters.insertMany([
  { name: "Eleven", age: 14 },
  { name: "Mike", age: 15 },
  { name: "Dustin", age: 15 }
])
// Returns: { acknowledged: true, insertedIds: [...] }
```

**3. insertMany() with ordered option**
```javascript
// ordered: true (default) - stops on first error
db.characters.insertMany([...], { ordered: true })

// ordered: false - continues after errors
db.characters.insertMany([...], { ordered: false })
```

**4. insert() - Legacy Method**
```javascript
// Single document
db.characters.insert({ name: "Eleven" })

// Multiple documents
db.characters.insert([
  { name: "Mike" },
  { name: "Dustin" }
])
```

**5. Save() - Insert or Update**
```javascript
// If _id exists, updates; otherwise inserts
db.characters.save({
  _id: ObjectId("..."),
  name: "Eleven",
  age: 15  // Updated age
})
```

**Write Concern:**
```javascript
db.characters.insertOne(
  { name: "Eleven" },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 5000
    }
  }
)
```

**Best Practices:**
- Use `insertOne()` for single documents
- Use `insertMany()` for multiple documents
- Use `ordered: false` for bulk inserts when errors are acceptable
- Specify write concern for critical operations

---

#### Q13: Describe how to read data from a MongoDB collection.

**Answer:**
MongoDB provides several methods to read/query documents.

**1. find() - Multiple Documents**
```javascript
// Get all documents
db.characters.find()

// With filter
db.characters.find({ status: "active" })

// With projection (select fields)
db.characters.find(
  { status: "active" },
  { name: 1, age: 1, _id: 0 }  // Include name, age; exclude _id
)

// Pretty print
db.characters.find().pretty()
```

**2. findOne() - Single Document**
```javascript
// Get first matching document
db.characters.findOne({ name: "Eleven" })

// With projection
db.characters.findOne(
  { status: "active" },
  { name: 1, abilities: 1 }
)
```

**3. Query Operators**
```javascript
// Comparison
db.characters.find({ age: { $gt: 15 } })        // Greater than
db.characters.find({ age: { $gte: 14 } })        // Greater than or equal
db.characters.find({ age: { $lt: 18 } })        // Less than
db.characters.find({ age: { $lte: 16 } })        // Less than or equal
db.characters.find({ age: { $ne: 14 } })        // Not equal
db.characters.find({ age: { $in: [14, 15, 16] } })  // In array
db.characters.find({ age: { $nin: [14, 15] } })     // Not in array

// Logical
db.characters.find({
  $or: [
    { status: "active" },
    { status: "missing" }
  ]
})

db.characters.find({
  $and: [
    { age: { $gte: 14 } },
    { status: "active" }
  ]
})

// Element
db.characters.find({ abilities: { $exists: true } })  // Field exists
db.characters.find({ name: { $type: "string" } })     // Type check

// Array
db.characters.find({ abilities: "telekinesis" })       // Array contains
db.characters.find({ abilities: { $size: 3 } })       // Array size
db.characters.find({ abilities: { $all: ["telekinesis", "remote viewing"] } })
```

**4. Cursor Methods**
```javascript
// Limit results
db.characters.find().limit(10)

// Skip documents
db.characters.find().skip(20)

// Sort
db.characters.find().sort({ age: 1 })   // Ascending
db.characters.find().sort({ age: -1 })  // Descending

// Count
db.characters.find({ status: "active" }).count()

// Iterate
const cursor = db.characters.find()
cursor.forEach(doc => print(doc.name))
```

**5. Aggregation for Complex Queries**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $project: { name: 1, age: 1 } },
  { $sort: { age: -1 } },
  { $limit: 10 }
])
```

---

#### Q14: Explain how to update documents in MongoDB.

**Answer:**
MongoDB provides several methods to update documents.

**1. updateOne() - Update Single Document**
```javascript
// Update first matching document
db.characters.updateOne(
  { name: "Eleven" },
  { $set: { age: 15 } }
)

// With upsert (insert if not exists)
db.characters.updateOne(
  { name: "New Character" },
  { $set: { age: 16 } },
  { upsert: true }
)
```

**2. updateMany() - Update Multiple Documents**
```javascript
// Update all matching documents
db.characters.updateMany(
  { status: "active" },
  { $set: { last_updated: new Date() } }
)
```

**3. replaceOne() - Replace Entire Document**
```javascript
// Replace document (keeps _id)
db.characters.replaceOne(
  { name: "Eleven" },
  {
    name: "Eleven",
    age: 15,
    status: "active",
    abilities: ["telekinesis"]
  }
)
```

**4. Update Operators**
```javascript
// $set - Set field value
{ $set: { age: 15, status: "active" } }

// $unset - Remove field
{ $unset: { old_field: "" } }

// $inc - Increment numeric value
{ $inc: { power_level: 1 } }

// $mul - Multiply numeric value
{ $mul: { score: 1.5 } }

// $rename - Rename field
{ $rename: { old_name: "new_name" } }

// $min / $max - Update if new value is min/max
{ $min: { best_score: 100 } }
{ $max: { best_score: 100 } }

// $currentDate - Set to current date
{ $currentDate: { last_modified: true } }

// Array operators
{ $push: { abilities: "new_ability" } }           // Add to array
{ $pull: { abilities: "old_ability" } }           // Remove from array
{ $addToSet: { tags: "new_tag" } }                 // Add if not exists
{ $pop: { abilities: 1 } }                          // Remove first/last
{ $pullAll: { abilities: ["ability1", "ability2"] } } // Remove multiple
```

**5. Update with Conditions**
```javascript
// Update only if condition met
db.characters.updateOne(
  { name: "Eleven", age: { $lt: 15 } },
  { $set: { age: 15 } }
)
```

**6. Array Element Updates**
```javascript
// Update specific array element
db.characters.updateOne(
  { name: "Eleven", "abilities.0": "telekinesis" },
  { $set: { "abilities.0": "enhanced_telekinesis" } }
)

// Update all array elements matching condition
db.characters.updateMany(
  {},
  { $set: { "abilities.$[elem]": "updated" } },
  { arrayFilters: [{ "elem": { $regex: "telekinesis" } }] }
)
```

**Best Practices:**
- Use `$set` to update specific fields
- Use `updateOne()` when updating single document
- Use `updateMany()` when updating multiple documents
- Always specify filter to avoid accidental updates
- Use write concern for critical updates

---

#### Q15: What are the MongoDB commands for deleting documents?

**Answer:**
MongoDB provides methods to delete documents and collections.

**1. deleteOne() - Delete Single Document**
```javascript
// Delete first matching document
db.characters.deleteOne({ name: "Eleven" })

// Returns: { acknowledged: true, deletedCount: 1 }
```

**2. deleteMany() - Delete Multiple Documents**
```javascript
// Delete all matching documents
db.characters.deleteMany({ status: "inactive" })

// Delete all documents in collection
db.characters.deleteMany({})
```

**3. remove() - Legacy Method**
```javascript
// Remove documents (deprecated, use deleteOne/deleteMany)
db.characters.remove({ status: "inactive" })

// Remove single document
db.characters.remove({ name: "Eleven" }, { justOne: true })
```

**4. findOneAndDelete() - Delete and Return**
```javascript
// Delete and return deleted document
db.characters.findOneAndDelete({ name: "Eleven" })
```

**5. Drop Collection - Delete All Documents**
```javascript
// Delete entire collection
db.characters.drop()

// Returns: true if dropped, false if doesn't exist
```

**6. Drop Database - Delete Everything**
```javascript
// Switch to database
use hawkins_db

// Drop database
db.dropDatabase()
```

**Delete with Conditions:**
```javascript
// Delete with query operators
db.characters.deleteMany({
  age: { $lt: 14 },
  status: "inactive"
})

// Delete with logical operators
db.characters.deleteMany({
  $or: [
    { status: "destroyed" },
    { status: "missing", last_seen: { $lt: new Date("2020-01-01") } }
  ]
})
```

**Safety Considerations:**
- Always test delete queries with `find()` first
- Use `deleteOne()` when you only want to delete one document
- Be careful with `deleteMany({})` - deletes all documents
- Consider soft deletes (mark as deleted) instead of hard deletes
- Backup before bulk deletes

**Example Workflow:**
```javascript
// 1. Check what will be deleted
db.characters.find({ status: "inactive" })

// 2. Count documents to be deleted
db.characters.countDocuments({ status: "inactive" })

// 3. Delete
db.characters.deleteMany({ status: "inactive" })
```

---

#### Q16: Can you join two collections in MongoDB? If so, how?

**Answer:**
Yes, MongoDB supports joining collections using the `$lookup` aggregation stage (similar to SQL LEFT OUTER JOIN).

**1. Basic $lookup**
```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",        // Collection to join
      localField: "creature_id", // Field in current collection
      foreignField: "_id",       // Field in joined collection
      as: "creature"             // Output array name
    }
  }
])

// Result: Each sighting document gets a "creature" array
{
  _id: ObjectId("..."),
  creature_id: ObjectId("..."),
  location: "Hawkins",
  creature: [{  // Array of matched documents
    _id: ObjectId("..."),
    name: "Demogorgon",
    threat_level: 9
  }]
}
```

**2. $lookup with $unwind**
```javascript
// Flatten the array result
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",
      localField: "creature_id",
      foreignField: "_id",
      as: "creature"
    }
  },
  {
    $unwind: "$creature"  // Convert array to object
  }
])

// Result: creature is now an object, not array
{
  _id: ObjectId("..."),
  creature_id: ObjectId("..."),
  creature: {
    _id: ObjectId("..."),
    name: "Demogorgon",
    threat_level: 9
  }
}
```

**3. $lookup with Pipeline (Advanced)**
```javascript
db.characters.aggregate([
  {
    $lookup: {
      from: "status_reports",
      let: { charId: "$_id" },  // Variables
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$character_id", "$$charId"] }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 1 }  // Get only latest report
      ],
      as: "latestReport"
    }
  }
])
```

**4. Multiple $lookups (Multiple Joins)**
```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",
      localField: "creature_id",
      foreignField: "_id",
      as: "creature"
    }
  },
  { $unwind: "$creature" },
  {
    $lookup: {
      from: "locations",
      localField: "location_id",
      foreignField: "_id",
      as: "location"
    }
  },
  { $unwind: "$location" }
])
```

**5. $lookup with preserveNullAndEmptyArrays**
```javascript
db.characters.aggregate([
  {
    $lookup: {
      from: "status_reports",
      localField: "_id",
      foreignField: "character_id",
      as: "reports"
    }
  },
  {
    $unwind: {
      path: "$reports",
      preserveNullAndEmptyArrays: true  // Keep characters without reports
    }
  }
])
```

**Differences from SQL JOINs:**
- MongoDB only supports LEFT OUTER JOIN (via $lookup)
- Result is an array (need $unwind to flatten)
- More flexible with pipeline syntax
- Can perform complex filtering in join

**Performance Considerations:**
- $lookup can be expensive
- Place $match before $lookup when possible
- Consider embedding data instead of joining
- Index foreign fields for better performance

---

#### Q17: How do you limit the number of documents returned by a MongoDB query?

**Answer:**
Use the `limit()` method or `$limit` stage in aggregation.

**1. limit() Method**
```javascript
// Limit to 10 documents
db.characters.find({ status: "active" }).limit(10)

// With sort
db.characters.find()
  .sort({ age: -1 })
  .limit(5)  // Top 5 oldest
```

**2. $limit in Aggregation**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $sort: { power_level: -1 } },
  { $limit: 10 }  // Top 10
])
```

**3. Combined with skip() for Pagination**
```javascript
// Page 1 (first 10)
db.characters.find().limit(10).skip(0)

// Page 2 (next 10)
db.characters.find().limit(10).skip(10)

// Page 3 (next 10)
db.characters.find().limit(10).skip(20)

// General pagination function
function getPage(pageNumber, pageSize) {
  return db.characters.find()
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
}
```

**4. Limit in Aggregation with $facet**
```javascript
db.characters.aggregate([
  {
    $facet: {
      top10: [
        { $sort: { power_level: -1 } },
        { $limit: 10 }
      ],
      bottom10: [
        { $sort: { power_level: 1 } },
        { $limit: 10 }
      ]
    }
  }
])
```

**Best Practices:**
- Always use limit() to prevent returning too many documents
- Combine with sort() for top N queries
- Use skip() + limit() for pagination (but be aware of performance)
- For large skips, consider cursor-based pagination instead
- Limit early in aggregation pipeline when possible

**Performance Note:**
- `skip()` can be slow for large offsets
- Consider using range queries instead:
```javascript
// Instead of skip(10000), use:
db.characters.find({ _id: { $gt: lastSeenId } }).limit(10)
```

---

#### Q18: What is the difference between `find()` and `findOne()` in MongoDB?

**Answer:**

| `find()` | `findOne()` |
|----------|-------------|
| Returns cursor (multiple documents) | Returns single document or null |
| Returns all matching documents | Returns first matching document |
| Returns empty array if no match | Returns null if no match |
| Can chain methods (limit, sort, etc.) | Cannot chain (already executed) |
| Lazy evaluation | Immediate execution |
| Use for multiple results | Use when you need one document |

**Examples:**

**find() - Returns Cursor**
```javascript
// Returns cursor (not executed yet)
const cursor = db.characters.find({ status: "active" })

// Execute and get all results
cursor.toArray()

// Iterate
cursor.forEach(doc => print(doc.name))

// Chain methods
db.characters.find({ status: "active" })
  .sort({ age: -1 })
  .limit(10)
  .forEach(doc => print(doc.name))
```

**findOne() - Returns Document**
```javascript
// Returns single document or null
const character = db.characters.findOne({ name: "Eleven" })

// Check if found
if (character) {
  print(character.name)
} else {
  print("Not found")
}

// With projection
const name = db.characters.findOne(
  { name: "Eleven" },
  { name: 1, age: 1, _id: 0 }
)
```

**When to Use Each:**

**Use find() when:**
- You need multiple documents
- You want to chain operations (sort, limit, etc.)
- You're iterating over results
- You need cursor functionality

**Use findOne() when:**
- You only need one document
- You're checking if document exists
- You need immediate result (not cursor)
- You're looking up by unique field (like _id)

**Performance:**
- `findOne()` stops after finding first match (can be faster)
- `find()` continues searching (unless limited)
- Both can use indexes efficiently

---

#### Q19: How can you achieve pagination in MongoDB?

**Answer:**
There are several methods for pagination in MongoDB.

**1. skip() + limit() - Offset Pagination**
```javascript
// Page 1
db.characters.find()
  .skip(0)
  .limit(10)

// Page 2
db.characters.find()
  .skip(10)
  .limit(10)

// Page N
function getPage(page, pageSize = 10) {
  return db.characters.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()
}
```

**Pros:** Simple, works with any query
**Cons:** Slow for large offsets (skip(10000) is expensive)

**2. Cursor-Based Pagination (Recommended)**
```javascript
// First page
const firstPage = db.characters.find()
  .sort({ _id: 1 })
  .limit(10)
  .toArray()

// Next page (using last _id from previous page)
const lastId = firstPage[firstPage.length - 1]._id
const nextPage = db.characters.find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(10)
  .toArray()
```

**Pros:** Fast, consistent (handles new inserts)
**Cons:** Requires sortable unique field

**3. Range-Based Pagination**
```javascript
// Paginate by date range
const pageSize = 10
const startDate = new Date("2024-01-01")

db.events.find({
  timestamp: { $gte: startDate }
})
.sort({ timestamp: 1 })
.limit(pageSize)
```

**4. Aggregation Pagination**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $sort: { age: -1 } },
  { $skip: 20 },
  { $limit: 10 },
  { $project: { name: 1, age: 1 } }
])
```

**5. Total Count for UI**
```javascript
// Get total count
const total = db.characters.countDocuments({ status: "active" })

// Get page
const page = db.characters.find({ status: "active" })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .toArray()

// Return with metadata
{
  data: page,
  pagination: {
    page: pageNum,
    pageSize: pageSize,
    total: total,
    totalPages: Math.ceil(total / pageSize)
  }
}
```

**Best Practices:**
- Use cursor-based pagination for large datasets
- Always use limit() to prevent large result sets
- Index fields used for sorting
- Consider using _id for cursor (always indexed)
- Cache total counts if they're expensive

**Performance Comparison:**
```javascript
// Slow for large offsets
db.collection.find().skip(100000).limit(10)  // Scans 100,000 docs

// Fast (uses index)
db.collection.find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(10)  // Only reads 10 docs
```

---

#### Q20: What are the differences between MongoDB's `insertOne` and `insertMany` methods?

**Answer:**

| `insertOne()` | `insertMany()` |
|---------------|----------------|
| Inserts single document | Inserts multiple documents |
| Takes object | Takes array of objects |
| Returns: `{ insertedId: ... }` | Returns: `{ insertedIds: [...] }` |
| Simpler syntax | More options (ordered) |
| Use for one document | Use for bulk inserts |

**insertOne() Example:**
```javascript
const result = db.characters.insertOne({
  name: "Eleven",
  age: 14,
  status: "active"
})

// Result:
{
  acknowledged: true,
  insertedId: ObjectId("507f1f77bcf86cd799439011")
}
```

**insertMany() Example:**
```javascript
const result = db.characters.insertMany([
  { name: "Eleven", age: 14 },
  { name: "Mike", age: 15 },
  { name: "Dustin", age: 15 }
])

// Result:
{
  acknowledged: true,
  insertedIds: [
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013")
  ]
}
```

**insertMany() with ordered option:**
```javascript
// ordered: true (default) - stops on first error
db.characters.insertMany([
  { name: "Eleven" },
  { _id: ObjectId("..."), name: "Mike" },  // Duplicate _id
  { name: "Dustin" }
], { ordered: true })
// Only first document inserted, stops at error

// ordered: false - continues after errors
db.characters.insertMany([
  { name: "Eleven" },
  { _id: ObjectId("..."), name: "Mike" },  // Duplicate _id
  { name: "Dustin" }
], { ordered: false })
// First and third documents inserted, second skipped
// Returns error details in writeErrors array
```

**Performance:**
- `insertMany()` is more efficient for bulk inserts
- Single network round trip vs multiple
- Better for batch operations

**Error Handling:**
```javascript
try {
  const result = db.characters.insertMany([...], { ordered: false })
  
  if (result.writeErrors && result.writeErrors.length > 0) {
    console.log("Some documents failed to insert:")
    result.writeErrors.forEach(err => {
      console.log(`Index ${err.index}: ${err.errmsg}`)
    })
  }
  
  console.log(`Inserted ${result.insertedIds.length} documents`)
} catch (error) {
  console.error("Insert failed:", error)
}
```

**When to Use:**
- **insertOne()**: Single document, simple operations
- **insertMany()**: Bulk inserts, batch operations, data migration

---

### 7.3 Indexing and Aggregation (Questions 21-25)

#### Q21: Describe a compound index in MongoDB.

**Answer:**
A compound index is an index on multiple fields, allowing efficient queries on combinations of those fields.

**Creating Compound Index:**
```javascript
// Index on two fields
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Index on three fields
db.characters.createIndex({ team: 1, status: 1, power_level: -1 })
```

**Index Field Order Matters:**
```javascript
// This index can support:
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// ✅ Query 1: Uses full index
db.sightings.find({ creature_id: "creature_001", timestamp: { $gte: date } })

// ✅ Query 2: Uses prefix (creature_id only)
db.sightings.find({ creature_id: "creature_001" })

// ❌ Query 3: Cannot use index (timestamp alone)
db.sightings.find({ timestamp: { $gte: date } })
```

**Left-to-Right Rule:**
- Index can support queries on: field1, (field1, field2), (field1, field2, field3)
- Cannot support: field2 alone, field3 alone, (field2, field3)

**Sort Order in Index:**
```javascript
// Ascending (1) vs Descending (-1)
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// For query:
db.sightings.find({ creature_id: "creature_001" })
  .sort({ timestamp: -1 })  // ✅ Can use index for sort

db.sightings.find({ creature_id: "creature_001" })
  .sort({ timestamp: 1 })   // ❌ Cannot use index for sort (reverse order)
```

**Best Practices:**
1. **ESR Rule**: Equality, Sort, Range
   - Put equality fields first
   - Then sort fields
   - Then range fields

```javascript
// Good compound index order
db.collection.createIndex({
  status: 1,        // Equality
  created_at: -1,  // Sort
  age: 1           // Range
})

// Query that uses it efficiently:
db.collection.find({
  status: "active",           // Equality
  age: { $gte: 18, $lte: 65 } // Range
}).sort({ created_at: -1 })  // Sort
```

2. **Limit Number of Fields**: Too many fields in compound index reduces efficiency
3. **Consider Query Patterns**: Create indexes based on actual queries
4. **Monitor Index Usage**: Remove unused indexes

**Index Intersection:**
```javascript
// Two separate indexes
db.collection.createIndex({ status: 1 })
db.collection.createIndex({ age: 1 })

// MongoDB can intersect these for query:
db.collection.find({ status: "active", age: { $gte: 18 } })
// But compound index is more efficient
```

---

#### Q22: What is the aggregation pipeline in MongoDB?

**Answer:**
The aggregation pipeline is a framework for data processing that transforms documents through a series of stages.

**Pipeline Concept:**
```
Documents → [Stage 1] → [Stage 2] → [Stage 3] → Results
```

**Basic Syntax:**
```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
])
```

**Common Stages:**

**1. $match - Filter**
```javascript
{ $match: { status: "active", age: { $gte: 18 } } }
```

**2. $project - Reshape**
```javascript
{ $project: { name: 1, age: 1, _id: 0 } }
```

**3. $group - Aggregate**
```javascript
{
  $group: {
    _id: "$team",
    count: { $sum: 1 },
    avgAge: { $avg: "$age" }
  }
}
```

**4. $sort - Order**
```javascript
{ $sort: { age: -1 } }
```

**5. $limit / $skip - Pagination**
```javascript
{ $skip: 10 },
{ $limit: 5 }
```

**6. $lookup - Join**
```javascript
{
  $lookup: {
    from: "locations",
    localField: "location_id",
    foreignField: "_id",
    as: "location"
  }
}
```

**Complete Example:**
```javascript
db.characters.aggregate([
  // Stage 1: Filter
  { $match: { status: "active", team: "hawkins_heroes" } },
  
  // Stage 2: Group by team
  {
    $group: {
      _id: "$team",
      totalMembers: { $sum: 1 },
      avgPower: { $avg: "$power_level" },
      members: { $push: "$name" }
    }
  },
  
  // Stage 3: Sort
  { $sort: { totalMembers: -1 } },
  
  // Stage 4: Limit
  { $limit: 10 }
])
```

**Pipeline Benefits:**
- **Flexible**: Combine stages for complex operations
- **Efficient**: Each stage processes and passes results
- **Powerful**: Can do complex transformations
- **Readable**: Clear data flow

**Performance Tips:**
1. Place `$match` early to reduce documents
2. Use `$project` early to reduce document size
3. Use indexes for `$match` stages
4. Use `$limit` early when possible

---

#### Q23: How can you create an index in MongoDB and when should you do it?

**Answer:**

**Creating Indexes:**

**1. Single Field Index**
```javascript
// Ascending
db.characters.createIndex({ name: 1 })

// Descending
db.characters.createIndex({ age: -1 })
```

**2. Compound Index**
```javascript
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })
```

**3. Text Index**
```javascript
db.creatures.createIndex({
  name: "text",
  description: "text"
})
```

**4. Geospatial Index**
```javascript
db.locations.createIndex({ coordinates: "2dsphere" })
```

**5. Unique Index**
```javascript
db.characters.createIndex({ email: 1 }, { unique: true })
```

**6. Partial Index**
```javascript
db.characters.createIndex(
  { name: 1 },
  { partialFilterExpression: { status: "active" } }
)
```

**7. TTL Index**
```javascript
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

**8. Sparse Index**
```javascript
db.characters.createIndex(
  { email: 1 },
  { sparse: true }  // Only indexes documents with email field
)
```

**Index Options:**
```javascript
db.collection.createIndex(
  { field: 1 },
  {
    unique: true,                    // Enforce uniqueness
    sparse: true,                    // Skip null/missing values
    background: true,                // Build in background
    name: "custom_index_name",       // Custom name
    partialFilterExpression: { ... }, // Partial index filter
    expireAfterSeconds: 3600         // TTL index
  }
)
```

**When to Create Indexes:**

**✅ Create Indexes For:**
1. **Frequently queried fields**
   ```javascript
   // If you often query by status
   db.characters.createIndex({ status: 1 })
   ```

2. **Fields used in sorting**
   ```javascript
   // If you often sort by age
   db.characters.createIndex({ age: -1 })
   ```

3. **Fields used in $lookup**
   ```javascript
   // Foreign key fields
   db.sightings.createIndex({ creature_id: 1 })
   ```

4. **Compound queries**
   ```javascript
   // If you query by status AND sort by age
   db.characters.createIndex({ status: 1, age: -1 })
   ```

5. **Text search fields**
   ```javascript
   db.creatures.createIndex({ name: "text", description: "text" })
   ```

**❌ Don't Create Indexes For:**
1. Fields rarely queried
2. Fields with very low cardinality (few unique values)
3. Fields that change frequently (slows writes)
4. Too many indexes (slows writes, uses memory)

**Monitoring Indexes:**
```javascript
// List all indexes
db.collection.getIndexes()

// Check index usage
db.collection.aggregate([{ $indexStats: {} }])

// Drop index
db.collection.dropIndex("index_name")

// Rebuild index
db.collection.reIndex()
```

**Best Practices:**
- Create indexes based on actual query patterns
- Use compound indexes for multi-field queries
- Monitor index usage and remove unused ones
- Consider partial indexes for filtered queries
- Balance read performance vs write performance

---

#### Q24: Explain how MongoDB's `$match`, `$group` and `$sort` operators work in an aggregation pipeline.

**Answer:**

**1. $match - Filter Documents**
- Similar to SQL WHERE clause
- Should be placed early in pipeline
- Can use indexes if placed first
- Reduces number of documents flowing through pipeline

```javascript
{
  $match: {
    status: "active",
    age: { $gte: 18 },
    team: { $in: ["hawkins_heroes", "government"] }
  }
}
```

**Benefits:**
- Reduces memory usage
- Speeds up subsequent stages
- Can use indexes for fast filtering

**2. $group - Aggregate Data**
- Similar to SQL GROUP BY
- Groups documents by specified field(s)
- Uses accumulators to compute values
- Changes document structure

```javascript
{
  $group: {
    _id: "$team",              // Group by team
    totalMembers: { $sum: 1 },  // Count documents
    avgPower: { $avg: "$power_level" },
    maxPower: { $max: "$power_level" },
    minPower: { $min: "$power_level" },
    members: { $push: "$name" },  // Collect into array
    uniqueLocations: { $addToSet: "$location_id" }
  }
}
```

**Common Accumulators:**
- `$sum`: Sum values or count
- `$avg`: Average
- `$min` / `$max`: Extremes
- `$first` / `$last`: First/last value
- `$push`: Collect into array
- `$addToSet`: Collect unique values

**3. $sort - Order Results**
- Similar to SQL ORDER BY
- Can sort by one or multiple fields
- Uses index if available
- Should come after $match, before $limit

```javascript
// Single field
{ $sort: { age: -1 } }  // Descending

// Multiple fields
{
  $sort: {
    team: 1,      // First by team (ascending)
    age: -1       // Then by age (descending)
  }
}
```

**Combined Example:**
```javascript
db.characters.aggregate([
  // 1. Filter (use index)
  {
    $match: {
      status: "active",
      age: { $gte: 14 }
    }
  },
  
  // 2. Group
  {
    $group: {
      _id: "$team",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
      members: { $push: "$name" }
    }
  },
  
  // 3. Sort
  {
    $sort: { count: -1 }  // Teams with most members first
  },
  
  // 4. Limit
  { $limit: 5 }
])
```

**Pipeline Order Best Practices:**
1. `$match` first (filter early)
2. `$project` early (reduce size)
3. `$group` before `$lookup` (reduce documents)
4. `$sort` before `$limit` (for top N queries)
5. `$limit` early when possible

**Performance Impact:**
- `$match` early: Reduces documents (fast)
- `$group`: Can be expensive (processes all documents)
- `$sort`: Can use index if early, otherwise in-memory sort

---

#### Q25: What is the purpose of the `explain()` method?

**Answer:**
The `explain()` method provides information about how MongoDB executes a query, helping with performance optimization.

**Basic Usage:**
```javascript
// Explain find query
db.characters.find({ status: "active" }).explain()

// Explain aggregation
db.characters.aggregate([...]).explain()
```

**Explain Modes:**
```javascript
// queryPlanner (default) - Shows plan without executing
db.collection.find({...}).explain("queryPlanner")

// executionStats - Executes query and shows stats
db.collection.find({...}).explain("executionStats")

// allPlansExecution - Shows all considered plans
db.collection.find({...}).explain("allPlansExecution")
```

**Key Information in explain() Output:**

**1. Execution Stage:**
```javascript
{
  "stage": "IXSCAN",  // Index scan (good)
  // vs
  "stage": "COLLSCAN" // Collection scan (bad)
}
```

**2. Index Used:**
```javascript
{
  "stage": "IXSCAN",
  "indexName": "status_1",  // Which index was used
  "indexBounds": {
    "status": ["[\"active\", \"active\"]"]
  }
}
```

**3. Performance Metrics:**
```javascript
{
  "executionStats": {
    "executionTimeMillis": 5,        // Query time
    "totalDocsExamined": 100,        // Docs examined
    "nReturned": 50,                 // Docs returned
    "totalKeysExamined": 100,        // Index keys examined
    "stage": "IXSCAN"
  }
}
```

**4. Winning Plan:**
```javascript
{
  "queryPlanner": {
    "winningPlan": {
      "stage": "IXSCAN",
      "indexName": "status_1"
    },
    "rejectedPlans": [...]  // Other plans considered
  }
}
```

**Interpreting Results:**

**Good Query (Uses Index):**
```javascript
db.characters.find({ status: "active" }).explain("executionStats")
// {
//   stage: "IXSCAN",
//   executionTimeMillis: 5,
//   totalDocsExamined: 100,
//   nReturned: 100
// }
```

**Bad Query (Collection Scan):**
```javascript
db.characters.find({ name: /Eleven/ }).explain("executionStats")
// {
//   stage: "COLLSCAN",
//   executionTimeMillis: 5000,
//   totalDocsExamined: 1000000,
//   nReturned: 1
// }
```

**Performance Indicators:**
- **IXSCAN**: Good (uses index)
- **COLLSCAN**: Bad (scans entire collection)
- **Low executionTimeMillis**: Fast
- **totalDocsExamined ≈ nReturned**: Efficient
- **totalDocsExamined >> nReturned**: Inefficient

**Using explain() for Optimization:**
```javascript
// 1. Check current performance
db.collection.find({ status: "active" }).explain("executionStats")

// 2. If COLLSCAN, create index
db.collection.createIndex({ status: 1 })

// 3. Verify index is used
db.collection.find({ status: "active" }).explain("executionStats")
// Should show IXSCAN now
```

**Best Practices:**
- Use `executionStats` for actual performance metrics
- Look for COLLSCAN (needs index)
- Check totalDocsExamined vs nReturned ratio
- Monitor executionTimeMillis
- Use explain() before and after optimization

---