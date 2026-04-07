# Key Patterns Used in This Codebase

---

## Summary of Patterns

| Pattern | When to Use | Benefits |
|---------|-------------|----------|
| **Loading State** | Any async data fetching | Better UX, prevents empty states |
| **Container/Presenter** | Shared layout across pages | Code reuse, separation of concerns |
| **Controlled Forms** | Forms with validation/transformation | Full control, real-time updates |
| **Prop Drilling** | Simple state sharing (2-3 levels) | No extra libraries needed |
| **Early Return** | Multiple conditional states | Cleaner code, less nesting |
| **List Rendering** | Any dynamic lists | Efficient updates, proper reconciliation |
| **Conditional CSS** | Dynamic styling based on state | Flexible, works with utility CSS |
| **Multiple useState** | Independent state values | Clear separation, easier debugging |
| **useEffect Dependencies** | Side effects tied to data | Prevents unnecessary re-runs |
| **Error Handling** | All async operations | Graceful failures, user feedback |
| **Component Composition** | Complex UI with repeated patterns | Reusability, maintainability |
| **URL Parameters** | Dynamic routes | Access route data in components |
| **Animations** | Enhanced UX | Polished, professional feel |
| **Temporary State** | User feedback messages | Auto-cleanup, less code |
| **Optional Chaining** | Accessing nested data | Prevents runtime errors |

---


---

### 4.1 Loading State Pattern

**Files:** `Home.jsx`, `Mission.jsx`, `DataExplorer.jsx`, `Learning.jsx`

**Pattern:** Show a loading indicator while data is being fetched, then display the actual content.

**Why:** Provides immediate feedback to users and prevents showing empty/broken states.

**Implementation:**
```jsx
// From Home.jsx
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
    setLoading(false); // Always stop loading
  }
};

// Render with conditional
{loading ? (
  <div className="grid md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="card animate-pulse h-64" />
    ))}
  </div>
) : (
  <div className="grid md:grid-cols-2 gap-6">
    {missions.map((mission) => (
      <MissionCard key={mission.id} mission={mission} />
    ))}
  </div>
)}
```

**Key Points:**
- Always set `loading = false` in `finally` block (even on error)
- Show skeleton/placeholder during loading (better UX than blank screen)
- Use `loading` state to conditionally render different UI

---

### 4.2 Container/Presenter Pattern (Layout Component)

**Files:** `Layout.jsx` wraps all pages

**Pattern:** Separate layout/structure concerns from page content concerns.

**Why:** Reusable layout structure (sidebar, header, footer) without duplicating code.

**Implementation:**
```jsx
// Layout.jsx - Container component
export default function Layout({ children, learningMode, setLearningMode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <aside className={sidebarOpen ? 'w-64' : 'w-16'}>
        {/* Sidebar navigation */}
      </aside>
      <main className="flex-1">
        <header>
          {/* Top bar */}
        </header>
        <div className="p-6">
          {children} {/* Page content injected here */}
        </div>
      </main>
    </div>
  );
}

// App.jsx - Uses Layout as container
<Layout learningMode={learningMode} setLearningMode={setLearningMode}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/data" element={<DataExplorer />} />
  </Routes>
</Layout>
```

**Key Points:**
- `children` prop allows injecting any content
- Layout handles shared UI (navigation, header)
- Pages focus only on their specific content
- Props can be passed down to layout (like `learningMode`)

---

### 4.3 Controlled Forms Pattern

**Files:** `Playground.jsx`, `DataExplorer.jsx`

**Pattern:** React state controls all form input values.

**Why:** Enables validation, transformation, and real-time updates.

**Implementation:**
```jsx
// From DataExplorer.jsx
const [searchQuery, setSearchQuery] = useState('');

<input
  type="text"
  placeholder="Search across fields..."
  value={searchQuery}  // Controlled by state
  onChange={(e) => setSearchQuery(e.target.value)}  // Update state on change
  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
/>

// From Playground.jsx
const [pipeline, setPipeline] = useState(examplePipelines.basicMatch);

<textarea
  value={pipeline}  // Controlled
  onChange={(e) => {
    setPipeline(e.target.value);
    setValidation(null); // Clear validation on change
  }}
  className="w-full h-80"
/>
```

**Key Points:**
- Every input has `value` and `onChange`
- State is the "single source of truth"
- Can validate/transform before setting state
- Enables features like auto-save, real-time validation

---

### 4.4 Prop Drilling Pattern

**Files:** `App.jsx` → `Layout.jsx` → children

**Pattern:** Passing props through multiple component levels.

**Why:** Simple state sharing without Context API (works for small apps).

