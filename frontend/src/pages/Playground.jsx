import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Play, 
  Database, 
  AlertTriangle,
  CheckCircle2,
  Info,
  Trash2,
  Download,
  Copy,
  Check
} from 'lucide-react';

const collections = ['characters', 'locations', 'creatures', 'sightings', 'status_reports', 'events'];

const examplePipelines = {
  basicMatch: `[
  { "$match": { "status": "active" } },
  { "$project": { "name": 1, "status": 1, "power_level": 1 } },
  { "$sort": { "power_level": -1 } },
  { "$limit": 5 }
]`,
  groupByStatus: `[
  { "$group": {
      "_id": "$status",
      "count": { "$sum": 1 },
      "avgPower": { "$avg": "$power_level" },
      "characters": { "$push": "$name" }
    }
  },
  { "$sort": { "count": -1 } }
]`,
  lookupExample: `[
  { "$match": { "confirmed": true } },
  { "$lookup": {
      "from": "creatures",
      "localField": "creature_id",
      "foreignField": "_id",
      "as": "creature"
    }
  },
  { "$unwind": "$creature" },
  { "$project": {
      "description": 1,
      "casualties": 1,
      "creature_name": "$creature.name",
      "threat_level": "$creature.threat_level"
    }
  },
  { "$sort": { "casualties": -1 } },
  { "$limit": 5 }
]`,
  facetExample: `[
  { "$facet": {
      "byType": [
        { "$group": { "_id": "$type", "count": { "$sum": 1 } } },
        { "$sort": { "count": -1 } }
      ],
      "topThreats": [
        { "$sort": { "threat_level": -1 } },
        { "$limit": 3 },
        { "$project": { "name": 1, "threat_level": 1 } }
      ],
      "totalKills": [
        { "$group": { "_id": null, "total": { "$sum": "$confirmed_kills" } } }
      ]
    }
  }
]`
};

