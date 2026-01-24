import { Router } from 'express';
import { getDb } from '../config/database.js';
import {
  mission1Explanations,
  mission2Explanations,
  mission3Explanations,
  mission4Explanations
} from '../pipelines/index.js';

const router = Router();

// Get learning content for all concepts
router.get('/concepts', (req, res) => {
  const concepts = {
    aggregationFramework: {
      title: 'Aggregation Framework',
      description: 'MongoDB\'s powerful data processing pipeline',
      content: `
The Aggregation Framework is MongoDB's data processing powerhouse. 
Think of it as an assembly line where documents flow through stages, 
each stage transforming the data in some way.

**Key Concepts:**
- Pipeline: Array of stages executed in order
- Stage: Single transformation operation
- Expression: Computes values within stages

**Why Use Aggregation?**
- Complex queries beyond simple find()
- Data transformation and reshaping
- Analytics and reporting
- Real-time dashboards

**Performance Tips:**
- Place $match early to filter data
- Use indexes for initial $match
- Project only needed fields
- Consider pipeline order carefully
      `,
      relatedMissions: [1, 2, 3, 4]
    },
    match: {
      title: '$match Stage',
      description: 'Filter documents like WHERE in SQL',
      content: `
$match filters documents to pass only those matching specified conditions.

**Syntax:**
\`\`\`javascript
{ $match: { <query> } }
\`\`\`

**Examples:**
\`\`\`javascript
// Simple equality
{ $match: { status: "active" } }

// Comparison operators
{ $match: { age: { $gte: 18 } } }

// Multiple conditions (AND)
{ $match: { status: "active", role: "admin" } }

// OR conditions
{ $match: { $or: [{ status: "active" }, { priority: "high" }] } }

// Array contains
{ $match: { tags: "important" } }

// Regex
{ $match: { name: { $regex: /^John/i } } }
\`\`\`

**Best Practices:**
- Always place $match as early as possible
- Uses indexes when at pipeline start
- Combine conditions for efficiency
      `,
      relatedMissions: [1]
    },
    lookup: {
      title: '$lookup Stage',
      description: 'Join collections like SQL JOINs',
      content: `
$lookup performs a left outer join with another collection.

**Basic Syntax:**
\`\`\`javascript
{
  $lookup: {
    from: "otherCollection",    // Collection to join
    localField: "field1",       // Field from input documents
    foreignField: "field2",     // Field from "from" collection
    as: "outputArray"           // Output array field name
  }
}
\`\`\`

**Pipeline Syntax (Advanced):**
\`\`\`javascript
{
  $lookup: {
    from: "otherCollection",
    let: { localVar: "$localField" },  // Variables for pipeline
    pipeline: [
      { $match: { $expr: { $eq: ["$foreignField", "$$localVar"] } } },
      { $sort: { date: -1 } },
      { $limit: 5 }
    ],
    as: "output"
  }
}
\`\`\`

**Important Notes:**
- Result is ALWAYS an array (even for 1:1 relationships)
- Use $unwind to flatten the result
- Pipeline syntax allows complex filtering of joined documents
      `,
      relatedMissions: [2]
    },
    facet: {
      title: '$facet Stage',
      description: 'Run multiple pipelines in parallel',
      content: `
$facet processes multiple aggregation pipelines on the same input documents.

**Syntax:**
\`\`\`javascript
{
  $facet: {
    "outputField1": [ /* pipeline 1 */ ],
    "outputField2": [ /* pipeline 2 */ ],
    "outputField3": [ /* pipeline 3 */ ]
  }
}
\`\`\`

**Example:**
\`\`\`javascript
{
  $facet: {
    "totalCount": [
      { $count: "count" }
    ],
    "topItems": [
      { $sort: { score: -1 } },
      { $limit: 5 }
    ],
    "byCategory": [
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]
  }
}
\`\`\`

**Use Cases:**
- Dashboard queries (multiple metrics at once)
- Search facets (like e-commerce filters)
- Parallel analytics
      `,
      relatedMissions: [3]
    },
    group: {
      title: '$group Stage',
      description: 'Aggregate documents like GROUP BY',
      content: `
$group separates documents into groups and applies accumulators.

**Syntax:**
\`\`\`javascript
{
  $group: {
    _id: <expression>,           // Group key
    <field>: { <accumulator>: <expression> }
  }
}
\`\`\`

**Accumulators:**
- $sum: Sum of numeric values
- $avg: Average of numeric values
- $min / $max: Minimum / maximum value
- $first / $last: First / last value in group
- $push: Array of all values
- $addToSet: Array of unique values

**Examples:**
\`\`\`javascript
// Group by single field
{ $group: { _id: "$category", total: { $sum: "$amount" } } }

// Group by multiple fields
{ $group: { _id: { year: "$year", month: "$month" }, count: { $sum: 1 } } }

// Group all documents
{ $group: { _id: null, grandTotal: { $sum: "$amount" } } }

// Conditional counting
{ $group: { 
    _id: "$type",
    active: { $sum: { $cond: ["$isActive", 1, 0] } }
  }
}
\`\`\`
      `,
      relatedMissions: [1, 3, 4]
    },
    unwind: {
      title: '$unwind Stage',
      description: 'Deconstruct arrays into documents',
      content: `
$unwind deconstructs an array field, creating one document per element.

**Basic Syntax:**
\`\`\`javascript
{ $unwind: "$arrayField" }
\`\`\`

**Full Syntax:**
\`\`\`javascript
{
  $unwind: {
    path: "$arrayField",
    preserveNullAndEmptyArrays: true,  // Keep docs with empty/missing arrays
    includeArrayIndex: "indexField"     // Add field with array index
  }
}
\`\`\`

**Example:**
Before: \`{ name: "John", tags: ["a", "b", "c"] }\`
After $unwind: 
\`\`\`
{ name: "John", tags: "a" }
{ name: "John", tags: "b" }
{ name: "John", tags: "c" }
\`\`\`

**Use Cases:**
- Flattening $lookup results
- Processing array elements individually
- Array analytics
      `,
      relatedMissions: [2, 3]
    },
    indexing: {
      title: 'Indexing Strategies',
      description: 'Optimize query performance',
      content: `
Indexes are crucial for MongoDB performance.

**Index Types:**
- Single Field: \`{ field: 1 }\`
- Compound: \`{ field1: 1, field2: -1 }\`
- Text: \`{ field: "text" }\`
- Geospatial: \`{ location: "2dsphere" }\`

**Creating Indexes:**
\`\`\`javascript
db.collection.createIndex({ field: 1 })
db.collection.createIndex({ field1: 1, field2: -1 })
db.collection.createIndex({ name: "text", description: "text" })
\`\`\`

**Best Practices:**
- Index fields used in $match
- Index fields used in $sort
- Consider compound indexes for multiple fields
- Use explain() to verify index usage

**The ESR Rule (Equality, Sort, Range):**
For compound indexes, order fields by:
1. Equality conditions first
2. Sort fields second
3. Range conditions last
      `,
      relatedMissions: [1, 4]
    },
    schemaDesign: {
      title: 'Schema Design',
      description: 'Embedded vs Referenced documents',
      content: `
MongoDB offers flexibility in schema design. Choose wisely!

**Embedded Documents:**
\`\`\`javascript
{
  name: "Order",
  items: [
    { product: "Widget", qty: 5 },
    { product: "Gadget", qty: 2 }
  ]
}
\`\`\`

**Referenced Documents:**
\`\`\`javascript
// Orders collection
{ _id: "order1", customer_id: "cust1" }

// Customers collection
{ _id: "cust1", name: "John" }
\`\`\`

**When to Embed:**
- One-to-few relationships
- Data always accessed together
- Data that doesn't change often

**When to Reference:**
- One-to-many (unbounded) relationships
- Data accessed independently
- Frequently updated data
- Large documents

**Our Game Example:**
- Characters EMBED abilities (always accessed together)
- Sightings REFERENCE creatures/locations (many-to-many)
      `,
      relatedMissions: [1, 2]
    }
  };

  res.json(concepts);
});

