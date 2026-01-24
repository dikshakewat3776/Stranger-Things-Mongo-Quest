import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Home, 
  Map, 
  BookOpen, 
  Database, 
  Code, 
  Menu, 
  X,
  Lightbulb,
  LightbulbOff
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/data', icon: Database, label: 'Data Explorer' },
  { path: '/learning', icon: BookOpen, label: 'Learning' },
  { path: '/playground', icon: Code, label: 'Playground' },
];

export default function Layout({ children, learningMode, setLearningMode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-upside-down-800 border-r border-upside-down-600 
                    transition-all duration-300 z-50 ${sidebarOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-upside-down-600">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blood-red flex items-center justify-center">
              <span className="text-xl">🔮</span>
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in">
                <h1 className="text-sm font-bold text-blood-red-light tracking-wider">
                  STRANGER THINGS
                </h1>
                <p className="text-xs text-hawkins-fog">Mongo Quest</p>
              </div>
            )}
          </Link>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-upside-down-700 
                     border border-upside-down-500 rounded-full flex items-center 
                     justify-center text-hawkins-light hover:text-blood-red-light
                     hover:border-blood-red transition-colors"
        >
          {sidebarOpen ? <X size={12} /> : <Menu size={12} />}
        </button>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300
                           ${isActive 
                             ? 'bg-blood-red/20 text-blood-red-light border border-blood-red/50' 
                             : 'text-hawkins-light hover:bg-upside-down-700 hover:text-white'
                           }`}
              >
                <Icon size={20} />
                {sidebarOpen && (
                  <span className="animate-fade-in font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Missions Section */}
        {sidebarOpen && (
          <div className="px-4 mt-6 animate-fade-in">
            <h3 className="text-xs font-semibold text-hawkins-fog uppercase tracking-wider mb-3">
              Missions
            </h3>
            <div className="space-y-2">
              {[
                { id: 1, icon: '🧟', name: 'Find the Demogorgon' },
                { id: 2, icon: '🧭', name: 'Search the Lost Team' },
                { id: 3, icon: '🔀', name: 'Parallel Dimensions' },
                { id: 4, icon: '📊', name: 'Upside Down Intel' },
              ].map((mission) => {
                const isActive = location.pathname === `/mission/${mission.id}`;
                
                return (
                  <Link
                    key={mission.id}
                    to={`/mission/${mission.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                               ${isActive 
                                 ? 'bg-blood-red/20 text-blood-red-light' 
                                 : 'text-hawkins-light hover:bg-upside-down-700'
                               }`}
                  >
                    <span>{mission.icon}</span>
                    <span className="truncate">{mission.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Learning Mode Toggle */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t border-upside-down-600
                        ${sidebarOpen ? '' : 'flex justify-center'}`}>
          <button
            onClick={() => setLearningMode(!learningMode)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full
                       ${learningMode 
                         ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30' 
                         : 'bg-upside-down-700 text-hawkins-light'
                       }`}
          >
            {learningMode ? <Lightbulb size={20} /> : <LightbulbOff size={20} />}
            {sidebarOpen && (
              <div className="animate-fade-in text-left">
                <span className="text-sm font-medium">Learning Mode</span>
                <p className="text-xs opacity-70">
                  {learningMode ? 'Explanations ON' : 'Explanations OFF'}
                </p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-upside-down-900/80 backdrop-blur-md border-b border-upside-down-600">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {getPageTitle(location.pathname)}
              </h2>
              <p className="text-sm text-hawkins-fog">
                {getPageSubtitle(location.pathname)}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {learningMode && (
                <span className="px-3 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded-full 
                                border border-neon-blue/30 animate-pulse">
                  Learning Mode Active
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}

function getPageTitle(pathname) {
  if (pathname === '/') return 'Welcome to the Upside Down';
  if (pathname.startsWith('/mission/')) {
    const id = pathname.split('/')[2];
    const titles = {
      '1': 'Mission 1: Find the Demogorgon',
      '2': 'Mission 2: Search the Lost Team',
      '3': 'Mission 3: Parallel Dimensions',
      '4': 'Mission 4: Upside Down Intelligence',
    };
    return titles[id] || 'Mission';
  }
  if (pathname === '/data') return 'Data Explorer';
  if (pathname === '/learning') return 'MongoDB Learning Center';
  if (pathname === '/playground') return 'Query Playground';
  return 'Stranger Things Mongo Quest';
}

function getPageSubtitle(pathname) {
  if (pathname === '/') return 'Master MongoDB through interactive missions';
  if (pathname.startsWith('/mission/')) return 'Complete objectives to advance';
  if (pathname === '/data') return 'Explore the Hawkins database';
  if (pathname === '/learning') return 'Concepts, tutorials, and references';
  if (pathname === '/playground') return 'Experiment with custom queries';
  return '';
}
