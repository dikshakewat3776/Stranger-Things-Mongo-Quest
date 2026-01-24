import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  Info,
  Code,
  Eye,
  Clock,
  Zap
} from 'lucide-react';
import QueryEditor from '../components/QueryEditor';
import ResultsPanel from '../components/ResultsPanel';
import ExplanationPanel from '../components/ExplanationPanel';

export default function Mission({ learningMode }) {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeQuery, setActiveQuery] = useState(null);
  const [results, setResults] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [completedQueries, setCompletedQueries] = useState([]);

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = async () => {
    try {
      const res = await fetch(`/api/missions/${id}`);
      const data = await res.json();
      setMission(data);
      if (data.queries?.length > 0) {
        setActiveQuery(data.queries[0]);
      }
    } catch (error) {
      console.error('Failed to fetch mission:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async (queryName) => {
    setExecuting(true);
    try {
      const res = await fetch(`/api/missions/${id}/execute/${queryName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      setResults(data);
      
      if (data.success && !completedQueries.includes(queryName)) {
        setCompletedQueries([...completedQueries, queryName]);
      }
    } catch (error) {
      console.error('Query execution failed:', error);
      setResults({ error: error.message });
    } finally {
      setExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blood-red border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-hawkins-fog">Loading mission briefing...</p>
        </div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-blood-red-light">Mission Not Found</h2>
        <p className="text-hawkins-fog mt-2">The Upside Down swallowed this mission.</p>
      </div>
    );
  }

  const currentExplanation = mission.explanations?.[activeQuery];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mission Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{mission.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-white">{mission.title}</h1>
            <p className="text-blood-red-light">{mission.subtitle}</p>
          </div>
          <span className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium
                          ${mission.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                            mission.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                            mission.difficulty === 'Advanced' ? 'bg-orange-900/50 text-orange-400' :
                            'bg-red-900/50 text-red-400'
                          }`}>
            {mission.difficulty}
          </span>
        </div>

        {/* Story Intro */}
        <div className="card bg-gradient-to-r from-upside-down-800 to-blood-red/10 border-blood-red/30">
          <div className="prose prose-invert max-w-none">
            <div className="text-hawkins-light whitespace-pre-line">
              {mission.storyIntro}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Layout: 3 Columns */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Query Selection */}
        <div className="lg:col-span-3">
          <div className="card sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="text-blood-red-light" size={20} />
              Objectives
            </h3>
            
            <div className="space-y-2">
              {mission.queries?.map((queryName, i) => {
                const isActive = activeQuery === queryName;
                const isCompleted = completedQueries.includes(queryName);
                
                return (
                  <button
                    key={queryName}
                    onClick={() => setActiveQuery(queryName)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all
                               flex items-center gap-3
                               ${isActive 
                                 ? 'bg-blood-red/20 border border-blood-red/50 text-white' 
                                 : 'bg-upside-down-700 text-hawkins-light hover:bg-upside-down-600'
                               }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={18} />
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-hawkins-fog flex-shrink-0" />
                    )}
                    <span className="text-sm truncate">
                      {formatQueryName(queryName)}
                    </span>
                    {isActive && <ChevronRight className="ml-auto text-blood-red-light" size={16} />}
                  </button>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-6 pt-4 border-t border-upside-down-600">
              <div className="flex justify-between text-sm text-hawkins-fog mb-2">
                <span>Progress</span>
                <span>{completedQueries.length}/{mission.queries?.length || 0}</span>
              </div>
              <div className="h-2 bg-upside-down-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blood-red to-blood-red-light transition-all duration-500"
                  style={{ 
                    width: `${(completedQueries.length / (mission.queries?.length || 1)) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Query Editor & Results */}
        <div className="lg:col-span-6 space-y-6">
          {/* Query Editor */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code className="text-blood-red-light" size={20} />
                {formatQueryName(activeQuery)}
              </h3>
              <button
                onClick={() => executeQuery(activeQuery)}
                disabled={executing}
                className="btn-primary flex items-center gap-2"
              >
                {executing ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Execute Query
                  </>
                )}
              </button>
            </div>

            <QueryEditor 
              pipeline={currentExplanation?.stages || []}
              learningMode={learningMode}
            />
          </div>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ResultsPanel results={results} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Explanation Panel */}
        <div className="lg:col-span-3">
          {learningMode && currentExplanation && (
            <ExplanationPanel explanation={currentExplanation} />
          )}
          
          {!learningMode && (
            <div className="card text-center">
              <Info className="w-12 h-12 mx-auto mb-4 text-hawkins-fog" />
              <p className="text-hawkins-fog text-sm">
                Enable Learning Mode to see detailed explanations for each query stage.
              </p>
            </div>
          )}

          {/* Schema Info */}
          {mission.schema && (
            <div className="card mt-6">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Eye size={18} className="text-blood-red-light" />
                Schema Reference
              </h4>
              <div className="text-sm text-hawkins-fog space-y-2">
                {mission.schema.collection && (
                  <p><span className="text-blood-red-light">Collection:</span> {mission.schema.collection}</p>
                )}
                {mission.schema.fields && Object.entries(mission.schema.fields).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <code className="text-neon-blue">{key}</code>
                    <span className="text-hawkins-fog">- {value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatQueryName(name) {
  if (!name) return '';
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function Target({ className, size }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
