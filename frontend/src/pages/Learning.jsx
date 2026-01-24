import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Database, 
  Zap,
  ChevronRight,
  ExternalLink,
  Search
} from 'lucide-react';

export default function Learning() {
  const [concepts, setConcepts] = useState({});
  const [stages, setStages] = useState({});
  const [operators, setOperators] = useState({});
  const [activeConcept, setActiveConcept] = useState(null);
  const [activeTab, setActiveTab] = useState('concepts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLearningContent();
  }, []);

  const fetchLearningContent = async () => {
    try {
      const [conceptsRes, stagesRes, operatorsRes] = await Promise.all([
        fetch('/api/learning/concepts'),
        fetch('/api/pipelines/stages'),
        fetch('/api/pipelines/operators')
      ]);
      
      const [conceptsData, stagesData, operatorsData] = await Promise.all([
        conceptsRes.json(),
        stagesRes.json(),
        operatorsRes.json()
      ]);

      setConcepts(conceptsData);
      setStages(stagesData);
      setOperators(operatorsData);
      
      // Set first concept as active
      const firstKey = Object.keys(conceptsData)[0];
      if (firstKey) setActiveConcept(firstKey);
    } catch (error) {
      console.error('Failed to fetch learning content:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'concepts', label: 'Core Concepts', icon: BookOpen },
    { id: 'stages', label: 'Pipeline Stages', icon: Code },
    { id: 'operators', label: 'Operators', icon: Database },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blood-red border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-hawkins-fog">Loading learning materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-upside-down-600 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                         ${activeTab === tab.id
                           ? 'bg-blood-red/20 text-blood-red-light border border-blood-red/50'
                           : 'text-hawkins-light hover:bg-upside-down-700'
                         }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Concepts Tab */}
      {activeTab === 'concepts' && (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Concept List */}
          <div className="lg:col-span-4">
            <div className="card sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">MongoDB Concepts</h3>
              <div className="space-y-2">
                {Object.entries(concepts).map(([key, concept]) => (
                  <button
                    key={key}
                    onClick={() => setActiveConcept(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all
                               ${activeConcept === key
                                 ? 'bg-blood-red/20 border border-blood-red/50'
                                 : 'hover:bg-upside-down-700'
                               }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${activeConcept === key ? 'text-white' : 'text-hawkins-light'}`}>
                        {concept.title}
                      </span>
                      {activeConcept === key && <ChevronRight size={16} className="text-blood-red-light" />}
                    </div>
                    <p className="text-xs text-hawkins-fog mt-1">{concept.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Concept Detail */}
          <div className="lg:col-span-8">
            {activeConcept && concepts[activeConcept] && (
              <motion.div
                key={activeConcept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {concepts[activeConcept].title}
                </h2>
                <p className="text-blood-red-light mb-6">
                  {concepts[activeConcept].description}
                </p>

                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-hawkins-light font-mono text-sm bg-upside-down-700 p-6 rounded-lg">
                    {concepts[activeConcept].content}
                  </div>
                </div>

                {/* Related Missions */}
                {concepts[activeConcept].relatedMissions && (
                  <div className="mt-6 pt-6 border-t border-upside-down-600">
                    <h4 className="text-sm font-semibold text-hawkins-fog mb-3">Related Missions</h4>
                    <div className="flex gap-2">
                      {concepts[activeConcept].relatedMissions.map((missionId) => (
                        <a
                          key={missionId}
                          href={`/mission/${missionId}`}
                          className="px-4 py-2 bg-upside-down-700 rounded-lg text-sm text-hawkins-light hover:bg-blood-red/20 hover:text-blood-red-light transition-all"
                        >
                          Mission {missionId}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Stages Tab */}
      {activeTab === 'stages' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stages).map(([name, stage], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card hover:border-blood-red/50 transition-colors"
            >
              <code className="text-lg text-neon-blue font-mono">{name}</code>
              <p className="text-sm text-hawkins-fog mt-2 mb-4">{stage.description}</p>
              
              <div className="text-xs text-hawkins-light bg-upside-down-700 p-3 rounded font-mono mb-4">
                {stage.syntax}
              </div>

              {stage.tips && (
                <div className="space-y-1">
                  {stage.tips.map((tip, j) => (
                    <p key={j} className="text-xs text-hawkins-fog flex items-start gap-2">
                      <span className="text-blood-red-light">•</span>
                      {tip}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Operators Tab */}
      {activeTab === 'operators' && (
        <div className="space-y-8">
          {Object.entries(operators).map(([category, ops]) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-white mb-4 capitalize flex items-center gap-2">
                <span className="w-8 h-1 bg-blood-red rounded"></span>
                {category} Operators
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(ops).map(([op, desc]) => (
                  <div
                    key={op}
                    className="p-4 bg-upside-down-800 rounded-lg border border-upside-down-600 hover:border-blood-red/50 transition-colors"
                  >
                    <code className="text-neon-blue font-mono">{op}</code>
                    <p className="text-xs text-hawkins-fog mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* External Resources */}
      <div className="mt-12 card">
        <h3 className="text-xl font-bold text-white mb-4">External Resources</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              title: 'MongoDB Documentation', 
              url: 'https://www.mongodb.com/docs/manual/',
              desc: 'Official MongoDB manual'
            },
            { 
              title: 'Aggregation Pipeline', 
              url: 'https://www.mongodb.com/docs/manual/core/aggregation-pipeline/',
              desc: 'Complete aggregation reference'
            },
            { 
              title: 'MongoDB University', 
              url: 'https://learn.mongodb.com/',
              desc: 'Free MongoDB courses'
            },
          ].map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-upside-down-700 rounded-lg hover:bg-upside-down-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{resource.title}</span>
                <ExternalLink size={16} className="text-hawkins-fog group-hover:text-blood-red-light" />
              </div>
              <p className="text-sm text-hawkins-fog">{resource.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
