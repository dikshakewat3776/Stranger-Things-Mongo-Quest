import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Database,
  ChevronDown,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

export default function ResultsPanel({ results }) {
  const [expandedDoc, setExpandedDoc] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results.results, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (results.error) {
    return (
      <div className="card border-red-500/50 bg-red-950/20">
        <div className="flex items-start gap-3">
          <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-red-400">Query Error</h4>
            <p className="text-sm text-red-300 mt-1">{results.error}</p>
            {results.message && (
              <p className="text-sm text-red-200/70 mt-2">{results.message}</p>
            )}
            {results.hint && (
              <p className="text-sm text-hawkins-fog mt-2">
                💡 Hint: {results.hint}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-500" size={20} />
          <h3 className="text-lg font-bold text-white">Results</h3>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-hawkins-fog">
          <span className="flex items-center gap-1">
            <Database size={14} />
            {results.collection}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {results.executionTimeMs || '< 1'}ms
          </span>
          <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded">
            {results.resultCount} documents
          </span>
          
          <button
            onClick={copyResults}
            className="p-2 hover:bg-upside-down-700 rounded transition-colors"
            title="Copy results"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Results List */}
      {results.results && results.results.length > 0 ? (
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {results.results.map((doc, index) => (
            <div 
              key={index}
              className="border border-upside-down-600 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedDoc(expandedDoc === index ? -1 : index)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-upside-down-700/50 transition-colors text-left"
              >
                {expandedDoc === index ? (
                  <ChevronDown size={16} className="text-hawkins-fog" />
                ) : (
                  <ChevronRight size={16} className="text-hawkins-fog" />
                )}
                
                <span className="text-sm text-blood-red-light font-mono">
                  Document {index + 1}
                </span>
                
                {doc._id && (
                  <span className="text-xs text-hawkins-fog ml-2">
                    _id: {String(doc._id).slice(0, 20)}...
                  </span>
                )}
                
                {doc.name && (
                  <span className="text-sm text-white ml-auto">
                    {doc.name}
                  </span>
                )}
              </button>

              {expandedDoc === index && (
                <div className="border-t border-upside-down-600">
                  <SyntaxHighlighter
                    language="json"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '12px',
                      background: '#0a0a0a',
                    }}
                  >
                    {JSON.stringify(doc, null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-hawkins-fog">
          <Database size={40} className="mx-auto mb-3 opacity-50" />
          <p>No documents returned</p>
          <p className="text-sm mt-1">The query executed successfully but found no matching documents.</p>
        </div>
      )}

      {/* Pipeline Used */}
      {results.pipeline && (
        <details className="mt-4 pt-4 border-t border-upside-down-600">
          <summary className="cursor-pointer text-sm text-hawkins-fog hover:text-white transition-colors">
            View Executed Pipeline
          </summary>
          <div className="mt-3">
            <SyntaxHighlighter
              language="json"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '11px',
                background: '#0d0d0d',
                maxHeight: '200px',
              }}
            >
              {JSON.stringify(results.pipeline, null, 2)}
            </SyntaxHighlighter>
          </div>
        </details>
      )}
    </div>
  );
}
