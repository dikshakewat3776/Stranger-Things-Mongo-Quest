import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Database, 
  Search, 
  ChevronRight,
  Users,
  MapPin,
  Skull,
  Eye,
  FileText,
  Zap,
  RefreshCw
} from 'lucide-react';

const collections = [
  { id: 'characters', name: 'Characters', icon: Users, description: 'Hawkins heroes and villains' },
  { id: 'locations', name: 'Locations', icon: MapPin, description: 'Places in both dimensions' },
  { id: 'creatures', name: 'Creatures', icon: Skull, description: 'Upside Down monsters' },
  { id: 'sightings', name: 'Sightings', icon: Eye, description: 'Creature encounter reports' },
  { id: 'status_reports', name: 'Status Reports', icon: FileText, description: 'Team member updates' },
  { id: 'events', name: 'Events', icon: Zap, description: 'Major timeline events' },
];

export default function DataExplorer() {
  const [selectedCollection, setSelectedCollection] = useState('characters');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCount: 0 });
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedCollection, pagination.page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/data/${selectedCollection}?page=${pagination.page}&limit=10`
      );
      const result = await res.json();
      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchData();
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/data/search/all?q=${encodeURIComponent(searchQuery)}`);
      const result = await res.json();
      // Show results from selected collection
      setData(result.results[selectedCollection] || []);
      setPagination({ page: 1, totalPages: 1, totalCount: result.totalResults });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Collections Sidebar */}
        <div className="lg:col-span-3">
          <div className="card sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Database className="text-blood-red-light" size={20} />
              Collections
            </h3>
            
            <div className="space-y-2">
              {collections.map((col) => {
                const Icon = col.icon;
                const isActive = selectedCollection === col.id;
                
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedCollection(col.id);
                      setPagination({ ...pagination, page: 1 });
                      setSelectedDoc(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all
                               ${isActive 
                                 ? 'bg-blood-red/20 border border-blood-red/50' 
                                 : 'hover:bg-upside-down-700'
                               }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-blood-red-light' : 'text-hawkins-fog'} />
                      <div>
                        <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-hawkins-light'}`}>
                          {col.name}
                        </span>
                        <p className="text-xs text-hawkins-fog">{col.description}</p>
                      </div>
                      {isActive && <ChevronRight size={16} className="ml-auto text-blood-red-light" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data View */}
        <div className="lg:col-span-5">
          <div className="card">
            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hawkins-fog" />
                <input
                  type="text"
                  placeholder="Search across fields..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-2"
                />
              </div>
              <button onClick={handleSearch} className="btn-primary">
                Search
              </button>
              <button 
                onClick={fetchData}
                className="p-2 border border-hawkins-gray rounded-lg hover:border-blood-red transition-colors"
              >
                <RefreshCw size={20} className="text-hawkins-light" />
              </button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4 text-sm text-hawkins-fog">
              <span>
                Showing {data.length} of {pagination.totalCount} documents
              </span>
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
            </div>

            {/* Data List */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-upside-down-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data.map((doc, index) => (
                  <motion.button
                    key={doc._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-4 rounded-lg border transition-all
                               ${selectedDoc?._id === doc._id
                                 ? 'bg-blood-red/10 border-blood-red/50'
                                 : 'bg-upside-down-700 border-upside-down-600 hover:border-hawkins-fog'
                               }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-white">
                          {doc.name || doc.title || doc._id}
                        </span>
                        {doc.status && (
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded
                                          ${doc.status === 'active' ? 'bg-green-900/50 text-green-400' :
                                            doc.status === 'missing' ? 'bg-red-900/50 text-red-400' :
                                            doc.status === 'endangered' ? 'bg-yellow-900/50 text-yellow-400' :
                                            'bg-gray-900/50 text-gray-400'
                                          }`}>
                            {doc.status}
                          </span>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-hawkins-fog" />
                    </div>
                    {doc.description && (
                      <p className="text-sm text-hawkins-fog mt-1 line-clamp-1">
                        {doc.description}
                      </p>
                    )}
                    {doc.type && (
                      <span className="text-xs text-blood-red-light">{doc.type}</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 bg-upside-down-700 rounded-lg text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 bg-upside-down-700 rounded-lg text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Document Detail */}
        <div className="lg:col-span-4">
          <div className="card sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4">Document Detail</h3>
            
            {selectedDoc ? (
              <div className="space-y-4">
                {/* Quick Info */}
                {selectedDoc.name && (
                  <div className="flex items-center gap-3 pb-4 border-b border-upside-down-600">
                    <div className="w-12 h-12 rounded-lg bg-blood-red/20 flex items-center justify-center text-2xl">
                      {getDocEmoji(selectedCollection, selectedDoc)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{selectedDoc.name}</h4>
                      {selectedDoc.type && (
                        <p className="text-sm text-blood-red-light">{selectedDoc.type}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* JSON View */}
                <SyntaxHighlighter
                  language="json"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '11px',
                    background: '#0d0d0d',
                    maxHeight: '500px',
                  }}
                >
                  {JSON.stringify(selectedDoc, null, 2)}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="text-center py-12 text-hawkins-fog">
                <Eye size={40} className="mx-auto mb-3 opacity-50" />
                <p>Select a document to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getDocEmoji(collection, doc) {
  switch (collection) {
    case 'characters':
      return doc.role === 'antagonist' ? '😈' : '👤';
    case 'locations':
      return doc.dimension === 'upside_down' ? '🌀' : '📍';
    case 'creatures':
      return '👾';
    case 'sightings':
      return '👁️';
    case 'status_reports':
      return '📋';
    case 'events':
      return '⚡';
    default:
      return '📄';
  }
}
