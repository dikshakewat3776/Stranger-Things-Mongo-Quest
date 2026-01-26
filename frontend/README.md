# Frontend Implementation Guide

## Project Overview

This frontend implementation is part of the **Stranger Things Mongo Quest** project, an interactive learning platform that combines **MongoDB** and **React** concepts to teach database querying through gamified missions.

### What This Project Teaches

**MongoDB Concepts:**
- Aggregation pipelines (`$match`, `$group`, `$lookup`, `$facet`, etc.)
- Query optimization and performance
- Data relationships and joins
- Real-world database patterns

**React Concepts:**
- Modern React with Hooks (`useState`, `useEffect`, `useParams`, etc.)
- React Router v6 for navigation
- Component composition and patterns
- State management and prop drilling
- Form handling and validation
- Performance optimization techniques
- Build tools (Vite) and styling (Tailwind CSS)

### Learning Approach

This codebase serves as both:
1. **A working application** - A fully functional MongoDB learning platform
2. **A learning resource** - Comprehensive documentation with 58+ React interview questions and answers
3. **A reference implementation** - Real-world patterns and best practices

Each component demonstrates practical React patterns while teaching MongoDB aggregation concepts through interactive missions inspired by the Stranger Things universe.

---

## Table of Contents
1. [Project Structure Overview](#1-project-structure-overview)
2. [File-by-File Breakdown](#2-file-by-file-breakdown)
3. [Configuration Files](#3-configuration-files)
4. [Key Patterns Used](#4-key-patterns-used-in-this-codebase)
5. [Complete React  Questions & Answers](#5-complete-react--questions--answers)

---

## 1. Project Structure Overview

```
frontend/
├── index.html          # Entry HTML file
├── src/
│   ├── main.jsx        # React app entry point
│   ├── App.jsx         # Root component + routing
│   ├── index.css       # Global styles (Tailwind)
│   ├── components/     # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── ExplanationPanel.jsx
│   │   ├── QueryEditor.jsx
│   │   └── ResultsPanel.jsx
│   └── pages/          # Route-specific pages
│       ├── Home.jsx
│       ├── Mission.jsx
│       ├── DataExplorer.jsx
│       ├── Learning.jsx
│       └── Playground.jsx
├── package.json        # Dependencies
├── vite.config.js      # Build tool config
├── tailwind.config.js  # Tailwind CSS config
└── postcss.config.js   # PostCSS config
```

---

## 2. File-by-File Breakdown

### FILE 1: `index.html` (Entry Point)

**Key Concepts:**
- **`<div id="root">`** - The mounting point where React renders the entire app
- **`type="module"`** - Uses ES modules for JavaScript
- **`preconnect`** - Performance optimization for fonts

### FILE 2: `main.jsx` (React Entry Point)

**React Concepts:**

| Concept | Explanation |
|---------|-------------|
| **`ReactDOM.createRoot()`** | React 18's new API for rendering (replaces `ReactDOM.render()`) |
| **`React.StrictMode`** | Development tool that highlights potential problems (double-invokes effects, warns about deprecated APIs) |
| **Root Component** | `<App />` is the top-level component that contains the entire application |

### FILE 3: `App.jsx` (Root Component + Routing)

**React Concepts Demonstrated:**

#### A. **Hooks**

| Hook | Usage | Purpose |
|------|-------|---------|
| `useState` | `const [learningMode, setLearningMode] = useState(true)` | Manages component state |
| `useEffect` | `useEffect(() => {...}, [])` | Side effects (runs once on mount due to empty dependency array `[]`) |

#### B. **React Router v6**

| Concept | Code | Purpose |
|---------|------|---------|
| `BrowserRouter` | `<Router>...</Router>` | Wraps app to enable routing |
| `Routes` | `<Routes>...</Routes>` | Container for route definitions |
| `Route` | `<Route path="/mission/:id" element={...} />` | Defines URL → Component mapping |
| **Dynamic Route** | `:id` in `/mission/:id` | URL parameter (extracted with `useParams`) |

#### C. **Props Passing**

```jsx
<Layout learningMode={learningMode} setLearningMode={setLearningMode}>
```
- **Props** = data passed from parent to child
- **Lifting State Up** = state managed in parent, passed down as props

#### D. **List Rendering with `key`**

```jsx
{particles.map((p) => (
  <div key={p.id} className="particle" ... />
))}
```
- **`key`** is mandatory for list items (helps React identify which items changed)

### FILE 4: `Layout.jsx` (Layout Component)

**React Concepts:**

| Concept | Code | Explanation |
|---------|------|-------------|
| **`children` prop** | `{ children }` | Special prop that contains nested elements |
| **`useLocation`** | `const location = useLocation()` | Hook from React Router to get current URL |
| **Conditional Rendering** | `{sidebarOpen && <span>...</span>}` | Show/hide elements based on state |
| **Conditional Classes** | `` `${isActive ? 'active' : ''}` `` | Dynamic CSS classes with template literals |
| **Component as Variable** | `const Icon = item.icon` | Store component in variable, render with `<Icon />` |

### FILE 5: `Home.jsx` (Page Component with Data Fetching)

**React Concepts:**

| Concept | Pattern | Explanation |
|---------|---------|-------------|
| **Loading State Pattern** | `loading ? <Skeleton /> : <Content />` | Show placeholder while data loads |
| **Data Fetching** | `fetch()` in `useEffect` | API calls on component mount |
| **Async/Await** | `const fetchMissions = async () => {...}` | Modern async handling |
| **Error Handling** | `try/catch/finally` | Handle errors, always stop loading |
| **Framer Motion** | `<motion.div initial={...} animate={...}>` | Animation library integration |

### FILE 6: `Mission.jsx` (Complex State Management)

**React Concepts:**

| Concept | Code | Explanation |
|---------|------|-------------|
| **`useParams`** | `const { id } = useParams()` | Extract URL parameters from route |
| **Dependency Array** | `useEffect(..., [id])` | Re-run effect when `id` changes |
| **Multiple States** | Multiple `useState` calls | Each piece of state is independent |
| **Optional Chaining** | `data.queries?.length` | Safely access nested properties |
| **Immutable Update** | `[...completedQueries, queryName]` | Create new array instead of mutating |

### FILE 7: `ExplanationPanel.jsx` (Expandable Sections Pattern)

**React Concepts:**

| Concept | Pattern | Explanation |
|---------|---------|-------------|
| **Early Return** | `if (!explanation) return null` | Guard clause for missing data |
| **Accordion Pattern** | Toggle `expandedSection` state | Only one section open at a time |
| **Prop Renaming** | `icon: Icon` | Rename prop while destructuring |
| **Composition** | `<Section>{children}</Section>` | Wrap content with component |

### FILE 8: `DataExplorer.jsx` (Pagination & Search)

**React Concepts:**

| Concept | Code | Explanation |
|---------|------|-------------|
| **Multiple Dependencies** | `[selectedCollection, pagination.page]` | Re-fetch when either changes |
| **Controlled Input** | `value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}` | React controls input value |
| **URL Encoding** | `encodeURIComponent(searchQuery)` | Safely encode user input for URLs |
| **Object State** | `pagination` as object | Group related state together |
| **State Update with Spread** | `setPagination({ ...pagination, page: 1 })` | Update one property, keep others |

### FILE 9: `ResultsPanel.jsx` (Clipboard API)

**React Concepts:**

| Concept | Code | Explanation |
|---------|------|-------------|
| **Web APIs in React** | `navigator.clipboard.writeText()` | Using browser APIs |
| **Temporary State** | `setTimeout(() => setCopied(false), 2000)` | Reset state after delay |
| **Error Handling** | `try/catch` | Handle API failures gracefully |

### FILE 10: `Playground.jsx` (Form Handling & Validation)

**React Concepts:**

| Concept | Pattern | Explanation |
|---------|---------|-------------|
| **Form State Reset** | `setError(null)` before execution | Clear previous errors |
| **JSON Parsing** | `JSON.parse(pipeline)` | Convert string to object (can throw) |
| **POST Request** | `method: 'POST', body: JSON.stringify(...)` | Sending data to API |
| **Error State** | `error` vs `results` mutually exclusive | Only show one at a time |

---

## 3. Configuration Files

### `vite.config.js`

**Concepts:**
- **Vite** - Modern build tool (faster than webpack)
- **Proxy** - Forward `/api` requests to backend (avoids CORS issues)

### `tailwind.config.js`

**Concepts:**
- **content** - Which files to scan for classes
- **extend** - Add custom colors/animations without overwriting defaults

---

## 4. Key Patterns Used in This Codebase


| Pattern | Files | Description |
|---------|-------|-------------|
| **Loading State** | Home, Mission, DataExplorer, Learning | `loading ? 
<Skeleton /> : <Content />` |
| **Container/Presenter** | Layout wraps pages | Layout handles structure, pages 
handle content |
| **Controlled Forms** | Playground, DataExplorer | React controls all form 
values |
| **Prop Drilling** | App → Layout → children | State passed through multiple 
levels |
| **Early Return** | ExplanationPanel, ResultsPanel | Guard clauses at component 
start |
| **List Rendering** | Every file | `array.map()` with `key` prop |
| **Conditional CSS** | Layout, DataExplorer | Template literals for dynamic 
classes |
| **Error Boundaries** | (Not implemented) | Could add for error handling |


This section explains the common React patterns and architectural decisions used throughout the codebase, with real examples from the actual code.

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

### Summary of Patterns

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

## 5. Complete React Questions & Answers

### React Fundamentals

#### 1. What is the Virtual DOM and how does it improve performance?

**Answer:**
The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When state changes in React:

1. React creates a new Virtual DOM tree
2. It compares (diffs) the new tree with the previous one
3. It calculates the minimal set of changes needed
4. It batches and applies only those changes to the real DOM

**Performance benefit:** Direct DOM manipulation is expensive. By batching changes and only updating what's necessary, React minimizes costly DOM operations.

```jsx
// When you update state like this:
setCount(count + 1);

// React doesn't immediately update the DOM
// It updates the Virtual DOM, diffs it, then makes minimal real DOM changes
```

---

#### 2. What is the difference between state and props?

**Answer:**

| Feature | State | Props |
|---------|-------|-------|
| **Ownership** | Owned by the component | Passed from parent |
| **Mutability** | Can be changed with setState | Read-only (immutable) |
| **Scope** | Local to the component | Flows down (parent → child) |
| **Re-renders** | Changes trigger re-render | Changes from parent trigger re-render |

```jsx
// Props - received from parent, cannot be modified
function Child({ name }) {
  // name is a prop - read-only
  return <p>{name}</p>;
}

// State - owned and managed by this component
function Parent() {
  const [name, setName] = useState('Eleven'); // state - can be changed
  return <Child name={name} />;
}
```

---

#### 3. What is JSX and how is it different from HTML?

**Answer:**
JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code in JavaScript. It gets compiled to `React.createElement()` calls.

**Key differences from HTML:**

| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| `style="color: red"` | `style={{ color: 'red' }}` |
| Can use unquoted attributes | Must quote or use `{}` |
| Self-closing tags optional | Self-closing tags required (`<img />`) |

```jsx
// JSX
<div className="container" onClick={handleClick} style={{ color: 'red' }}>
  <input type="text" />
  <label htmlFor="name">Name</label>
</div>

// Compiles to:
React.createElement('div', { className: 'container', onClick: handleClick, style: { color: 'red' } },
  React.createElement('input', { type: 'text' }),
  React.createElement('label', { htmlFor: 'name' }, 'Name')
);
```

---

#### 4. What does `key` do in lists and why is it important?

**Answer:**
`key` is a special prop that helps React identify which items in a list have changed, been added, or removed. It enables efficient re-rendering.

**Why it matters:**
- Without keys, React re-renders the entire list
- With keys, React only updates changed items
- Keys must be unique among siblings (not globally)

```jsx
// Bad - using index as key (can cause bugs with reordering)
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// Good - using unique identifier
{items.map((item) => (
  <Item key={item.id} data={item} />
))}
```

**Bug example without proper keys:**
If you have inputs in a list and reorder items, React may keep input values attached to the wrong items because it matches by index, not content.

---

#### 5. What is the difference between controlled and uncontrolled components?

**Answer:**

**Controlled Component:** React state is the "single source of truth." Form data is handled by React.

```jsx
// Controlled - React controls the value
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value}  // React controls this
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

**Uncontrolled Component:** Form data is handled by the DOM itself. You use refs to access values.

```jsx
// Uncontrolled - DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current.value); // Get value from DOM
  };
  
  return <input ref={inputRef} defaultValue="initial" />;
}
```

| Controlled | Uncontrolled |
|------------|--------------|
| More React-like | More traditional HTML |
| Instant validation | Validation on submit |
| More code | Less code |
| Better for dynamic forms | Good for simple forms |

---

#### 6. What is `React.StrictMode` and what does it do?

**Answer:**
`React.StrictMode` is a development tool that helps identify potential problems in your application. It doesn't render any visible UI.

**What it does:**
1. **Double-invokes** certain functions (constructors, render, effects) to detect side effects
2. **Warns about deprecated APIs** (like legacy string refs)
3. **Warns about unsafe lifecycle methods**
4. **Detects unexpected side effects**

```jsx
// In main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Important:** StrictMode only runs in development. It has no effect in production builds.

---

#### 7. What is the difference between `ReactDOM.createRoot()` and `ReactDOM.render()`?

**Answer:**

| `ReactDOM.render()` (React 17 and earlier) | `ReactDOM.createRoot()` (React 18+) |
|-------------------------------------------|-------------------------------------|
| Legacy API | New Concurrent API |
| Synchronous rendering | Enables concurrent features |
| No automatic batching outside events | Automatic batching everywhere |

```jsx
// React 17 (Legacy)
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 (New)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Why `createRoot`?**
- Enables concurrent rendering (React can pause and resume rendering)
- Better performance with automatic batching of state updates
- Required for new features like `useTransition`, `useDeferredValue`

---

### Hooks

#### 8. What is `useState` and how does it work?

**Answer:**
`useState` is a Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.

```jsx
const [count, setCount] = useState(0);
//     ↑      ↑              ↑
//   value  setter      initial value
```

**Key behaviors:**
1. **Initial value** is only used on first render
2. **Setter can take a value or a function**
3. **Updates trigger re-renders**
4. **State updates are asynchronous and batched**

```jsx
// Direct value
setCount(5);

// Functional update (when new state depends on old state)
setCount(prevCount => prevCount + 1);

// Lazy initialization (expensive initial calculation)
const [data, setData] = useState(() => expensiveCalculation());
```

---

#### 9. What is `useEffect` and what is the dependency array for?

**Answer:**
`useEffect` lets you perform side effects in functional components (data fetching, subscriptions, DOM manipulation).

```jsx
useEffect(() => {
  // Effect code runs after render
  
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]);
```

**Dependency array controls when effect runs:**

| Dependency Array | When Effect Runs |
|-----------------|------------------|
| `[]` (empty) | Only on mount (once) |
| `[a, b]` | On mount + when `a` or `b` changes |
| No array | After every render |

```jsx
// Runs once on mount
useEffect(() => {
  fetchData();
}, []);

// Runs when `id` changes
useEffect(() => {
  fetchUser(id);
}, [id]);

// Runs after every render (usually a mistake)
useEffect(() => {
  console.log('rendered');
});
```

---

#### 10. What happens if you don't provide a dependency array to `useEffect`?

**Answer:**
The effect runs **after every render** — initial render and every re-render.

```jsx
useEffect(() => {
  console.log('This runs after EVERY render');
  // No dependency array = runs every time
});
```

**This is usually undesirable because:**
- It can cause infinite loops if the effect updates state
- It's inefficient for expensive operations
- It's rarely the intended behavior

```jsx
// Infinite loop example!
useEffect(() => {
  setCount(count + 1); // Updates state → triggers re-render → runs effect again
});
```

---

#### 11. What is the cleanup function in `useEffect`?

**Answer:**
The cleanup function is returned from `useEffect` and runs:
1. **Before the effect runs again** (on re-render with changed dependencies)
2. **When the component unmounts**

**Purpose:** Prevent memory leaks and clean up side effects (subscriptions, timers, event listeners).

```jsx
useEffect(() => {
  // Subscribe to something
  const subscription = someAPI.subscribe(data => {
    setData(data);
  });
  
  // Cleanup: unsubscribe when component unmounts or before next effect
  return () => {
    subscription.unsubscribe();
  };
}, []);

// Timer example
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => clearInterval(timer); // Clean up timer
}, []);
```

---

#### 12. What is `useParams` from React Router?

**Answer:**
`useParams` is a hook that returns an object containing URL parameters from dynamic route segments.

```jsx
// Route definition
<Route path="/mission/:id" element={<Mission />} />

// In Mission component
function Mission() {
  const { id } = useParams();
  // If URL is /mission/3, then id = "3"
  
  return <h1>Mission {id}</h1>;
}
```

**Note:** Parameters are always strings. You may need to convert:
```jsx
const { id } = useParams();
const numericId = parseInt(id, 10);
```

---

#### 13. What is `useLocation` from React Router?

**Answer:**
`useLocation` returns the current location object containing information about the current URL.

```jsx
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  console.log(location);
  // {
  //   pathname: "/mission/3",
  //   search: "?filter=active",
  //   hash: "#section1",
  //   state: { fromDashboard: true },
  //   key: "default"
  // }
  
  // Highlight active nav item
  const isActive = location.pathname === '/home';
  
  return <nav className={isActive ? 'active' : ''}>{...}</nav>;
}
```

---

#### 14. What are custom hooks and when would you create one?

**Answer:**
Custom hooks are JavaScript functions that start with "use" and can call other hooks. They let you extract and reuse stateful logic.

**When to create:**
- Logic is used in multiple components
- A component has complex logic that can be isolated
- You want to share behavior, not UI

```jsx
// Custom hook for data fetching
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage in components
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <Profile user={data} />;
}
```

---

#### 15. What is the difference between `useEffect` with `[]` vs `[dependency]` vs no array?

**Answer:**

| Syntax | Behavior | Use Case |
|--------|----------|----------|
| `useEffect(fn, [])` | Runs once on mount | Initial data fetch, one-time setup |
| `useEffect(fn, [dep])` | Runs on mount + when `dep` changes | Fetch data when ID changes |
| `useEffect(fn)` | Runs after every render | Rarely needed, usually a bug |

```jsx
// [] - Only on mount
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);