**Implementation:**
```jsx
// App.jsx - State defined here
const [learningMode, setLearningMode] = useState(true);

// Passed to Layout
<Layout learningMode={learningMode} setLearningMode={setLearningMode}>
  <Routes>
    <Route 
      path="/mission/:id" 
      element={<Mission learningMode={learningMode} />} 
    />
    <Route 
      path="/playground" 
      element={<Playground learningMode={learningMode} />} 
    />
  </Routes>
</Layout>

// Layout.jsx - Receives and uses props
function Layout({ children, learningMode, setLearningMode }) {
  return (
    <div>
      <button onClick={() => setLearningMode(!learningMode)}>
        {learningMode ? 'Learning ON' : 'Learning OFF'}
      </button>
      {children}
    </div>
  );
}

// Mission.jsx - Receives prop
function Mission({ learningMode }) {
  return (
    <div>
      {learningMode && <ExplanationPanel />}
    </div>
  );
}
```

**Key Points:**
- Works well for 2-3 levels deep
- Gets cumbersome with more nesting
- Alternative: Context API for deeper nesting
- Trade-off: Simplicity vs. maintainability

---

### 4.5 Early Return Pattern

**Files:** `ExplanationPanel.jsx`, `ResultsPanel.jsx`

**Pattern:** Return early from component if conditions aren't met, avoiding nested conditionals.

**Why:** Cleaner, more readable code than deeply nested ternaries.

**Implementation:**
```jsx
// From ExplanationPanel.jsx
export default function ExplanationPanel({ explanation }) {
  const [expandedSection, setExpandedSection] = useState('stages');

  // Early return - guard clause
  if (!explanation) {
    return null; // Don't render anything if no explanation
  }

  // Rest of component logic (no nested conditionals)
  return (
    <div className="card">
      {/* Component content */}
    </div>
  );
}

// From ResultsPanel.jsx
export default function ResultsPanel({ results }) {
  // Early return for error state
  if (results.error) {
    return (
      <div className="card border-red-500/50">
        <XCircle className="text-red-500" />
        <h4>Query Error</h4>
        <p>{results.error}</p>
      </div>
    );
  }

  // Normal rendering
  return (
    <div className="card">
      {/* Success state */}
    </div>
  );
}
```

**Key Points:**
- Reduces nesting and improves readability
- Each condition handled separately
- Easier to add new conditions
- Common pattern for loading/error/data states

---

### 4.6 List Rendering Pattern

**Files:** Every component file

**Pattern:** Use `array.map()` to render lists of items, always with a `key` prop.

**Why:** Efficient rendering and proper React reconciliation.

**Implementation:**
```jsx
// From App.jsx - Particle rendering
{particles.map((p) => (
  <div
    key={p.id}  // Unique key from data
    className="particle"
    style={{
      left: `${p.left}%`,
      width: `${p.size}px`,
      height: `${p.size}px`,
    }}
  />
))}

// From Home.jsx - Mission cards
{missions.map((mission, i) => (
  <motion.div
    key={mission.id}  // Using ID from data (preferred)
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    <Link to={`/mission/${mission.id}`}>
      <MissionCard mission={mission} />
    </Link>
  </motion.div>
))}

// From Layout.jsx - Navigation items
{navItems.map((item) => {
  const Icon = item.icon;
  const isActive = location.pathname === item.path;
  
  return (
    <Link
      key={item.path}  // Using path as key (stable, unique)
      to={item.path}
      className={isActive ? 'active' : ''}
    >
      <Icon size={20} />
      {sidebarOpen && <span>{item.label}</span>}
    </Link>
  );
})}
```

**Key Points:**
- Always provide `key` prop (React requirement)
- Use stable, unique identifiers (IDs preferred over index)
- Index as key is acceptable for static lists
- Key helps React identify which items changed/added/removed

---

### 4.7 Conditional CSS Classes Pattern

**Files:** `Layout.jsx`, `DataExplorer.jsx`, `Mission.jsx`

**Pattern:** Use template literals to conditionally apply CSS classes.

**Why:** Dynamic styling based on state/props without inline styles.

**Implementation:**
```jsx
// From Layout.jsx - Sidebar width based on state
<aside 
  className={`fixed left-0 top-0 h-full bg-upside-down-800 
              transition-all duration-300 z-50 
              ${sidebarOpen ? 'w-64' : 'w-16'}`}
>

// From Layout.jsx - Active navigation item
<Link
  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg
             ${isActive 
               ? 'bg-blood-red/20 text-blood-red-light border border-blood-red/50' 
               : 'text-hawkins-light hover:bg-upside-down-700 hover:text-white'
             }`}
