import { Router } from 'express';
import { getDb } from '../config/database.js';

const router = Router();

// Execute custom pipeline
router.post('/execute', async (req, res) => {
  try {
    const { collection, pipeline, explain = false } = req.body;
    
    if (!collection || !pipeline) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['collection', 'pipeline']
      });
    }

    if (!Array.isArray(pipeline)) {
      return res.status(400).json({ 
        error: 'Pipeline must be an array of stages'
      });
    }

    const validCollections = ['characters', 'locations', 'creatures', 'sightings', 'status_reports', 'events'];
    
    if (!validCollections.includes(collection)) {
      return res.status(400).json({ 
        error: 'Invalid collection',
        validCollections
      });
    }

    const db = getDb();
    const coll = db.collection(collection);

    // Validate and sanitize pipeline
    const sanitizedPipeline = sanitizePipeline(pipeline);

    if (explain) {
      const explainResult = await coll.aggregate(sanitizedPipeline).explain('executionStats');
      
      return res.json({
        success: true,
        explain: true,
        executionStats: {
          executionTimeMillis: explainResult.executionStats?.executionTimeMillis,
          totalDocsExamined: explainResult.executionStats?.totalDocsExamined,
          totalKeysExamined: explainResult.executionStats?.totalKeysExamined,
          nReturned: explainResult.executionStats?.nReturned
        },
        queryPlan: explainResult.queryPlanner,
        stages: explainResult.stages
      });
    }

    const startTime = Date.now();
    const results = await coll.aggregate(sanitizedPipeline).toArray();
    const executionTime = Date.now() - startTime;

    res.json({
      success: true,
      collection,
      pipeline: sanitizedPipeline,
      resultCount: results.length,
      executionTimeMs: executionTime,
      results
    });
  } catch (error) {
    console.error('Pipeline execution error:', error);
    res.status(500).json({ 
      error: 'Pipeline execution failed',
      message: error.message,
      hint: getErrorHint(error)
    });
  }
});

// Get pipeline stage documentation
router.get('/stages', (req, res) => {
  const stages = {
    $match: {
      description: 'Filters documents to pass only those that match the specified condition(s)',
      syntax: '{ $match: { <query> } }',
      example: '{ $match: { status: "active", age: { $gte: 18 } } }',
      tips: [
        'Place $match as early as possible to reduce documents',
        'Uses indexes when at the beginning of pipeline',
        'Supports all query operators'
      ]
    },
    $project: {
      description: 'Reshapes documents by including, excluding, or computing new fields',
      syntax: '{ $project: { <field1>: <1 or 0>, <newField>: <expression> } }',
      example: '{ $project: { name: 1, _id: 0, fullName: { $concat: ["$first", " ", "$last"] } } }',
      tips: [
        '1 includes field, 0 excludes field',
        'Can compute new fields with expressions',
        'Cannot mix inclusion and exclusion (except _id)'
      ]
    },
    $group: {
      description: 'Groups documents by a specified expression and applies accumulators',
      syntax: '{ $group: { _id: <expression>, <field>: { <accumulator>: <expression> } } }',
      example: '{ $group: { _id: "$category", total: { $sum: "$amount" }, avg: { $avg: "$amount" } } }',
      accumulators: ['$sum', '$avg', '$min', '$max', '$first', '$last', '$push', '$addToSet'],
      tips: [
        '_id: null groups all documents',
        '$push collects into array',
        '$addToSet collects unique values'
      ]
    },
    $sort: {
      description: 'Sorts documents by specified field(s)',
      syntax: '{ $sort: { <field1>: <1 or -1>, <field2>: <1 or -1> } }',
      example: '{ $sort: { score: -1, name: 1 } }',
      tips: [
        '1 for ascending, -1 for descending',
        'Can sort by multiple fields',
        'Uses indexes when possible'
      ]
    },
    $limit: {
      description: 'Limits the number of documents passed to the next stage',
      syntax: '{ $limit: <positive integer> }',
      example: '{ $limit: 10 }',
      tips: [
        'Use with $sort for top-N queries',
        'Placed early can improve performance'
      ]
    },
    $skip: {
      description: 'Skips the specified number of documents',
      syntax: '{ $skip: <positive integer> }',
      example: '{ $skip: 20 }',
      tips: [
        'Use with $limit for pagination',
        'Large skip values can be slow'
      ]
    },
    $lookup: {
      description: 'Performs a left outer join with another collection',
      syntax: '{ $lookup: { from: <collection>, localField: <field>, foreignField: <field>, as: <outputArray> } }',
      example: '{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userOrders" } }',
      advancedSyntax: '{ $lookup: { from: <coll>, let: { <var>: <expr> }, pipeline: [...], as: <output> } }',
      tips: [
        'Result is always an array',
        'Use $unwind to flatten',
        'Pipeline syntax allows complex joins'
      ]
    },
    $unwind: {
      description: 'Deconstructs an array field into multiple documents',
      syntax: '{ $unwind: <arrayFieldPath> }',
      example: '{ $unwind: "$tags" }',
      options: {
        path: 'Array field path',
        preserveNullAndEmptyArrays: 'Keep documents with empty/null arrays',
        includeArrayIndex: 'Add field with array index'
      },
      tips: [
        'Creates one document per array element',
        'Use preserveNullAndEmptyArrays: true for LEFT JOIN behavior'
      ]
    },
    $facet: {
      description: 'Processes multiple aggregation pipelines in parallel on the same input',
      syntax: '{ $facet: { <outputField1>: [ <stage1>, ... ], <outputField2>: [ <stage1>, ... ] } }',
      example: '{ $facet: { topProducts: [{ $sort: { sales: -1 }}, { $limit: 5 }], categoryStats: [{ $group: { _id: "$category", count: { $sum: 1 }}}] } }',
      tips: [
        'Each facet runs independently',
        'Great for dashboard queries',
        'Output is single document with facet results as arrays'
      ]
    },
    $addFields: {
      description: 'Adds new fields to documents',
      syntax: '{ $addFields: { <newField>: <expression>, ... } }',
      example: '{ $addFields: { totalPrice: { $multiply: ["$price", "$quantity"] } } }',
      tips: [
        'Like $project but keeps existing fields',
        'Can overwrite existing fields',
        'Supports all expressions'
      ]
    },
    $bucket: {
      description: 'Categorizes documents into groups based on specified boundaries',
      syntax: '{ $bucket: { groupBy: <expr>, boundaries: [...], default: <literal>, output: {...} } }',
      example: '{ $bucket: { groupBy: "$age", boundaries: [0, 18, 30, 50, 100], default: "Other", output: { count: { $sum: 1 } } } }',
      tips: [
        'Great for histograms',
        'Boundaries must be sorted',
        'Default catches values outside boundaries'
      ]
    }
  };

  res.json(stages);
});