// [id] - On mount AND when id changes
useEffect(() => {
  console.log(`Fetching user ${id}`);
  fetchUser(id);
}, [id]);

// No array - Every render (avoid this)
useEffect(() => {
  console.log('Every single render');
});
```

---

### State Management

#### 16. What is "lifting state up"?

**Answer:**
Lifting state up means moving state from child components to their closest common ancestor so multiple children can share it.

**Before (state in children, can't share):**
```jsx
function Counter1() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function Counter2() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**After (lifted to parent):**
```jsx
function Parent() {
  const [count, setCount] = useState(0); // Lifted state
  
  return (
    <>
      <Counter count={count} setCount={setCount} />
      <Counter count={count} setCount={setCount} />
      <Display count={count} />
    </>
  );
}

function Counter({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

#### 17. How do you update state immutably in React?

**Answer:**
Never modify state directly. Always create new objects/arrays.

```jsx
// ❌ WRONG - Mutating state
const [user, setUser] = useState({ name: 'Eleven', age: 14 });
user.age = 15; // Direct mutation - won't trigger re-render!
setUser(user); // Same object reference, React won't detect change

// ✅ CORRECT - Creating new object
setUser({ ...user, age: 15 }); // New object with updated property

// Arrays
const [items, setItems] = useState([1, 2, 3]);