// Get mission explanations
router.get('/missions/:id/explanations', (req, res) => {
  const explanations = {
    1: mission1Explanations,
    2: mission2Explanations,
    3: mission3Explanations,
    4: mission4Explanations
  };

  const missionExplanations = explanations[req.params.id];
  
  if (!missionExplanations) {
    return res.status(404).json({ error: 'Mission not found' });
  }

  res.json(missionExplanations);
});

// Execute pipeline with step-by-step intermediate results
router.post('/pipeline/visualize', async (req, res) => {
  try {
    const { collection, pipeline } = req.body;
    const db = getDb();
    
    const validCollections = ['characters', 'locations', 'creatures', 'sightings', 'status_reports', 'events'];
    
    if (!validCollections.includes(collection)) {
      return res.status(400).json({ error: 'Invalid collection' });
    }

    const coll = db.collection(collection);
    const results = [];

    // Execute pipeline stage by stage
    for (let i = 0; i < pipeline.length; i++) {
      const partialPipeline = pipeline.slice(0, i + 1);
      const stageResult = await coll.aggregate(partialPipeline).limit(5).toArray();
      
      results.push({
        stageIndex: i,
        stage: Object.keys(pipeline[i])[0],
        stageConfig: pipeline[i],
        documentCount: stageResult.length,
        sampleDocuments: stageResult
      });
    }

    res.json({
      collection,
      totalStages: pipeline.length,
      stageResults: results
    });
  } catch (error) {
    console.error('Visualization error:', error);
    res.status(500).json({ 
      error: 'Failed to visualize pipeline',
      message: error.message
    });
  }
});

