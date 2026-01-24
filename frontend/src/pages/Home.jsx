import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  BookOpen, 
  Database, 
  Zap, 
  Target,
  ChevronRight,
  Star
} from 'lucide-react';

export default function Home() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const res = await fetch('/api/missions');
      const data = await res.json();
      setMissions(data);
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="stranger-title text-5xl md:text-7xl mb-6 animate-flicker">
          STRANGER THINGS
        </h1>
        <h2 className="text-2xl md:text-3xl text-hawkins-light mb-4 font-display tracking-wide">
          MONGO QUEST
        </h2>
        <p className="text-lg text-hawkins-fog max-w-2xl mx-auto mb-8">
          Master MongoDB's aggregation framework through interactive missions 
          inspired by the Upside Down. Learn $match, $lookup, $facet, and more 
          while hunting Demogorgons and saving Hawkins.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to="/mission/1" className="btn-primary flex items-center gap-2">
            <Play size={20} />
            Start First Mission
          </Link>
          <Link to="/learning" className="btn-secondary flex items-center gap-2">
            <BookOpen size={20} />
            Learning Guide
          </Link>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Target, label: 'Missions', value: '4' },
          { icon: Zap, label: 'MongoDB Concepts', value: '15+' },
          { icon: Database, label: 'Collections', value: '6' },
          { icon: Star, label: 'Queries to Master', value: '20+' },
        ].map((stat, i) => (
          <div 
            key={i}
            className="card text-center"
          >
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-blood-red-light" />
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-hawkins-fog">{stat.label}</div>
          </div>
        ))}
      </motion.section>

      {/* Missions Grid */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-blood-red rounded"></span>
          Missions
        </h3>
        
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission, i) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/mission/${mission.id}`} className="block mission-card p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{mission.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                    ${mission.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                                      mission.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                                      mission.difficulty === 'Advanced' ? 'bg-orange-900/50 text-orange-400' :
                                      'bg-red-900/50 text-red-400'
                                    }`}>
                      {mission.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1">
                    {mission.title}
                  </h4>
                  <p className="text-sm text-blood-red-light mb-3">
                    {mission.subtitle}
                  </p>
                  <p className="text-sm text-hawkins-fog mb-4 line-clamp-2">
                    {mission.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mission.concepts?.slice(0, 4).map((concept, j) => (
                      <span 
                        key={j}
                        className="px-2 py-1 bg-upside-down-700 text-xs text-hawkins-light rounded"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-hawkins-fog">{mission.estimatedTime}</span>
                    <span className="text-blood-red-light flex items-center gap-1 group-hover:gap-2 transition-all">
                      Start Mission <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* What You'll Learn */}
      <section className="card">
        <h3 className="text-2xl font-bold text-white mb-6">
          What You'll Learn
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Aggregation Framework',
              items: ['$match & filtering', '$group & accumulators', '$sort, $limit, $skip', '$project & reshaping']
            },
            {
              title: 'Joins & Relationships',
              items: ['$lookup (SQL-like joins)', '$unwind arrays', 'Subpipelines', 'Multi-collection queries']
            },
            {
              title: 'Advanced Techniques',
              items: ['$facet parallel pipelines', '$bucket distributions', 'Text search', 'Performance optimization']
            }
          ].map((section, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-semibold text-blood-red-light">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-hawkins-light">
                    <span className="w-1.5 h-1.5 bg-blood-red rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Real World Applications */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">
            🎮 Game-Based Learning
          </h3>
          <p className="text-hawkins-fog mb-4">
            Each mission tells a story while teaching real MongoDB skills. 
            Track Demogorgons, rescue team members, and analyze threats - 
            all while mastering aggregation pipelines.
          </p>
          <ul className="space-y-2 text-sm text-hawkins-light">
            <li>• Story-driven objectives</li>
            <li>• Progressive difficulty</li>
            <li>• Immediate feedback</li>
          </ul>
        </div>
        
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">
            💼 Real-World Skills
          </h3>
          <p className="text-hawkins-fog mb-4">
            The queries you learn here apply directly to production scenarios:
          </p>
          <ul className="space-y-2 text-sm text-hawkins-light">
            <li>• Analytics dashboards</li>
            <li>• Search & filtering</li>
            <li>• Report generation</li>
            <li>• Data transformation</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center py-8"
      >
        <div className="neon-border rounded-xl p-8 bg-gradient-to-br from-upside-down-800 to-blood-red/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Enter the Upside Down?
          </h3>
          <p className="text-hawkins-fog mb-6 max-w-xl mx-auto">
            Start your MongoDB journey with Mission 1. Learn filtering, matching, 
            and your first aggregation pipelines while tracking the Demogorgon.
          </p>
          <Link to="/mission/1" className="btn-primary inline-flex items-center gap-2">
            <Play size={20} />
            Begin Your Quest
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