// ❌ WRONG
items.push(4);
setItems(items);

// ✅ CORRECT
setItems([...items, 4]); // Add
setItems(items.filter(i => i !== 2)); // Remove
setItems(items.map(i => i === 2 ? 20 : i)); // Update
```

---

#### 18. What is the difference between `setState(newValue)` and `setState(prev => newValue)`?

**Answer:**

| `setState(newValue)` | `setState(prev => newValue)` |
|---------------------|------------------------------|
| Uses the value at the time of calling | Uses the latest state value |
| Can cause stale state issues | Always up-to-date |
| Fine for independent updates | Required for updates based on previous state |

```jsx
const [count, setCount] = useState(0);

// Problem with direct value
const handleClick = () => {
  setCount(count + 1); // count = 0
  setCount(count + 1); // count = 0 (still!)
  setCount(count + 1); // count = 0 (still!)
  // Result: count = 1, not 3!
};

// Solution with functional update
const handleClick = () => {
  setCount(prev => prev + 1); // 0 → 1
  setCount(prev => prev + 1); // 1 → 2
  setCount(prev => prev + 1); // 2 → 3
  // Result: count = 3
};
```

---

#### 19. When would you use multiple `useState` vs one `useState` with an object?

**Answer:**

**Use multiple `useState` when:**
- State values are independent
- They update at different times
- Simpler to reason about

```jsx
// Independent state - use multiple useState
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**Use object state when:**
- Values are related and update together
- You're mimicking class component state
- Reduces number of hooks