>

// From DataExplorer.jsx - Status badge colors
<span className={`px-2 py-1 rounded text-xs
                 ${doc.status === 'active' ? 'bg-green-900/50 text-green-400' :
                   doc.status === 'missing' ? 'bg-red-900/50 text-red-400' :
                   doc.status === 'endangered' ? 'bg-yellow-900/50 text-yellow-400' :
                   'bg-gray-900/50 text-gray-400'
                 }`}>
  {doc.status}
</span>

// From Mission.jsx - Difficulty badge
<span className={`px-4 py-2 rounded-lg text-sm font-medium
                 ${mission.difficulty === 'Beginner' ? 'bg-green-900/50 text-green-400' :
                   mission.difficulty === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                   mission.difficulty === 'Advanced' ? 'bg-orange-900/50 text-orange-400' :
                   'bg-red-900/50 text-red-400'
                 }`}>
  {mission.difficulty}
</span>
```

**Key Points:**
- Template literals with ternary operators
- Can combine multiple conditions
- More maintainable than inline styles
- Works well with Tailwind CSS utility classes

---

### 4.8 Multiple State Hooks Pattern

**Files:** `Mission.jsx`, `DataExplorer.jsx`, `Playground.jsx`

**Pattern:** Use separate `useState` hooks for independent pieces of state.

**Why:** Each state update is independent, clearer separation of concerns.

**Implementation:**
```jsx
// From Mission.jsx
const [mission, setMission] = useState(null);
const [loading, setLoading] = useState(true);
const [activeQuery, setActiveQuery] = useState(null);
const [results, setResults] = useState(null);
const [executing, setExecuting] = useState(false);
const [completedQueries, setCompletedQueries] = useState([]);

// From DataExplorer.jsx
const [selectedCollection, setSelectedCollection] = useState('characters');
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCount: 0 });
const [selectedDoc, setSelectedDoc] = useState(null);

// From Playground.jsx
const [collection, setCollection] = useState('characters');
const [pipeline, setPipeline] = useState(examplePipelines.basicMatch);
const [results, setResults] = useState(null);
const [error, setError] = useState(null);
const [executing, setExecuting] = useState(false);
const [validation, setValidation] = useState(null);
const [copied, setCopied] = useState(false);
```

**Key Points:**
- Each state is independent
- Updates don't affect other states
- Easier to reason about
- Can combine related states into objects if they always update together

---

### 4.9 useEffect with Dependencies Pattern

**Files:** `Home.jsx`, `Mission.jsx`, `DataExplorer.jsx`

**Pattern:** Use dependency array to control when effects run.

**Why:** Prevents unnecessary re-fetches and infinite loops.

**Implementation:**
```jsx
// From Home.jsx - Run once on mount
useEffect(() => {
  fetchMissions();
}, []); // Empty array = run once

// From Mission.jsx - Re-fetch when route param changes
useEffect(() => {
  fetchMission();
}, [id]); // Re-run when id changes

// From DataExplorer.jsx - Re-fetch when collection or page changes
useEffect(() => {
  fetchData();
}, [selectedCollection, pagination.page]); // Multiple dependencies
```

**Key Points:**
- Empty array `[]` = run once on mount
- Array with values = run when those values change
- No array = run after every render (usually wrong)
- Always include all dependencies used in effect

---

### 4.10 Error Handling Pattern

**Files:** `ResultsPanel.jsx`, `Playground.jsx`, all data-fetching components

**Pattern:** Use try/catch/finally blocks and error state to handle failures gracefully.

**Why:** Prevents app crashes and provides user feedback.

**Implementation:**
```jsx
// From Mission.jsx
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
    setExecuting(false); // Always stop loading
  }
};