// Get operators documentation
router.get('/operators', (req, res) => {
  const operators = {
    comparison: {
      $eq: 'Equal to',
      $ne: 'Not equal to',
      $gt: 'Greater than',
      $gte: 'Greater than or equal',
      $lt: 'Less than',
      $lte: 'Less than or equal',
      $in: 'Matches any value in array',
      $nin: 'Matches none of the values in array'
    },
    logical: {
      $and: 'Joins with logical AND',
      $or: 'Joins with logical OR',
      $not: 'Inverts the effect',
      $nor: 'Joins with logical NOR'
    },
    array: {
      $elemMatch: 'Matches documents with array element matching all conditions',
      $size: 'Matches arrays with specified size',
      $all: 'Matches arrays containing all specified elements'
    },
    arithmetic: {
      $add: 'Adds numbers or dates',
      $subtract: 'Subtracts',
      $multiply: 'Multiplies',
      $divide: 'Divides',
      $mod: 'Modulo operation'
    },
    string: {
      $concat: 'Concatenates strings',
      $substr: 'Extracts substring',
      $toLower: 'Converts to lowercase',
      $toUpper: 'Converts to uppercase',
      $trim: 'Removes whitespace'
    },
    date: {
      $year: 'Extracts year',
      $month: 'Extracts month',
      $dayOfMonth: 'Extracts day',
      $hour: 'Extracts hour',
      $minute: 'Extracts minute',
      $dateToString: 'Formats date as string'
    },
    conditional: {
      $cond: 'If-then-else',
      $ifNull: 'Returns first non-null value',
      $switch: 'Multiple conditions'
    },
    accumulators: {
      $sum: 'Sum of values',
      $avg: 'Average of values',
      $min: 'Minimum value',
      $max: 'Maximum value',
      $first: 'First value in group',
      $last: 'Last value in group',
      $push: 'Array of all values',
      $addToSet: 'Array of unique values'
    }
  };

  res.json(operators);
});

// Validate pipeline
router.post('/validate', (req, res) => {
  try {
    const { pipeline } = req.body;
    
    if (!Array.isArray(pipeline)) {
      return res.json({
        valid: false,
        errors: ['Pipeline must be an array']
      });
    }

    const validStages = [
      '$match', '$project', '$group', '$sort', '$limit', '$skip',
      '$lookup', '$unwind', '$facet', '$addFields', '$set',
      '$bucket', '$bucketAuto', '$count', '$sample', '$merge',
      '$out', '$replaceRoot', '$redact', '$sortByCount'
    ];

    const errors = [];
    const warnings = [];

    pipeline.forEach((stage, index) => {
      const stageKeys = Object.keys(stage);
      
      if (stageKeys.length !== 1) {
        errors.push(`Stage ${index}: Each stage must have exactly one operator`);
        return;
      }

      const operator = stageKeys[0];
      
      if (!validStages.includes(operator)) {
        errors.push(`Stage ${index}: Unknown operator '${operator}'`);
      }
    });

    // Performance warnings
    if (pipeline.length > 0 && !Object.keys(pipeline[0]).includes('$match')) {
      warnings.push('Consider adding $match as first stage to filter early');
    }

    const lookupIndex = pipeline.findIndex(s => Object.keys(s).includes('$lookup'));
    const groupIndex = pipeline.findIndex(s => Object.keys(s).includes('$group'));
    
    if (lookupIndex !== -1 && groupIndex !== -1 && lookupIndex < groupIndex) {
      warnings.push('Consider grouping before $lookup when possible for better performance');
    }

    res.json({
      valid: errors.length === 0,
      errors,
      warnings,
      stageCount: pipeline.length
    });
  } catch (error) {
    res.json({
      valid: false,
      errors: [error.message]
    });
  }
});

function sanitizePipeline(pipeline) {
  // Basic sanitization - remove dangerous operators
  const dangerous = ['$out', '$merge'];
  
  return pipeline.filter(stage => {
    const key = Object.keys(stage)[0];
    return !dangerous.includes(key);
  });
}

function getErrorHint(error) {
  const message = error.message.toLowerCase();
  
  if (message.includes('$lookup')) {
    return 'Check $lookup syntax: from, localField, foreignField, and as are required';
  }
  if (message.includes('$group')) {
    return '$group requires _id field. Use _id: null to group all documents';
  }
  if (message.includes('$unwind')) {
    return '$unwind path must start with $ and reference an array field';
  }
  if (message.includes('$match')) {
    return 'Check query syntax in $match stage';
  }
  
  return 'Check pipeline syntax and field references';
}

export default router;