```jsx
// Related state - use object
const [form, setForm] = useState({
  name: '',
  email: '',
  password: ''
});

// Update one field
setForm(prev => ({ ...prev, name: 'Eleven' }));
```

**Rule of thumb:** Start with multiple `useState`, combine if updates are always together.

---

#### 20. What is prop drilling and how do you avoid it?

**Answer:**
Prop drilling is passing props through multiple intermediate components that don't need the data, just to get it to a deeply nested child.

```jsx
// Prop drilling - App → Layout → Header → UserMenu → Avatar
function App() {
  const [user, setUser] = useState({ name: 'Eleven' });
  return <Layout user={user} />;
}
function Layout({ user }) {
  return <Header user={user} />;
}
function Header({ user }) {
  return <UserMenu user={user} />;
}
function UserMenu({ user }) {
  return <Avatar user={user} />;
}
```

**Solutions:**

1. **Context API:**
```jsx
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Eleven' });
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function Avatar() {
  const user = useContext(UserContext); // Access directly!
  return <img src={user.avatar} />;
}
```

2. **Component composition (children):**
```jsx
function App() {
  const user = { name: 'Eleven' };
  return (
    <Layout>
      <Header>
        <Avatar user={user} />
      </Header>
    </Layout>
  );
}
```

3. **State management libraries** (Redux, Zustand, Jotai)

