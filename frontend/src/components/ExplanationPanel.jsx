import { useState } from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  Code2, 
  Briefcase,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function ExplanationPanel({ explanation }) {
  const [expandedSection, setExpandedSection] = useState('stages');

  if (!explanation) {
    return null;
  }

  return (
    <div className="card sticky top-24 border-neon-blue/30 bg-gradient-to-br from-upside-down-800 to-neon-blue/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-upside-down-600">
        <div className="w-10 h-10 rounded-lg bg-neon-blue/20 flex items-center justify-center">
          <Lightbulb className="text-neon-blue" size={20} />
        </div>
        <div>
          <h3 className="font-bold text-white">{explanation.title}</h3>
          <p className="text-xs text-hawkins-fog">{explanation.description}</p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-3">
        {/* Pipeline Stages */}
        <Section
          title="Pipeline Stages"
          icon={Code2}
          isExpanded={expandedSection === 'stages'}
          onToggle={() => setExpandedSection(expandedSection === 'stages' ? null : 'stages')}
        >
          <div className="space-y-4">
            {explanation.stages?.map((stage, i) => (
              <div key={i} className="pl-4 border-l-2 border-blood-red/50">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-neon-blue text-sm font-mono">{stage.stage}</code>
                </div>
                <code className="text-xs text-hawkins-fog block mb-2 font-mono bg-upside-down-700 p-2 rounded">
                  {stage.code}
                </code>
                <p className="text-sm text-hawkins-light">{stage.explanation}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* MongoDB Concepts */}
        {explanation.mongodbConcepts && (
          <Section
            title="Concepts Learned"
            icon={BookOpen}
            isExpanded={expandedSection === 'concepts'}
            onToggle={() => setExpandedSection(expandedSection === 'concepts' ? null : 'concepts')}
          >
            <div className="flex flex-wrap gap-2">
              {explanation.mongodbConcepts.map((concept, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-blood-red/10 text-blood-red-light text-sm rounded-full border border-blood-red/30"
                >
                  {concept}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Real World Use */}
        {explanation.realWorldUse && (
          <Section
            title="Real-World Applications"
            icon={Briefcase}
            isExpanded={expandedSection === 'realworld'}
            onToggle={() => setExpandedSection(expandedSection === 'realworld' ? null : 'realworld')}
          >
            <p className="text-sm text-hawkins-light">{explanation.realWorldUse}</p>
          </Section>
        )}

        {/* Performance Tips */}
        {explanation.performanceTips && (
          <Section
            title="Performance Tips"
            icon={Zap}
            isExpanded={expandedSection === 'performance'}
            onToggle={() => setExpandedSection(expandedSection === 'performance' ? null : 'performance')}
          >
            <ul className="space-y-2">
              {explanation.performanceTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-hawkins-light">
                  <span className="text-yellow-500 mt-0.5">⚡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Quick Reference */}
      <div className="mt-6 pt-4 border-t border-upside-down-600">
        <h4 className="text-xs font-semibold text-hawkins-fog uppercase tracking-wider mb-2">
          Quick Reference
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a 
            href="https://www.mongodb.com/docs/manual/aggregation/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neon-blue hover:underline"
          >
            MongoDB Docs →
          </a>
          <a 
            href="https://www.mongodb.com/docs/manual/reference/operator/aggregation/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neon-blue hover:underline"
          >
            Operators →
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, isExpanded, onToggle }) {
  return (
    <div className="border border-upside-down-600 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-upside-down-700/50 transition-colors text-left"
      >
        {isExpanded ? (
          <ChevronDown size={16} className="text-hawkins-fog" />
        ) : (
          <ChevronRight size={16} className="text-hawkins-fog" />
        )}
        <Icon size={16} className="text-blood-red-light" />
        <span className="text-sm font-medium text-white">{title}</span>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