// Get quiz questions
router.get('/quiz/:missionId', (req, res) => {
  const quizzes = {
    1: [
      {
        id: 'q1_1',
        question: 'What does the $match stage do?',
        options: [
          'Joins two collections',
          'Filters documents based on conditions',
          'Groups documents together',
          'Sorts documents'
        ],
        correct: 1,
        explanation: '$match filters documents, similar to WHERE in SQL. It should be placed early in pipelines for performance.'
      },
      {
        id: 'q1_2',
        question: 'Which operator finds values greater than or equal to a number?',
        options: ['$gt', '$gte', '$ge', '$gteq'],
        correct: 1,
        explanation: '$gte means "greater than or equal". $gt means "greater than" only.'
      },
      {
        id: 'q1_3',
        question: 'Why should $match be placed early in the pipeline?',
        options: [
          'It looks prettier',
          'It can use indexes and reduces documents for later stages',
          'It must come first by rule',
          'It doesn\'t matter where it\'s placed'
        ],
        correct: 1,
        explanation: '$match at the start can use indexes and reduces the number of documents that flow through the rest of the pipeline, improving performance.'
      }
    ],
    2: [
      {
        id: 'q2_1',
        question: 'What type of join does $lookup perform?',
        options: [
          'Inner join',
          'Right outer join',
          'Left outer join',
          'Cross join'
        ],
        correct: 2,
        explanation: '$lookup performs a left outer join - all documents from the left collection are kept, even without matches.'
      },
      {
        id: 'q2_2',
        question: 'What is the result type of a $lookup?',
        options: [
          'Single document',
          'Always an array',
          'Depends on matches',
          'Number'
        ],
        correct: 1,
        explanation: '$lookup always returns an array, even for one-to-one relationships. Use $unwind to flatten it.'
      },
      {
        id: 'q2_3',
        question: 'What does preserveNullAndEmptyArrays do in $unwind?',
        options: [
          'Throws an error',
          'Removes documents with empty arrays',
          'Keeps documents even with empty/missing arrays',
          'Creates null values'
        ],
        correct: 2,
        explanation: 'preserveNullAndEmptyArrays: true keeps documents that have empty or missing array fields, like LEFT JOIN behavior.'
      }
    ],
    3: [
      {
        id: 'q3_1',
        question: 'What does $facet allow you to do?',
        options: [
          'Join multiple collections',
          'Run multiple pipelines in parallel on the same data',
          'Split data into files',
          'Create indexes'
        ],
        correct: 1,
        explanation: '$facet runs multiple aggregation pipelines simultaneously on the same input documents.'
      },
      {
        id: 'q3_2',
        question: 'What is the output format of $facet?',
        options: [
          'Multiple documents',
          'Single document with arrays for each facet',
          'Nested arrays',
          'String'
        ],
        correct: 1,
        explanation: '$facet outputs a single document where each field contains the array results of its pipeline.'
      },
      {
        id: 'q3_3',
        question: 'What does $bucket do?',
        options: [
          'Stores documents in files',
          'Groups numeric values into ranges',
          'Sorts documents',
          'Removes duplicates'
        ],
        correct: 1,
        explanation: '$bucket groups numeric values into specified ranges/boundaries - perfect for histograms and distributions.'
      }
    ],
    4: [
      {
        id: 'q4_1',
        question: 'What does $addToSet do vs $push?',
        options: [
          'They are identical',
          '$addToSet keeps only unique values',
          '$push keeps only unique values',
          '$addToSet sorts the values'
        ],
        correct: 1,
        explanation: '$addToSet only adds unique values to the array, while $push adds all values including duplicates.'
      },
      {
        id: 'q4_2',
        question: 'How can you check if MongoDB uses an index?',
        options: [
          'console.log()',
          'explain() method',
          'Check the logs',
          'MongoDB always uses indexes'
        ],
        correct: 1,
        explanation: 'The explain() method shows the query plan, including whether indexes were used (IXSCAN vs COLLSCAN).'
      },
      {
        id: 'q4_3',
        question: 'What requires a text index?',
        options: [
          '$match',
          '$lookup',
          '$text search',
          '$regex'
        ],
        correct: 2,
        explanation: '$text queries require a text index on the fields being searched. $regex does not require a text index.'
      }
    ]
  };

  const quiz = quizzes[req.params.missionId];
  
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  // Don't send correct answers to client initially
  const clientQuiz = quiz.map(q => ({
    ...q,
    correct: undefined,
    explanation: undefined
  }));

  res.json(clientQuiz);
});