---

### React Router

#### 21. What is the difference between `<BrowserRouter>` and `<HashRouter>`?

**Answer:**

| `BrowserRouter` | `HashRouter` |
|-----------------|--------------|
| Uses HTML5 History API | Uses URL hash (`#`) |
| Clean URLs: `/about` | Hash URLs: `/#/about` |
| Requires server configuration | Works without server config |
| Better for SEO | Worse for SEO |
| Standard for most apps | Useful for static hosting |

```jsx
// BrowserRouter - URL: example.com/mission/3
<BrowserRouter>
  <Routes>
    <Route path="/mission/:id" element={<Mission />} />
  </Routes>
</BrowserRouter>

// HashRouter - URL: example.com/#/mission/3
<HashRouter>
  <Routes>
    <Route path="/mission/:id" element={<Mission />} />
  </Routes>
</HashRouter>
```

**Note:** BrowserRouter requires server to return `index.html` for all routes (otherwise you get 404 on direct URL access).

---

#### 22. How do dynamic routes work (like `/mission/:id`)?

**Answer:**
Dynamic segments are prefixed with `:` and capture values from the URL.

```jsx
// Route definition
<Route path="/mission/:id" element={<Mission />} />
<Route path="/user/:userId/post/:postId" element={<Post />} />

// Component extracts params with useParams
function Mission() {
  const { id } = useParams();
  // URL: /mission/3 → id = "3"
}

function Post() {
  const { userId, postId } = useParams();
  // URL: /user/5/post/10 → userId = "5", postId = "10"
}
```

---

#### 23. What is the `<Link>` component and how is it different from `<a>`?

**Answer:**

| `<Link>` | `<a>` |
|----------|-------|
| Client-side navigation | Full page reload |
| Preserves React state | Loses all state |
| Fast (no server request) | Slow (fetches entire page) |
| Works with React Router | Standard HTML |

```jsx
// Link - client-side navigation, no page reload
<Link to="/about">About</Link>

// Anchor - full page reload, loses state
<a href="/about">About</a>

// Link with state passing
<Link to="/mission/3" state={{ from: 'dashboard' }}>
  Mission 3
</Link>
```

---

#### 24. What is the `<Routes>` component in React Router v6?

**Answer:**
`<Routes>` replaces `<Switch>` from v5. It renders the first child `<Route>` that matches the current location.

**Key differences from v5:**
- `element` instead of `component` or `render`
- Routes are relative by default
- No need for `exact` prop (it's the default)

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/mission/:id" element={<Mission />} />
  <Route path="/data" element={<DataExplorer />} />
  <Route path="*" element={<NotFound />} /> {/* Catch-all */}
</Routes>
```

---

#### 25. How do you programmatically navigate in React Router?

**Answer:**
Use the `useNavigate` hook:

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    
    // Navigate to dashboard
    navigate('/dashboard');
    
    // Navigate with replace (can't go back)
    navigate('/dashboard', { replace: true });
    
    // Navigate back
    navigate(-1);
    
    // Navigate with state
    navigate('/dashboard', { state: { from: 'login' } });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### Component Patterns

#### 26. What is the children prop?

**Answer:**
`children` is a special prop that contains the content between a component's opening and closing tags.

```jsx
// Parent component that wraps children
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage - everything between tags becomes children
<Card title="Profile">
  <p>Name: Eleven</p>
  <p>Power: Telekinesis</p>
  <button>Edit</button>
</Card>
```

**Uses:**
- Layout components (wrap pages)
- Modal/Dialog containers
- Higher-order components

---

#### 27. What is conditional rendering and what are common patterns?

**Answer:**

**1. Ternary operator:**
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

**2. Logical AND (`&&`):**
```jsx
{isAdmin && <AdminPanel />}
{items.length > 0 && <ItemList items={items} />}
```

**3. Early return:**
```jsx
function Profile({ user }) {
  if (!user) return <div>Please log in</div>;
  return <div>{user.name}</div>;
}
```

**4. Conditional variable:**
```jsx
let content;
if (isLoading) {
  content = <Spinner />;
} else if (error) {
  content = <Error message={error} />;
} else {
  content = <Data data={data} />;
}
return <div>{content}</div>;
```

**5. Null (render nothing):**
```jsx
if (!shouldShow) return null;
```

---

#### 28. What is a layout component?

**Answer:**
A layout component provides consistent structure (header, sidebar, footer) that wraps page content using `children`.

```jsx
function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main className="content">
        {children}  {/* Page-specific content goes here */}
      </main>
      <Footer />
    </div>
  );
}

