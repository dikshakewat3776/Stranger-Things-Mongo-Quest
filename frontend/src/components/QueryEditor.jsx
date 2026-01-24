import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';

export default function QueryEditor({ pipeline, learningMode }) {
  const [expandedStages, setExpandedStages] = useState(
    pipeline.map((_, i) => i === 0)
  );

  const toggleStage = (index) => {
    const newExpanded = [...expandedStages];
    newExpanded[index] = !newExpanded[index];
    setExpandedStages(newExpanded);
  };

  if (!pipeline || pipeline.length === 0) {
    return (
      <div className="code-editor p-4 text-hawkins-fog text-center">
        No pipeline stages to display
      </div>
    );
  }

  return (
    <div className="code-editor overflow-hidden">
      <div className="p-3 bg-upside-down-700 border-b border-upside-down-600 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm text-hawkins-fog ml-2">MongoDB Aggregation Pipeline</span>
      </div>

      <div className="divide-y divide-upside-down-700">
        {pipeline.map((stage, index) => (
          <div key={index} className="group">
            {/* Stage Header */}
            <button
              onClick={() => toggleStage(index)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-upside-down-700/50 transition-colors"
            >
              {expandedStages[index] ? (
                <ChevronDown size={16} className="text-hawkins-fog" />
              ) : (
                <ChevronRight size={16} className="text-hawkins-fog" />
              )}
              
              <span className="w-6 h-6 rounded bg-blood-red/20 text-blood-red-light text-xs flex items-center justify-center">
                {index + 1}
              </span>
              
              <code className="text-neon-blue font-mono">{stage.stage}</code>
              
              {learningMode && stage.explanation && (
                <Info size={14} className="text-hawkins-fog ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Stage Content */}
            {expandedStages[index] && (
              <div className="px-4 pb-4">
                <SyntaxHighlighter
                  language="javascript"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '13px',
                    background: '#0d0d0d',
                  }}
                >
                  {formatCode(stage.code || stage.stage)}
                </SyntaxHighlighter>

                {learningMode && stage.explanation && (
                  <div className="mt-3 p-3 bg-neon-blue/5 border border-neon-blue/20 rounded-lg">
                    <p className="text-sm text-hawkins-light">
                      <span className="text-neon-blue font-medium">💡 </span>
                      {stage.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Full Pipeline View Toggle */}
      <div className="p-3 bg-upside-down-700 border-t border-upside-down-600">
        <details className="group">
          <summary className="cursor-pointer text-sm text-hawkins-fog hover:text-white transition-colors">
            View Full Pipeline JSON
          </summary>
          <div className="mt-3">
            <SyntaxHighlighter
              language="json"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '12px',
                background: '#0d0d0d',
                maxHeight: '300px',
              }}
            >
              {JSON.stringify(
                pipeline.map(s => ({ [s.stage]: s.code })),
                null,
                2
              )}
            </SyntaxHighlighter>
          </div>
        </details>
      </div>
    </div>
  );
}

function formatCode(code) {
  if (typeof code === 'string') return code;
  try {
    return JSON.stringify(code, null, 2);
  } catch {
    return String(code);
  }
}
