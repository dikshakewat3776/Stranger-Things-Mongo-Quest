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