// Usage in App.jsx
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}
```

---

#### 29. What is component composition?

**Answer:**
Component composition is building complex UIs by combining simpler components, rather than using inheritance.

**Instead of inheritance:**
```jsx
// ❌ Don't create specialized components through inheritance
class FancyButton extends Button { ... }
```

**Use composition:**
```jsx
// ✅ Compose components together
function Dialog({ children, title }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      <div className="dialog-content">{children}</div>
    </div>
  );
}

function ConfirmDialog({ onConfirm }) {
  return (
    <Dialog title="Are you sure?">
      <p>This action cannot be undone.</p>
      <button onClick={onConfirm}>Confirm</button>
    </Dialog>
  );
}
```

---

#### 30. What is the early return pattern?

**Answer:**
Early return means returning from a component at the start if certain conditions aren't met, instead of nesting in if-else.

```jsx
// ❌ Nested conditionals (hard to read)
function Profile({ user, loading, error }) {
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error message={error} />
      ) : user ? (
        <div>{user.name}</div>
      ) : (
        <div>No user</div>
      )}
    </div>
  );
}

// ✅ Early returns (cleaner)
function Profile({ user, loading, error }) {
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!user) return <div>No user</div>;
  
  return <div>{user.name}</div>;
}
```

---

### Data Fetching

#### 31. Where should you fetch data in a React component?

**Answer:**
In `useEffect` with an empty dependency array (or appropriate dependencies).

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    
    fetchUser();
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

**Note:** You cannot make `useEffect` callback async directly. Define an async function inside and call it.

---

#### 32. What is the loading/error/data pattern?

**Answer:**
A common pattern for handling async operations with three states:

```jsx
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData()
      .then(result => setData(result))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;
  
  return <DataDisplay data={data} />;
}
```

---

#### 33. Why do we use `try/catch/finally` when fetching data?

**Answer:**

| Block | Purpose |
|-------|---------|
| `try` | Contains code that might throw an error |
| `catch` | Handles the error gracefully |
| `finally` | Runs regardless of success or failure (cleanup) |

```jsx
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError(err.message); // Handle error
  } finally {
    setLoading(false); // Always stop loading spinner
  }
};
```

---

#### 34. What is `encodeURIComponent` used for?

**Answer:**
It encodes special characters in a string for safe use in URLs.

```jsx
const searchQuery = "hello world & special=chars";

// ❌ Without encoding - breaks URL
`/api/search?q=${searchQuery}`
// Result: /api/search?q=hello world & special=chars (broken!)

// ✅ With encoding - safe URL
`/api/search?q=${encodeURIComponent(searchQuery)}`
// Result: /api/search?q=hello%20world%20%26%20special%3Dchars
```

**Characters it encodes:** spaces, `&`, `=`, `?`, `/`, `#`, etc.

---

#### 35. How do you handle errors in async operations?

**Answer:**

**1. try/catch with async/await:**
```jsx
try {
  const data = await fetchData();
} catch (error) {
  setError(error.message);
}
```

**2. .catch() with promises:**
```jsx
fetchData()
  .then(data => setData(data))
  .catch(error => setError(error.message));
```

**3. Error boundaries (for render errors):**
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

---

### Performance

#### 36. What is React.memo and when would you use it?

**Answer:**
`React.memo` is a higher-order component that memoizes a component, preventing re-renders if props haven't changed.

```jsx
// Without memo - re-renders even when props are the same
function ExpensiveComponent({ data }) {
  // Expensive render logic
  return <div>{complexCalculation(data)}</div>;
}

// With memo - only re-renders when data changes
const MemoizedComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{complexCalculation(data)}</div>;
});
```

**When to use:**
- Component renders often with same props
- Component has expensive render logic
- Parent re-renders frequently

**When NOT to use:**
- Props change on every render
- Component is simple/cheap to render
- Premature optimization

---

#### 37. What is `useCallback` and `useMemo`?

**Answer:**

**`useMemo`** - Memoizes a **computed value**:
```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]); // Recompute only when a or b changes
```

**`useCallback`** - Memoizes a **function**:
```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // New function only when id changes
```

**Use case for `useCallback`:**
```jsx
// Without useCallback, new function created every render
// This breaks React.memo on Child
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ New function every render
  const handleClick = () => console.log('clicked');
  
  // ✅ Same function reference across renders
  const handleClick = useCallback(() => console.log('clicked'), []);
  
  return <MemoizedChild onClick={handleClick} />;
}
```

---

#### 38. Why shouldn't you define functions inside render?

**Answer:**
Functions defined inside render create new references every render, which can:

1. **Break memoization** (React.memo, useCallback deps)
2. **Cause unnecessary re-renders** of children
3. **Waste memory** (garbage collection)

```jsx
// ❌ New function every render
function Parent() {
  return (
    <Child onClick={() => console.log('clicked')} />
  );
}

// ✅ Stable function reference
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return <Child onClick={handleClick} />;
}
```

---

#### 39. How does React's reconciliation algorithm work?

**Answer:**
Reconciliation is how React updates the DOM efficiently by comparing Virtual DOM trees.

**Process:**
1. When state/props change, React creates a new Virtual DOM tree
2. It compares (diffs) the new tree with the old one
3. It finds the minimal set of changes needed
4. It updates only those parts of the real DOM