export default function Playground({ learningMode }) {
  const [collection, setCollection] = useState('characters');
  const [pipeline, setPipeline] = useState(examplePipelines.basicMatch);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [validation, setValidation] = useState(null);
  const [copied, setCopied] = useState(false);

  const executePipeline = async () => {
    setExecuting(true);
    setError(null);
    
    try {
      const parsedPipeline = JSON.parse(pipeline);
      
      const res = await fetch('/api/pipelines/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection,
          pipeline: parsedPipeline
        })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data);
        setResults(null);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError({ 
        error: 'Invalid JSON', 
        message: err.message,
        hint: 'Check your JSON syntax. Common issues: trailing commas, unquoted keys.'
      });
      setResults(null);
    } finally {
      setExecuting(false);
    }
  };

  const validatePipeline = async () => {
    try {
      const parsedPipeline = JSON.parse(pipeline);
      
      const res = await fetch('/api/pipelines/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pipeline: parsedPipeline })
      });
      
      const data = await res.json();
      setValidation(data);
    } catch (err) {
      setValidation({
        valid: false,
        errors: ['Invalid JSON: ' + err.message]
      });
    }
  };

  const loadExample = (key) => {
    setPipeline(examplePipelines[key]);
    setError(null);
    setResults(null);
    setValidation(null);
    
    // Set appropriate collection for example
    if (key === 'lookupExample') setCollection('sightings');
    else if (key === 'facetExample') setCollection('creatures');
    else setCollection('characters');
  };

  const copyPipeline = async () => {
    try {
      await navigator.clipboard.writeText(pipeline);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Editor */}
        <div className="lg:col-span-7">
          <div className="card">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="bg-upside-down-700 border border-upside-down-500 rounded-lg px-4 py-2"
                >
                  {collections.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                
                <button
                  onClick={validatePipeline}
                  className="btn-secondary text-sm"
                >
                  Validate
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyPipeline}
                  className="p-2 hover:bg-upside-down-700 rounded transition-colors"
                  title="Copy pipeline"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-hawkins-fog" />}
                </button>
                <button
                  onClick={() => {
                    setPipeline('[\n  \n]');
                    setResults(null);
                    setError(null);
                    setValidation(null);
                  }}
                  className="p-2 hover:bg-upside-down-700 rounded transition-colors"
                  title="Clear"
                >
                  <Trash2 size={18} className="text-hawkins-fog" />
                </button>
              </div>
            </div>

            {/* Pipeline Editor */}
            <div className="code-editor mb-4">
              <div className="p-3 bg-upside-down-700 border-b border-upside-down-600 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-hawkins-fog ml-2">Pipeline Editor</span>
              </div>
              <textarea
                value={pipeline}
                onChange={(e) => {
                  setPipeline(e.target.value);
                  setValidation(null);
                }}
                className="w-full h-80 bg-[#0d0d0d] text-green-400 font-mono text-sm p-4 
                           resize-none focus:outline-none"
                placeholder="Enter your aggregation pipeline..."
                spellCheck="false"
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className={`p-4 rounded-lg mb-4 ${validation.valid ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {validation.valid ? (
                    <CheckCircle2 className="text-green-500" size={18} />
                  ) : (
                    <AlertTriangle className="text-red-500" size={18} />
                  )}
                  <span className={validation.valid ? 'text-green-400' : 'text-red-400'}>
                    {validation.valid ? 'Pipeline is valid' : 'Pipeline has issues'}
                  </span>
                </div>
                {validation.errors?.length > 0 && (
                  <ul className="text-sm text-red-300 space-y-1">
                    {validation.errors.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                )}
                {validation.warnings?.length > 0 && (
                  <ul className="text-sm text-yellow-300 space-y-1 mt-2">
                    {validation.warnings.map((warn, i) => (
                      <li key={i}>⚠️ {warn}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Execute Button */}
            <button
              onClick={executePipeline}
              disabled={executing}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {executing ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Executing...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Execute Pipeline
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {(results || error) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mt-6"
            >
              {error ? (
                <div className="text-red-400">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={20} />
                    <span className="font-bold">{error.error}</span>
                  </div>
                  <p className="text-sm text-red-300">{error.message}</p>
                  {error.hint && (
                    <p className="text-sm text-hawkins-fog mt-2">💡 {error.hint}</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span className="font-bold text-white">Results</span>
                    </div>
                    <span className="text-sm text-hawkins-fog">
                      {results.resultCount} documents • {results.executionTimeMs}ms
                    </span>
                  </div>
                  
                  <SyntaxHighlighter
                    language="json"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: '8px',
                      fontSize: '12px',
                      background: '#0d0d0d',
                      maxHeight: '400px',
                    }}
                  >
                    {JSON.stringify(results.results, null, 2)}
                  </SyntaxHighlighter>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Example Pipelines */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Example Pipelines</h3>
            <div className="space-y-3">
              {[
                { key: 'basicMatch', label: 'Basic $match + $project', collection: 'characters' },
                { key: 'groupByStatus', label: '$group aggregation', collection: 'characters' },
                { key: 'lookupExample', label: '$lookup join', collection: 'sightings' },
                { key: 'facetExample', label: '$facet parallel', collection: 'creatures' },
              ].map((example) => (
                <button
                  key={example.key}
                  onClick={() => loadExample(example.key)}
                  className="w-full text-left px-4 py-3 bg-upside-down-700 rounded-lg hover:bg-upside-down-600 transition-colors"
                >
                  <span className="text-white">{example.label}</span>
                  <span className="text-xs text-hawkins-fog block">
                    Collection: {example.collection}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          {learningMode && (
            <div className="card border-neon-blue/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="text-neon-blue" size={20} />
                Quick Reference
              </h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-blood-red-light font-medium mb-2">Common Stages</h4>
                  <div className="space-y-1 text-hawkins-light">
                    <p><code className="text-neon-blue">$match</code> - Filter documents</p>
                    <p><code className="text-neon-blue">$project</code> - Shape output</p>
                    <p><code className="text-neon-blue">$group</code> - Aggregate data</p>
                    <p><code className="text-neon-blue">$sort</code> - Order results</p>
                    <p><code className="text-neon-blue">$lookup</code> - Join collections</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-blood-red-light font-medium mb-2">Comparison Operators</h4>
                  <div className="space-y-1 text-hawkins-light">
                    <p><code className="text-neon-blue">$eq, $ne</code> - Equal, not equal</p>
                    <p><code className="text-neon-blue">$gt, $gte</code> - Greater than</p>
                    <p><code className="text-neon-blue">$lt, $lte</code> - Less than</p>
                    <p><code className="text-neon-blue">$in, $nin</code> - In array</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-blood-red-light font-medium mb-2">Accumulators</h4>
                  <div className="space-y-1 text-hawkins-light">
                    <p><code className="text-neon-blue">$sum</code> - Sum values</p>
                    <p><code className="text-neon-blue">$avg</code> - Average</p>
                    <p><code className="text-neon-blue">$push</code> - Collect into array</p>
                    <p><code className="text-neon-blue">$first, $last</code> - First/last value</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Tips</h3>
            <ul className="space-y-2 text-sm text-hawkins-light">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚡</span>
                Place $match early to filter data first
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚡</span>
                Use $project to reduce document size
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚡</span>
                $group before $lookup when possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚡</span>
                All keys must be double-quoted in JSON
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