// Check quiz answers
router.post('/quiz/:missionId/check', (req, res) => {
  const { answers } = req.body;
  
  const quizzes = {
    1: [
      { id: 'q1_1', correct: 1, explanation: '$match filters documents, similar to WHERE in SQL.' },
      { id: 'q1_2', correct: 1, explanation: '$gte means "greater than or equal".' },
      { id: 'q1_3', correct: 1, explanation: '$match at the start can use indexes.' }
    ],
    2: [
      { id: 'q2_1', correct: 2, explanation: '$lookup performs a left outer join.' },
      { id: 'q2_2', correct: 1, explanation: '$lookup always returns an array.' },
      { id: 'q2_3', correct: 2, explanation: 'preserveNullAndEmptyArrays keeps documents with empty arrays.' }
    ],
    3: [
      { id: 'q3_1', correct: 1, explanation: '$facet runs multiple pipelines in parallel.' },
      { id: 'q3_2', correct: 1, explanation: '$facet outputs a single document with arrays.' },
      { id: 'q3_3', correct: 1, explanation: '$bucket groups values into ranges.' }
    ],
    4: [
      { id: 'q4_1', correct: 1, explanation: '$addToSet keeps only unique values.' },
      { id: 'q4_2', correct: 1, explanation: 'explain() shows the query plan.' },
      { id: 'q4_3', correct: 2, explanation: '$text requires a text index.' }
    ]
  };

  const quiz = quizzes[req.params.missionId];
  
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  let correct = 0;
  const results = quiz.map(q => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correct;
    if (isCorrect) correct++;
    
    return {
      id: q.id,
      correct: isCorrect,
      correctAnswer: q.correct,
      explanation: q.explanation
    };
  });

  res.json({
    score: correct,
    total: quiz.length,
    percentage: Math.round((correct / quiz.length) * 100),
    results
  });
});

export default router;