**Key assumptions React makes:**
- Different element types produce different trees (e.g., `<div>` → `<span>` rebuilds entire subtree)
- `key` prop indicates stable identity across renders
- Sibling elements should have stable keys

---

#### 40. What are the implications of changing the `key` prop?

**Answer:**
Changing `key` tells React this is a **completely new component**, causing it to:

1. Unmount the old component (run cleanup effects)
2. Mount a new component (reset all state)

**Use case - Reset component state:**
```jsx
// Changing key resets the form when user changes
<UserForm key={userId} user={user} />

// Without key change, form would keep old input values
// when switching between users
```

**Avoid using index as key when:**
- Items can be reordered
- Items can be added/removed from the middle
- Items have local state (inputs, expanded state)

---

### Forms

#### 41. What is a controlled input?

**Answer:**
A controlled input's value is controlled by React state. The input displays the state value, and state updates on every change.

```jsx
function ControlledForm() {
  const [name, setName] = useState('');
  
  return (
    <input
      type="text"
      value={name}           // Controlled by state
      onChange={(e) => setName(e.target.value)}  // Update state on change
    />
  );
}
```

**Characteristics:**
- React is the "single source of truth"
- Can validate/transform input in real-time
- Value is always in sync with state

---

#### 42. How do you handle form submission in React?

**Answer:**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload!
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert('Message sent!');
    } catch (error) {
      alert('Failed to send');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <textarea name="message" value={formData.message} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

#### 43. How do you validate forms in React?

**Answer:**

**1. On submit:**
```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  const errors = {};
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.email.includes('@')) errors.email = 'Invalid email';
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  submitForm(formData);
};
```

**2. On change (real-time):**
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Validate immediately
  if (name === 'email' && !value.includes('@')) {
    setErrors(prev => ({ ...prev, email: 'Invalid email' }));
  } else {
    setErrors(prev => ({ ...prev, email: null }));
  }
};
```

**3. Using libraries:** React Hook Form, Formik, Yup (schema validation)

---

#### 44. What is the difference between `onChange` and `onInput`?

**Answer:**

| `onChange` | `onInput` |
|------------|-----------|
| React: fires on every keystroke | Same as onChange in React |
| HTML: fires on blur (losing focus) | HTML: fires on every keystroke |
| React's `onChange` = HTML's `oninput` | Identical behavior in React |

In React, both behave the same way (fire on every keystroke). Use `onChange` as it's the React convention.

---

### Styling

#### 45. How do you apply conditional CSS classes in React?

**Answer:**

**1. Template literals:**
```jsx
<div className={`btn ${isActive ? 'btn-active' : ''}`}>

<div className={`card ${size} ${isDisabled ? 'disabled' : ''}`}>
```

**2. Array join:**
```jsx
const classes = ['btn', isActive && 'btn-active', size].filter(Boolean).join(' ');
<div className={classes}>
```

**3. Libraries (clsx/classnames):**
```jsx
import clsx from 'clsx';

<div className={clsx('btn', { 'btn-active': isActive, 'btn-disabled': isDisabled })}>
```

---

#### 46. What is CSS-in-JS?

**Answer:**
CSS-in-JS is writing CSS styles directly in JavaScript files, typically using tagged template literals or objects.

**Libraries:** styled-components, Emotion, Stitches

```jsx
// styled-components example
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 10px 20px;
  border-radius: 4px;
  
  &:hover {
    opacity: 0.8;
  }
`;

<Button primary>Click me</Button>
```

**Benefits:** Scoped styles, dynamic styling, no class name conflicts
**Drawbacks:** Runtime overhead, learning curve, larger bundle

---

#### 47. What is Tailwind CSS and how does it differ from traditional CSS?

**Answer:**

| Traditional CSS | Tailwind CSS |
|-----------------|--------------|
| Write custom CSS classes | Use utility classes |
| Separate CSS files | Classes directly in JSX |
| Semantic class names (`.btn-primary`) | Functional class names (`bg-blue-500`) |
| More CSS to write | More classes to write |

```jsx
// Traditional CSS
<button className="btn btn-primary">Click</button>

// Tailwind CSS
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click
</button>
```

**Tailwind advantages:**
- No context switching between files
- Consistent design system
- Small production bundle (purges unused classes)
- Rapid prototyping

---

#### 48. How do inline styles work in React (`style={{}}`)?

**Answer:**
Inline styles in React use JavaScript objects with camelCase properties.

```jsx
// Inline style syntax
<div style={{ 
  backgroundColor: 'red',    // camelCase, not background-color
  fontSize: '16px',          // string with units
  padding: 10,               // number = pixels
  fontWeight: 'bold'
}}>
  Styled content
</div>

// Dynamic styles
<div style={{
  color: isError ? 'red' : 'green',
  display: isVisible ? 'block' : 'none'
}}>
  Dynamic
</div>

// Style object variable
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: 16
};
<div style={cardStyle}>Card</div>
```

**Limitations:**
- No pseudo-classes (`:hover`, `:focus`)
- No media queries
- No animations (without JS)
- Higher specificity (harder to override)

---

### Advanced Concepts

#### 49. What is the Context API and when would you use it?

**Answer:**
Context provides a way to pass data through the component tree without prop drilling.

```jsx
// 1. Create context
const ThemeContext = createContext('light');

// 2. Provide value at top level
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere below
function DeepChild() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current: {theme}
    </button>
  );
}
```

**Use for:** Theme, auth user, locale, global settings
**Avoid for:** Frequently changing data (causes many re-renders)

---

#### 50. What are portals in React?