// From ResultsPanel.jsx - Display error
if (results.error) {
  return (
    <div className="card border-red-500/50 bg-red-950/20">
      <div className="flex items-start gap-3">
        <XCircle className="text-red-500" size={20} />
        <div>
          <h4 className="font-bold text-red-400">Query Error</h4>
          <p className="text-sm text-red-300">{results.error}</p>
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
```

**Key Points:**
- Always use try/catch for async operations
- Set error state to show user-friendly messages
- Use `finally` to ensure cleanup (like stopping loading)
- Provide helpful error messages and hints

---

### 4.11 Component Composition Pattern

**Files:** `ExplanationPanel.jsx`, `QueryEditor.jsx`

**Pattern:** Build complex components by composing simpler sub-components.

**Why:** Reusability, separation of concerns, easier testing.

**Implementation:**
```jsx
// From ExplanationPanel.jsx
export default function ExplanationPanel({ explanation }) {
  return (
    <div className="card">
      <Section
        title="Pipeline Stages"
        icon={Code2}
        isExpanded={expandedSection === 'stages'}
        onToggle={() => setExpandedSection(expandedSection === 'stages' ? null : 'stages')}
      >
        {/* Section content */}
      </Section>
      
      <Section
        title="Concepts Learned"
        icon={BookOpen}
        isExpanded={expandedSection === 'concepts'}
        onToggle={() => setExpandedSection(expandedSection === 'concepts' ? null : 'concepts')}
      >
        {/* Section content */}
      </Section>
    </div>
  );
}

// Reusable Section component
function Section({ title, icon: Icon, children, isExpanded, onToggle }) {
  return (
    <div className="border border-upside-down-600 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full px-4 py-3 ...">
        {isExpanded ? <ChevronDown /> : <ChevronRight />}
        <Icon size={16} />
        <span>{title}</span>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">{children}</div>
      )}
    </div>
  );
}
```

**Key Points:**
- Break complex UI into smaller, reusable pieces
- Each component has single responsibility
- Easier to test individual components
- Promotes code reuse

---

### 4.12 URL Parameter Extraction Pattern

**Files:** `Mission.jsx`

**Pattern:** Use `useParams` to extract dynamic route parameters.

**Why:** Access route data in components.

**Implementation:**
```jsx
// From Mission.jsx
import { useParams } from 'react-router-dom';

export default function Mission({ learningMode }) {
  const { id } = useParams(); // Extract :id from /mission/:id
  
  useEffect(() => {
    fetchMission(); // Fetch based on id
  }, [id]); // Re-fetch when id changes
  
  // Use id in API calls
  const executeQuery = async (queryName) => {
    const res = await fetch(`/api/missions/${id}/execute/${queryName}`, {
      method: 'POST',
      // ...
    });
  };
}
```

**Key Points:**
- `useParams` returns object with route parameters
- Parameters are always strings (convert if needed)
- Include params in dependency arrays if used in effects
- Re-fetch data when params change

---

### 4.13 Animation Pattern (Framer Motion)

**Files:** `Home.jsx`, `Mission.jsx`, `DataExplorer.jsx`

**Pattern:** Use Framer Motion for smooth animations and transitions.

**Why:** Better UX with polished animations.

**Implementation:**
```jsx
// From Home.jsx
import { motion } from 'framer-motion';

<motion.section 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center py-12"
>
  <h1>STRANGER THINGS</h1>
</motion.section>

// Staggered animations for list
{missions.map((mission, i) => (
  <motion.div
    key={mission.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }} // Stagger effect
  >
    <MissionCard mission={mission} />
  </motion.div>
))}

// From Mission.jsx - AnimatePresence for mount/unmount
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
```

**Key Points:**
- `motion` components replace regular HTML elements
- `initial`, `animate`, `exit` define animation states
- `AnimatePresence` handles mount/unmount animations
- Stagger delays create cascading effects

---

### 4.14 Temporary State Pattern

**Files:** `ResultsPanel.jsx`, `Playground.jsx`

**Pattern:** Use state that resets automatically after a delay (like "copied" feedback).

**Why:** Provide immediate user feedback without manual reset.

**Implementation:**
```jsx
// From ResultsPanel.jsx
const [copied, setCopied] = useState(false);

const copyResults = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(results.results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Auto-reset after 2 seconds
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// UI shows checkmark when copied
<button onClick={copyResults}>
  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
</button>
```

**Key Points:**
- Use `setTimeout` to auto-reset state
- Clear timeout in cleanup if component unmounts
- Provides immediate visual feedback
- Common for success messages, tooltips

---

### 4.15 Optional Chaining Pattern

**Files:** `Mission.jsx`, `DataExplorer.jsx`

**Pattern:** Use `?.` to safely access nested properties.

**Why:** Prevents errors when data structure is incomplete.

**Implementation:**
```jsx
// From Mission.jsx
if (data.queries?.length > 0) {
  setActiveQuery(data.queries[0]);
}

// From DataExplorer.jsx
{selectedDoc?.name && (
  <h4 className="font-bold text-white">{selectedDoc.name}</h4>
)}

// From Mission.jsx
const currentExplanation = mission.explanations?.[activeQuery];
```

**Key Points:**
- `?.` returns `undefined` if property doesn't exist
- Prevents "Cannot read property of undefined" errors
- Use with optional rendering: `{data?.name && <div>{data.name}</div>}`
- Safer than `data && data.name && data.name.value`

---