**Answer:**
Portals let you render children into a DOM node outside the parent component's hierarchy.

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Renders here, not in parent!
  );
}

// HTML
<body>
  <div id="root"><!-- React app --></div>
  <div id="modal-root"><!-- Modals render here --></div>
</body>
```

**Use cases:**
- Modals/dialogs (avoid z-index issues)
- Tooltips
- Floating menus

---

#### 51. What is an error boundary?

**Answer:**
Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

**Note:** Error boundaries don't catch:
- Event handler errors (use try/catch)
- Async code (use try/catch)
- Server-side rendering errors
- Errors in the boundary itself

---

#### 52. What is code splitting and lazy loading?

**Answer:**
Code splitting breaks your bundle into smaller chunks loaded on demand. Lazy loading loads components only when needed.

```jsx
import { lazy, Suspense } from 'react';

// Lazy load the component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

**Benefits:**
- Faster initial load (smaller bundle)
- Load code only when needed
- Better performance on slow networks

---

#### 53. What is server-side rendering (SSR)?

**Answer:**
SSR renders React components on the server, sending fully-rendered HTML to the browser.

**Process:**
1. User requests page
2. Server renders React to HTML string
3. Server sends complete HTML
4. Browser displays content immediately
5. React "hydrates" (attaches event handlers)

**Benefits:**
- Better SEO (search engines see full content)
- Faster First Contentful Paint
- Works without JavaScript (initial view)

**Frameworks:** Next.js, Remix

```jsx
// Next.js example
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}
```

---

#### 54. What is the difference between SPA and SSR?

**Answer:**

| SPA (Single Page App) | SSR (Server-Side Rendering) |
|-----------------------|-----------------------------|
| One HTML file, JS does everything | Server generates HTML per request |
| Blank page until JS loads | Content visible immediately |
| Poor SEO (empty HTML) | Good SEO (full content) |
| Fast navigation after load | Each page can be slower |
| Client does rendering work | Server does rendering work |

**SPA flow:**
```
Request → Server sends minimal HTML → JS downloads → JS renders content
```

**SSR flow:**
```
Request → Server renders full HTML → Browser displays → JS hydrates
```

---

### Build Tools

#### 55. What is Vite and why is it faster than webpack?

**Answer:**

| Webpack | Vite |
|---------|------|
| Bundles entire app before serving | Uses native ES modules in dev |
| Slow cold start | Instant server start |
| Full rebuild on changes | HMR updates only changed module |
| Complex configuration | Simple configuration |

**Why Vite is faster:**
1. **No bundling in dev** - serves ES modules directly to browser
2. **On-demand compilation** - only compiles files when requested
3. **Native ESM** - browser handles module resolution
4. **Fast HMR** - only updates what changed, not entire bundle

```js
// vite.config.js - minimal config
export default defineConfig({
  plugins: [react()],
});
```

---

#### 56. What is HMR (Hot Module Replacement)?

**Answer:**
HMR updates modules in the browser without a full page reload, preserving application state.

**Without HMR:**
1. Change code
2. Browser reloads entire page
3. All state is lost
4. Navigate back to where you were

**With HMR:**
1. Change code
2. Only changed module updates
3. State preserved
4. See changes instantly

```jsx
// Change this text, see it update without losing form state
<h1>Hello World</h1>
```

---

#### 57. What does the proxy configuration do in Vite?

**Answer:**
The proxy forwards API requests from the dev server to a backend server, avoiding CORS issues.

```js
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

**How it works:**
```
Frontend (localhost:5173) → /api/users → Proxy → Backend (localhost:3001/api/users)
```

**Without proxy:**
- Browser blocks cross-origin requests (CORS)
- Would need CORS headers on backend

**With proxy:**
- Request appears to come from same origin
- No CORS issues in development

---

#### 58. What is tree shaking?

**Answer:**
Tree shaking is a dead code elimination technique that removes unused exports from the final bundle.

```jsx
// utils.js
export function used() { return 'I am used'; }
export function unused() { return 'I am never imported'; }

// App.js
import { used } from './utils';
// unused() is not imported

// After tree shaking, the bundle only includes used()
```

**Requirements for tree shaking:**
- ES modules (`import`/`export`, not `require`)
- Side-effect-free code
- Production build

**Benefits:**
- Smaller bundle size
- Faster load times
- Import from large libraries without penalty

```jsx
// Tree shaking lets you do this efficiently:
import { Button } from 'huge-ui-library';
// Only Button code is included, not the entire library
```

---

## Summary

This README provides a comprehensive guide to:

### React Development
- Understanding the frontend architecture and component structure
- Learning React concepts through real code examples from this project
- Mastering React Hooks, Router, State Management, and Performance optimization
- Preparing for React interviews with 58 detailed Q&A covering all major topics
- Understanding 15+ common patterns and best practices used in production code

### MongoDB Learning
- Interactive platform for learning MongoDB aggregation pipelines
- Real-world query examples and optimization techniques
- Integration of MongoDB concepts with React frontend

### How to Use This Guide

1. **For Learning React:** Start with the file-by-file breakdown, then dive into the interview questions
2. **For Learning MongoDB:** Explore the Mission pages and Playground to see aggregation pipelines in action
3. **For Interview Prep:** Review all 58 questions and answers, focusing on areas you're less familiar with
4. **For Development:** Reference the patterns section when building new features

**This project uniquely combines MongoDB database concepts with modern React development, making it an excellent resource for full-stack learning!**

Use this as a reference while developing and as a study guide for interviews!
