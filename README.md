# Frontend Implementation Guide

## Project Overview

This frontend implementation is part of the **Stranger Things Mongo Quest** project, an interactive learning platform that combines **MongoDB** and **React** concepts to teach database querying through gamified missions.

---

## Portal UI Screenshots

These images document the floating **portal** toolbar on the right (Home, screenshot capture, screen recording, and Manage) and how it appears across the app, including sidebar mission portal icons on the Learning view.

### Home — welcome dashboard

![Home dashboard with portal toolbar](images/portal-home-dashboard.png)

### Data Explorer — Characters collection

![Data Explorer with Characters list and document detail](images/portal-data-explorer-characters.png)

### Data Explorer — Creatures collection

![Data Explorer with Creatures list and Mind Flayer document](images/portal-data-explorer-creatures.png)

### Learning — Core concepts (Aggregation Framework)

![Learning page with Aggregation Framework and mission portal icons](images/portal-learning-aggregation.png)

### Mission — Find the Demogorgon

![Mission 1 with aggregation pipeline editor and portal toolbar](images/portal-mission-find-demogorgon.png)

---

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
6. [Portal UI Screenshots](#6-portal-ui-screenshots)

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
├── images/             # Portal UI documentation screenshots
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
## MongoDB Concepts & Advanced Questions

This section covers all MongoDB concepts taught in this project and provides comprehensive  preparation with advanced questions and answers.

---

### 6.1 MongoDB Concepts Learned in This Project

#### Core Aggregation Framework Concepts

**1. Aggregation Pipeline Basics**
- Pipeline is an array of stages that transform documents sequentially
- Documents flow through stages like an assembly line
- Each stage processes documents and passes results to the next stage

**2. Essential Pipeline Stages**

| Stage | Purpose | Example Use Case |
|-------|---------|------------------|
| `$match` | Filter documents (like WHERE in SQL) | Find active characters, confirmed sightings |
| `$project` | Reshape documents (like SELECT in SQL) | Include/exclude fields, compute new fields |
| `$group` | Aggregate data (like GROUP BY in SQL) | Count by category, calculate averages |
| `$sort` | Order results | Sort by timestamp, power level |
| `$limit` / `$skip` | Pagination | Get top 10, skip first 20 |
| `$lookup` | Join collections (like JOIN in SQL) | Combine sightings with creature details |
| `$unwind` | Flatten arrays | Expand abilities array into separate documents |
| `$facet` | Run parallel pipelines | Multiple analyses in one query |
| `$bucket` | Group into ranges | Create histograms, distributions |
| `$addFields` / `$set` | Add computed fields | Calculate risk scores, time differences |

**3. Comparison Operators**

```javascript
// Used in $match stages
{
  $match: {
    power_level: { $gt: 5 },        // Greater than
    age: { $gte: 18 },               // Greater than or equal
    casualties: { $lt: 10 },          // Less than
    threat_level: { $lte: 7 },       // Less than or equal
    status: { $in: ["active", "missing"] },  // In array
    name: { $nin: ["Vecna", "Mind Flayer"] }, // Not in array
    status: { $ne: "destroyed" },    // Not equal
    description: { $exists: true },   // Field exists
    abilities: { $size: 3 }           // Array size
  }
}
```

**4. Logical Operators**

```javascript
{
  $match: {
    $or: [
      { status: "missing" },
      { status: "endangered" }
    ],
    $and: [
      { team: "hawkins_heroes" },
      { power_level: { $gte: 5 } }
    ],
    $not: { status: "destroyed" }
  }
}
```

**5. Accumulators (Used in $group)**

| Accumulator | Purpose | Example |
|-------------|---------|--------|
| `$sum` | Sum values or count | `{ count: { $sum: 1 } }` |
| `$avg` | Calculate average | `{ avgPower: { $avg: "$power_level" } }` |
| `$min` / `$max` | Find extremes | `{ firstSighting: { $min: "$timestamp" } }` |
| `$first` / `$last` | Get first/last value | `{ latest: { $first: "$reports" } }` |
| `$push` | Collect into array | `{ members: { $push: "$name" } }` |
| `$addToSet` | Collect unique values | `{ uniqueLocations: { $addToSet: "$location_id" } }` |

**6. Array Expressions**

```javascript
// $filter - Filter array elements
{
  $project: {
    criticalReports: {
      $filter: {
        input: "$reports",
        as: "report",
        cond: { $eq: ["$$report.priority", "critical"] }
      }
    }
  }
}

// $map - Transform array elements
{
  $project: {
    abilityDescriptions: {
      $map: {
        input: "$abilities",
        as: "ability",
        in: { $concat: ["Skill: ", "$$ability"] }
      }
    }
  }
}

// $reduce - Aggregate array values
{
  $project: {
    totalDamage: {
      $reduce: {
        input: "$incidents",
        initialValue: 0,
        in: { $add: ["$$value", "$$this.damage"] }
      }
    }
  }
}
```

**7. Conditional Expressions**

```javascript
// $cond - If/else logic
{
  $project: {
    urgency: {
      $cond: {
        if: { $gte: ["$severity", 8] },
        then: "critical",
        else: {
          $cond: {
            if: { $gte: ["$severity", 5] },
            then: "high",
            else: "normal"
          }
        }
      }
    }
  }
}

// $switch - Multiple conditions
{
  $project: {
    statusLabel: {
      $switch: {
        branches: [
          { case: { $eq: ["$status", "active"] }, then: "Operational" },
          { case: { $eq: ["$status", "missing"] }, then: "Missing in Action" },
          { case: { $eq: ["$status", "endangered"] }, then: "At Risk" }
        ],
        default: "Unknown"
      }
    }
  }
}
```

**8. Date Operations**

```javascript
// Extract date parts
{
  $project: {
    year: { $year: "$timestamp" },
    month: { $month: "$timestamp" },
    day: { $dayOfMonth: "$timestamp" },
    hour: { $hour: "$timestamp" },
    dayOfWeek: { $dayOfWeek: "$timestamp" }
  }
}

// Format dates
{
  $project: {
    formattedDate: {
      $dateToString: {
        format: "%Y-%m-%d %H:%M",
        date: "$timestamp"
      }
    }
  }
}

// Calculate time differences
{
  $project: {
    hoursSince: {
      $divide: [
        { $subtract: [new Date(), "$timestamp"] },
        1000 * 60 * 60  // milliseconds to hours
      ]
    }
  }
}
```

**9. String Operations**

```javascript
{
  $project: {
    fullName: { $concat: ["$firstName", " ", "$lastName"] },
    upperName: { $toUpper: "$name" },
    lowerName: { $toLower: "$name" },
    nameLength: { $strLenCP: "$name" },
    substring: { $substr: ["$description", 0, 100] }
  }
}
```

**10. Mathematical Operations**

```javascript
{
  $project: {
    total: { $add: ["$price", "$tax"] },
    discount: { $subtract: ["$price", "$salePrice"] },
    totalCost: { $multiply: ["$quantity", "$price"] },
    average: { $divide: ["$total", "$count"] },
    power: { $pow: ["$base", 2] },
    rounded: { $round: ["$value", 2] }
  }
}
```

#### Advanced Concepts

**1. $lookup with Pipeline**
```javascript
{
  $lookup: {
    from: "status_reports",
    let: { charId: "$_id" },
    pipeline: [
      {
        $match: {
          $expr: { $eq: ["$character_id", "$$charId"] }
        }
      },
      { $sort: { timestamp: -1 } },
      { $limit: 1 }
    ],
    as: "latestReport"
  }
}
```

**2. $facet - Parallel Pipelines**
```javascript
{
  $facet: {
    byType: [
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ],
    topThreats: [
      { $sort: { threat_level: -1 } },
      { $limit: 5 }
    ],
    statusBreakdown: [
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]
  }
}
```

**3. $bucket - Group into Ranges**
```javascript
{
  $bucket: {
    groupBy: "$power_level",
    boundaries: [0, 3, 5, 7, 10, 11],
    default: "Unknown",
    output: {
      count: { $sum: 1 },
      characters: { $push: "$name" }
    }
  }
}
```

**4. Indexing Strategies**
```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Text index for search
db.creatures.createIndex({ name: "text", description: "text" })

// TTL index (auto-delete after time)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

**5. Performance Optimization**
- Place `$match` early to filter documents
- Use `$project` early to reduce document size
- Create indexes for fields used in `$match`
- Use `$group` before `$lookup` when possible
- Use `$limit` early when you only need top N results

---

### 6.2 Advanced MongoDB  Questions & Answers

#### Aggregation Framework

**Q1: What is the MongoDB Aggregation Framework and how does it differ from simple queries?**

**Answer:**
The Aggregation Framework is MongoDB's data processing pipeline that allows you to transform, filter, group, and analyze documents through a series of stages.

**Differences from simple queries:**
- **Simple queries** (`find()`) return documents as-is
- **Aggregation** can transform documents, compute new fields, join collections, and perform complex analytics
- Aggregation supports multi-stage processing, while `find()` is single-stage
- Aggregation can return computed results (counts, averages, grouped data)

```javascript
// Simple query - returns documents
db.characters.find({ status: "active" })

// Aggregation - transforms and analyzes
db.characters.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

---

**Q2: Explain the difference between $match and $group stages.**

**Answer:**

| `$match` | `$group` |
|----------|----------|
| Filters documents (like WHERE) | Aggregates documents (like GROUP BY) |
| Returns individual documents | Returns grouped/aggregated results |
| Can use indexes | Cannot use indexes directly |
| Place early in pipeline | Usually after $match |
| Output: Same structure, fewer docs | Output: Different structure, grouped data |

```javascript
// $match - filters
{ $match: { status: "active" } }
// Input: 100 docs → Output: 50 docs (same structure)

// $group - aggregates
{ $group: { _id: "$team", count: { $sum: 1 } } }
// Input: 50 docs → Output: 5 docs (different structure)
```

---

**Q3: What is $lookup and how does it differ from SQL JOINs?**

**Answer:**
`$lookup` performs a left outer join between collections. It's similar to SQL's LEFT OUTER JOIN but with some differences:

**Key Differences:**
- **SQL JOIN**: Combines rows into a single row
- **MongoDB $lookup**: Adds matched documents as an array field
- **SQL**: Can do INNER, LEFT, RIGHT, FULL joins
- **MongoDB**: Only LEFT OUTER JOIN (all docs from left collection)

```javascript
// Basic $lookup
{
  $lookup: {
    from: "locations",           // Collection to join
    localField: "location_id",   // Field in current collection
    foreignField: "_id",         // Field in joined collection
    as: "location"               // Output array name
  }
}

// After $lookup, you get:
// { _id: 1, name: "Eleven", location: [{ name: "Hawkins Lab" }] }
// Need $unwind to flatten: { _id: 1, name: "Eleven", location: { name: "Hawkins Lab" } }
```

**Advanced $lookup with pipeline:**
```javascript
{
  $lookup: {
    from: "status_reports",
    let: { charId: "$_id" },
    pipeline: [
      { $match: { $expr: { $eq: ["$character_id", "$$charId"] } } },
      { $sort: { timestamp: -1 } },
      { $limit: 1 }
    ],
    as: "latestReport"
  }
}
```

---

**Q4: What is $facet and when would you use it?**

**Answer:**
`$facet` runs multiple independent pipelines in parallel on the same input documents. Each facet produces its own result array.

**Use Cases:**
- Dashboard queries (multiple metrics in one call)
- Search result facets (counts by category, price ranges, etc.)
- Multi-dimensional analysis
- Reducing round trips to database

```javascript
{
  $facet: {
    byType: [
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ],
    topThreats: [
      { $sort: { threat_level: -1 } },
      { $limit: 5 }
    ],
    statusBreakdown: [
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]
  }
}

// Output:
{
  byType: [{ _id: "predator", count: 4 }],
  topThreats: [{ name: "Mind Flayer", threat_level: 10 }],
  statusBreakdown: [{ _id: "active", count: 7 }]
}
```

**Benefits:**
- Single database call instead of multiple
- All facets use same input data (consistent snapshot)
- Better performance than multiple separate queries

---

**Q5: Explain $unwind and when you need preserveNullAndEmptyArrays.**

**Answer:**
`$unwind` deconstructs an array field, creating one document per array element.

```javascript
// Before $unwind
{ name: "Eleven", abilities: ["telekinesis", "remote viewing"] }

// After $unwind
{ name: "Eleven", abilities: "telekinesis" }
{ name: "Eleven", abilities: "remote viewing" }
```

**preserveNullAndEmptyArrays:**
- **Default (false)**: Documents with null/empty arrays are removed
- **true**: Documents with null/empty arrays are preserved (with null value)

```javascript
// Without preserveNullAndEmptyArrays
{ name: "Mike", abilities: [] }  // This document is REMOVED

// With preserveNullAndEmptyArrays: true
{
  $unwind: {
    path: "$abilities",
    preserveNullAndEmptyArrays: true
  }
}
// { name: "Mike", abilities: null }  // This document is KEPT
```

**When to use preserveNullAndEmptyArrays:**
- When you need to keep documents that don't have the array field
- When doing LEFT JOIN-like operations
- When you want to count documents with/without certain arrays

---

**Q6: What is the difference between $addFields and $project?**

**Answer:**

| `$addFields` | `$project` |
|-------------|------------|
| Adds new fields | Can add, remove, or reshape fields |
| Keeps all existing fields | Must explicitly include fields (or exclude with 0) |
| Cannot remove fields | Can remove fields by setting to 0 |
| Simpler syntax for adding | More control over output shape |

```javascript
// $addFields - adds fields, keeps all existing
{
  $addFields: {
    riskScore: { $multiply: ["$severity", "$casualties"] },
    isCritical: { $gte: ["$severity", 8] }
  }
}
// Output: All original fields + riskScore + isCritical

// $project - can reshape completely
{
  $project: {
    name: 1,                    // Include
    _id: 0,                     // Exclude
    riskScore: { $multiply: ["$severity", "$casualties"] },
    // All other fields are EXCLUDED unless specified
  }
}
// Output: Only name + riskScore
```

**When to use each:**
- `$addFields`: When you want to add computed fields but keep all existing data
- `$project`: When you want to control exactly what fields appear in output

---

**Q7: How do you optimize aggregation pipeline performance?**

**Answer:**

**1. Place $match early:**
```javascript
// GOOD
[
  { $match: { status: "active" } },  // Filter first (uses index)
  { $lookup: { ... } }               // Fewer documents to join
]

// BAD
[
  { $lookup: { ... } },              // Joins all documents
  { $match: { status: "active" } }   // Filter after
]
```

**2. Use $project early:**
```javascript
// Remove unneeded fields early to reduce memory
[
  { $match: { ... } },
  { $project: { name: 1, status: 1 } },  // Reduce document size
  { $group: { ... } }                    // Less data to process
]
```

**3. Create indexes for $match:**
```javascript
// If you frequently filter by status and timestamp
db.collection.createIndex({ status: 1, timestamp: -1 })

// Then $match can use index
{ $match: { status: "active", timestamp: { $gte: date } } }
```

**4. $group before $lookup:**
```javascript
// GOOD - reduce documents before expensive join
[
  { $match: { ... } },
  { $group: { _id: "$location_id", count: { $sum: 1 } } },
  { $lookup: { from: "locations", ... } }  // Join fewer documents
]
```

**5. Use $limit early:**
```javascript
// If you only need top 10
[
  { $match: { ... } },
  { $sort: { score: -1 } },
  { $limit: 10 },                    // Limit before expensive operations
  { $lookup: { ... } }
]
```

**6. Use explain() to analyze:**
```javascript
db.collection.aggregate([...]).explain("executionStats")

// Check for:
// - IXSCAN vs COLLSCAN (index scan vs collection scan)
// - totalDocsExamined vs nReturned ratio
// - executionTimeMillis
```

---

**Q8: What is $bucket and how does it differ from $group?**

**Answer:**

| `$bucket` | `$group` |
|-----------|----------|
| Groups numeric values into predefined ranges | Groups by any field/value |
| Creates histogram-like distributions | More flexible grouping |
| Requires boundaries array | No boundaries needed |
| Automatically handles ranges | Manual range logic needed |

```javascript
// $bucket - automatic range grouping
{
  $bucket: {
    groupBy: "$power_level",
    boundaries: [0, 3, 5, 7, 10, 11],  // Ranges: 0-2, 3-4, 5-6, 7-9, 10
    default: "Unknown",
    output: {
      count: { $sum: 1 },
      characters: { $push: "$name" }
    }
  }
}
// Output: [{ _id: 0, count: 2 }, { _id: 3, count: 8 }, ...]

// $group - manual grouping
{
  $group: {
    _id: {
      $cond: {
        if: { $lt: ["$power_level", 3] },
        then: "Low",
        else: {
          $cond: {
            if: { $lt: ["$power_level", 5] },
            then: "Medium",
            else: "High"
          }
        }
      }
    },
    count: { $sum: 1 }
  }
}
```

**$bucketAuto** - Let MongoDB determine boundaries:
```javascript
{
  $bucketAuto: {
    groupBy: "$age",
    buckets: 4,  // Create 4 equal-sized buckets
    output: {
      count: { $sum: 1 },
      avgPower: { $avg: "$power_level" }
    }
  }
}
```

---

**Q9: How do you handle array operations in aggregation?**

**Answer:**

**1. $unwind - Expand arrays:**
```javascript
// One doc with array → multiple docs
{ $unwind: "$abilities" }
```

**2. $filter - Filter array elements:**
```javascript
{
  $project: {
    criticalReports: {
      $filter: {
        input: "$reports",
        as: "report",
        cond: { $eq: ["$$report.priority", "critical"] }
      }
    }
  }
}
```

**3. $map - Transform array elements:**
```javascript
{
  $project: {
    formattedAbilities: {
      $map: {
        input: "$abilities",
        as: "ability",
        in: { $concat: ["Skill: ", "$$ability"] }
      }
    }
  }
}
```

**4. $reduce - Aggregate array values:**
```javascript
{
  $project: {
    totalDamage: {
      $reduce: {
        input: "$incidents",
        initialValue: 0,
        in: { $add: ["$$value", "$$this.damage"] }
      }
    }
  }
}
```

**5. $size - Get array length:**
```javascript
{
  $project: {
    abilityCount: { $size: "$abilities" }
  }
}
```

**6. $slice - Get subset of array:**
```javascript
{
  $project: {
    recentReports: { $slice: ["$reports", -5] }  // Last 5
  }
}
```

---

**Q10: What are accumulator operators and when are they used?**

**Answer:**
Accumulator operators are used in `$group` stage to compute aggregated values across documents in a group.

**Common Accumulators:**

| Operator | Purpose | Example |
|----------|---------|---------|
| `$sum` | Sum values or count | `{ count: { $sum: 1 } }` |
| `$avg` | Calculate average | `{ avgPower: { $avg: "$power_level" } }` |
| `$min` / `$max` | Find extremes | `{ firstSighting: { $min: "$timestamp" } }` |
| `$first` / `$last` | Get first/last value | `{ latest: { $first: "$reports" } }` |
| `$push` | Collect into array | `{ members: { $push: "$name" } }` |
| `$addToSet` | Collect unique values | `{ uniqueLocations: { $addToSet: "$location_id" } }` |
| `$stdDevPop` / `$stdDevSamp` | Standard deviation | `{ stdDev: { $stdDevPop: "$scores" } }` |

**Example:**
```javascript
{
  $group: {
    _id: "$team",
    totalMembers: { $sum: 1 },                    // Count
    avgPower: { $avg: "$power_level" },           // Average
    strongest: { $max: "$power_level" },          // Maximum
    weakest: { $min: "$power_level" },           // Minimum
    memberNames: { $push: "$name" },             // Array of all names
    uniqueLocations: { $addToSet: "$location_id" }, // Unique locations
    firstMember: { $first: "$name" }              // First document's name
  }
}
```

**Note:** Accumulators can only be used in `$group` and `$bucket` stages, not in `$project`.

---

#### Indexing & Performance

**Q11: What types of indexes does MongoDB support?**

**Answer:**

**1. Single Field Index:**
```javascript
db.collection.createIndex({ name: 1 })  // Ascending
db.collection.createIndex({ age: -1 })  // Descending
```

**2. Compound Index:**
```javascript
db.collection.createIndex({ status: 1, timestamp: -1 })
// Order matters! Use for queries like:
// { status: "active", timestamp: { $gte: date } }
```

**3. Multikey Index (Arrays):**
```javascript
// Automatically created for array fields
db.characters.createIndex({ abilities: 1 })
// Can use: { abilities: "telekinesis" }
```

**4. Text Index:**
```javascript
db.creatures.createIndex({ name: "text", description: "text" })
// Search: { $text: { $search: "demogorgon hunter" } }
```

**5. Geospatial Index:**
```javascript
db.locations.createIndex({ coordinates: "2dsphere" })
// Query: { coordinates: { $near: { $geometry: {...}, $maxDistance: 1000 } } }
```

**6. Hashed Index:**
```javascript
db.collection.createIndex({ _id: "hashed" })
// Used for sharding
```

**7. TTL Index:**
```javascript
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
// Automatically deletes documents after 1 hour
```

**8. Partial Index:**
```javascript
db.characters.createIndex(
  { name: 1 },
  { partialFilterExpression: { status: "active" } }
)
// Only indexes documents where status is "active"
```

**9. Sparse Index:**
```javascript
db.characters.createIndex({ email: 1 }, { sparse: true })
// Only indexes documents that have the email field
```

---

**Q12: Explain index intersection and when it's used.**

**Answer:**
Index intersection allows MongoDB to use multiple indexes to satisfy a query when a single compound index doesn't exist.

**Example:**
```javascript
// Two separate indexes
db.collection.createIndex({ status: 1 })
db.collection.createIndex({ timestamp: -1 })

// Query uses both indexes
db.collection.find({ status: "active", timestamp: { $gte: date } })
// MongoDB can intersect results from both indexes
```

**When it happens:**
- Query uses multiple fields
- Each field has its own index
- No compound index exists for the combination

**Limitations:**
- Less efficient than compound index
- Only works with equality conditions (not range queries on multiple fields)
- MongoDB prefers compound index if available

**Best Practice:**
Create compound index for common query patterns:
```javascript
// Better than index intersection
db.collection.createIndex({ status: 1, timestamp: -1 })
```

---

**Q13: What is the difference between IXSCAN and COLLSCAN in explain() output?**

**Answer:**

| IXSCAN (Index Scan) | COLLSCAN (Collection Scan) |
|---------------------|----------------------------|
| Uses index to find documents | Scans entire collection |
| Fast (logarithmic time) | Slow (linear time) |
| Efficient for large collections | Inefficient for large collections |
| Uses B-tree structure | Reads every document |

**Example explain() output:**
```javascript
db.collection.find({ status: "active" }).explain("executionStats")

// GOOD - Uses index
{
  "stage": "IXSCAN",
  "indexName": "status_1",
  "executionTimeMillis": 5,
  "totalDocsExamined": 100,
  "nReturned": 100
}

// BAD - Collection scan
{
  "stage": "COLLSCAN",
  "executionTimeMillis": 5000,
  "totalDocsExamined": 1000000,
  "nReturned": 100
}
```

**How to fix COLLSCAN:**
1. Create index on queried field
2. Ensure query can use index (avoid functions on indexed field)
3. Check index is actually used (verify with explain())

---

#### Schema Design

**Q14: When should you embed documents vs. reference them?**

**Answer:**

**Embed (One-to-Few):**
- Small, bounded arrays (typically < 100 items)
- Data accessed together
- Data doesn't change independently
- One-to-one or one-to-few relationships

```javascript
// GOOD for embedding
{
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing"],  // Small array
  stats: {                                       // One-to-one
    power_level: 10,
    health: 100
  }
}
```

**Reference (One-to-Many, Many-to-Many):**
- Large, unbounded arrays
- Data accessed independently
- Data changes frequently
- Many-to-many relationships
- Need to query referenced documents independently

```javascript
// GOOD for referencing
{
  name: "Eleven",
  character_id: ObjectId("...")
}

// In separate collection
{
  character_id: ObjectId("..."),
  timestamp: ISODate("..."),
  report: "..."
}
```

**Decision Matrix:**

| Factor | Embed | Reference |
|--------|-------|-----------|
| Array size | < 100 items | > 100 items |
| Access pattern | Always together | Sometimes separate |
| Update frequency | Rare | Frequent |
| Growth | Bounded | Unbounded |
| Query needs | Simple | Complex joins needed |

---

**Q15: What is the difference between normalized and denormalized schemas in MongoDB?**

**Answer:**

**Normalized Schema (References):**
- Data stored in separate collections
- References used to link documents
- Similar to relational databases
- Reduces duplication
- Requires joins ($lookup) to combine data

```javascript
// Normalized
// characters collection
{ _id: 1, name: "Eleven", location_id: ObjectId("loc1") }

// locations collection
{ _id: ObjectId("loc1"), name: "Hawkins Lab", danger_level: 8 }

// Need $lookup to combine
db.characters.aggregate([
  { $lookup: { from: "locations", localField: "location_id", foreignField: "_id", as: "location" } }
])
```

**Denormalized Schema (Embedded):**
- Related data stored in same document
- Duplication of data
- Faster reads (no joins needed)
- Slower writes (update multiple documents)
- Better for read-heavy workloads

```javascript
// Denormalized
{
  _id: 1,
  name: "Eleven",
  location: {
    name: "Hawkins Lab",
    danger_level: 8,
    dimension: "normal"
  }
}
// No join needed, but if location changes, must update all character docs
```

**When to use each:**
- **Normalized**: Write-heavy, data changes frequently, need consistency
- **Denormalized**: Read-heavy, data rarely changes, need performance

---

#### Transactions & Consistency

**Q16: How do transactions work in MongoDB?**

**Answer:**
MongoDB supports multi-document ACID transactions (since version 4.0 for replica sets, 4.2 for sharded clusters).

**Basic Transaction:**
```javascript
const session = client.startSession();

try {
  session.startTransaction();
  
  await db.collection1.insertOne({ name: "Eleven" }, { session });
  await db.collection2.updateOne(
    { _id: locationId },
    { $inc: { character_count: 1 } },
    { session }
  );
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

**Transaction Options:**
```javascript
// Read concern
session.startTransaction({ readConcern: { level: "snapshot" } });

// Write concern
session.commitTransaction({ writeConcern: { w: "majority" } });
```

**Limitations:**
- Collections must be in same replica set or shard
- Some operations cannot be in transactions (createIndex, dropCollection)
- Performance overhead (use sparingly)
- Maximum transaction time (default 60 seconds)

---

**Q17: What are read and write concerns in MongoDB?**

**Answer:**

**Read Concern:**
Controls what data a read operation can see.

```javascript
// Levels:
// "local" - Default, may see uncommitted data
// "majority" - Only see data committed to majority
// "snapshot" - Consistent snapshot (transactions)
// "linearizable" - Strongest consistency

db.collection.find({}).readConcern("majority")
```

**Write Concern:**
Controls acknowledgment requirements for write operations.

```javascript
// Levels:
// { w: 1 } - Acknowledge after writing to primary (default)
// { w: "majority" } - Acknowledge after majority of nodes
// { w: 2 } - Acknowledge after 2 nodes
// { j: true } - Wait for journal commit
// { wtimeout: 5000 } - Timeout in milliseconds

db.collection.insertOne({ name: "Eleven" }, {
  writeConcern: { w: "majority", j: true, wtimeout: 5000 }
})
```

**Use Cases:**
- **Read Concern "majority"**: Critical reads that must see committed data
- **Write Concern "majority"**: Critical writes that must be durable
- **Read Concern "snapshot"**: Transactions requiring consistent view

---

#### Sharding & Scalability

**Q18: What is sharding in MongoDB and when should you use it?**

**Answer:**
Sharding is MongoDB's method for distributing data across multiple machines (shards) to support horizontal scaling.

**When to Shard:**
- Collection size approaching single server limits
- High write throughput exceeding single server capacity
- Need geographic distribution
- Memory requirements exceed available RAM

**Sharding Components:**
1. **Shards**: MongoDB instances holding subset of data
2. **Config Servers**: Store cluster metadata
3. **Mongos**: Router that routes queries to appropriate shards

**Shard Key:**
```javascript
// Choose shard key carefully
sh.shardCollection("db.collection", { user_id: 1, timestamp: -1 })

// Good shard key:
// - High cardinality (many unique values)
// - Even distribution
// - Used in most queries

// Bad shard key:
// - Low cardinality (few unique values)
// - Skewed distribution
// - Not used in queries
```

**Challenges:**
- Shard key cannot be changed after sharding
- Some queries may hit all shards (scatter-gather)
- Balancing requires careful planning

---

**Q19: What is a replica set and how does it provide high availability?**

**Answer:**
A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability.

**Replica Set Members:**
1. **Primary**: Handles all writes and reads (by default)
2. **Secondaries**: Replicate data from primary, can handle reads
3. **Arbiter**: Votes in elections but doesn't hold data

**High Availability Features:**
- **Automatic Failover**: If primary fails, secondaries elect new primary
- **Data Redundancy**: Multiple copies of data
- **Read Scaling**: Distribute reads across secondaries

```javascript
// Read from secondary
db.collection.find({}).readPref("secondary")

// Read preference options:
// "primary" - Default, read from primary
// "primaryPreferred" - Primary, fallback to secondary
// "secondary" - Read from secondary
// "secondaryPreferred" - Secondary, fallback to primary
// "nearest" - Lowest latency
```

**Election Process:**
- Requires majority of voting members
- New primary elected automatically
- Typically completes in < 12 seconds

---

#### Advanced Topics

**Q20: How do you perform text search in MongoDB?**

**Answer:**

**1. Create Text Index:**
```javascript
db.creatures.createIndex({
  name: "text",
  description: "text",
  tags: "text"
})
```

**2. Search:**
```javascript
// Basic search
db.creatures.find({ $text: { $search: "demogorgon hunter" } })

// With score
db.creatures.aggregate([
  { $match: { $text: { $search: "demogorgon" } } },
  { $addFields: { score: { $meta: "textScore" } } },
  { $sort: { score: -1 } }
])

// Language-specific
db.creatures.createIndex(
  { description: "text" },
  { default_language: "english" }
)
```

**3. Text Search Operators:**
```javascript
// Phrase search
{ $text: { $search: "\"demogorgon hunter\"" } }

// Exclude terms
{ $text: { $search: "demogorgon -hunter" } }

// Language
{ $text: { $search: "demogorgon", $language: "en" } }
```

**Limitations:**
- One text index per collection
- Case-insensitive
- Language-specific stemming
- No phrase proximity matching

---

**Q21: What is change streams and how do you use it?**

**Answer:**
Change streams allow applications to access real-time data changes without polling.

**Basic Usage:**
```javascript
const changeStream = db.collection.watch();

changeStream.on('change', (change) => {
  console.log(change);
  // {
  //   _id: { ... },
  //   operationType: 'insert',
  //   fullDocument: { ... },
  //   ...
  // }
});
```

**Filter Changes:**
```javascript
const pipeline = [
  { $match: { 'fullDocument.status': 'active' } }
];

const changeStream = db.collection.watch(pipeline);
```

**Operation Types:**
- `insert`
- `update`
- `replace`
- `delete`
- `invalidate` (collection/database dropped)

**Use Cases:**
- Real-time notifications
- Cache invalidation
- Data synchronization
- Audit logging
- Event-driven architectures

---

**Q22: Explain the difference between $expr and regular query operators.**

**Answer:**

**Regular Query Operators:**
- Compare field values to constants
- Cannot compare two fields
- Use indexes efficiently

```javascript
// Regular - compares field to constant
{ power_level: { $gt: 5 } }
{ status: { $in: ["active", "missing"] } }
```

**$expr:**
- Allows field-to-field comparisons
- Can use aggregation expressions
- May not use indexes efficiently

```javascript
// $expr - compares two fields
{ $expr: { $gt: ["$power_level", "$threat_level"] } }
{ $expr: { $eq: ["$location_id", "$home_location"] } }

// Complex expressions
{
  $expr: {
    $and: [
      { $gt: ["$power_level", 5] },
      { $lt: ["$age", "$max_age"] }
    ]
  }
}
```

**When to use $expr:**
- Need to compare two fields
- Complex conditional logic
- When regular operators aren't sufficient

**Performance Note:**
- `$expr` may not use indexes
- Prefer regular operators when possible
- Use `$expr` only when necessary

---

**Q23: How do you handle time-series data in MongoDB?**

**Answer:**

**Time-Series Collections (MongoDB 5.0+):**
```javascript
// Create time-series collection
db.createCollection("sensor_data", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensor_id",
    granularity: "hours"
  }
})

// Insert data
db.sensor_data.insertMany([
  { timestamp: ISODate("2024-01-01"), sensor_id: "sensor1", value: 25.5 },
  { timestamp: ISODate("2024-01-01"), sensor_id: "sensor2", value: 30.2 }
])
```

**Benefits:**
- Optimized storage (compression)
- Faster queries on time ranges
- Automatic bucketing
- Better performance for time-based analytics

**Querying:**
```javascript
// Efficient time-range queries
db.sensor_data.find({
  timestamp: { $gte: startDate, $lte: endDate },
  sensor_id: "sensor1"
})
```

**Aggregation:**
```javascript
// Group by time intervals
db.sensor_data.aggregate([
  {
    $group: {
      _id: {
        $dateTrunc: {
          date: "$timestamp",
          unit: "hour"
        }
      },
      avgValue: { $avg: "$value" }
    }
  }
])
```

---

**Q24: What is the difference between $merge and $out stages?**

**Answer:**

| `$out` | `$merge` |
|--------|----------|
| Replaces entire collection | Can insert, merge, or replace documents |
| Destructive (drops collection) | Non-destructive |
| Simple output | Flexible merge strategies |
| Cannot specify database | Can specify database and collection |

**$out:**
```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  { $out: "team_stats" }  // Replaces team_stats collection
])
```

**$merge:**
```javascript
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$team", count: { $sum: 1 } } },
  {
    $merge: {
      into: "team_stats",
      whenMatched: "replace",  // or "merge", "keepExisting", "fail"
      whenNotMatched: "insert"
    }
  }
])
```

**Merge Strategies:**
- `replace`: Replace matched document
- `merge`: Merge fields (like $set)
- `keepExisting`: Keep existing, ignore new
- `fail`: Error if document exists
- `pipeline`: Custom merge logic

**Use Cases:**
- `$out`: One-time reports, complete replacement
- `$merge`: Incremental updates, data synchronization

---

**Q25: How do you handle geospatial queries in MongoDB?**

**Answer:**

**1. Create Geospatial Index:**
```javascript
// 2dsphere index (for GeoJSON)
db.locations.createIndex({ coordinates: "2dsphere" })

// 2d index (for legacy coordinates)
db.locations.createIndex({ coordinates: "2d" })
```

**2. GeoJSON Format:**
```javascript
{
  name: "Hawkins Lab",
  coordinates: {
    type: "Point",
    coordinates: [-87.6298, 41.8781]  // [longitude, latitude]
  }
}
```

**3. Query Operators:**
```javascript
// $near - Find nearest points
db.locations.find({
  coordinates: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      },
      $maxDistance: 1000  // meters
    }
  }
})

// $geoWithin - Find points within area
db.locations.find({
  coordinates: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[...]]
      }
    }
  }
})

// $geoIntersects - Find geometries that intersect
db.locations.find({
  coordinates: {
    $geoIntersects: {
      $geometry: {
        type: "LineString",
        coordinates: [[...]]
      }
    }
  }
})
```

**4. Aggregation:**
```javascript
db.locations.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      },
      distanceField: "distance",
      maxDistance: 5000,
      spherical: true
    }
  },
  { $sort: { distance: 1 } },
  { $limit: 10 }
])
```

---

### Summary of MongoDB Concepts

This project covers:

**Core Concepts:**
- Aggregation Framework and pipeline stages
- Query operators and expressions
- Indexing strategies
- Schema design patterns

**Advanced Topics:**
- $lookup joins and relationships
- $facet parallel pipelines
- Array operations
- Performance optimization
- Transactions and consistency
- Sharding and scalability
- Text search and geospatial queries

**Real-World Applications:**
- Analytics dashboards
- Data transformation
- Multi-collection queries
- Time-series data
- Search functionality

---

## 7. Complete MongoDB  Questions

This section contains 100 comprehensive MongoDB  questions organized by topic, covering everything from fundamentals to advanced concepts.

---

### 7.1 MongoDB Fundamentals (Questions 1-10)

#### Q1: What is MongoDB and what are its main features?

**Answer:**
MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents called BSON (Binary JSON).

**Main Features:**
1. **Document-Oriented**: Data stored as documents (not rows/columns)
2. **Schema Flexibility**: No fixed schema, documents can have different structures
3. **Horizontal Scalability**: Sharding for distributing data across servers
4. **High Availability**: Replica sets for automatic failover
5. **Rich Query Language**: Supports complex queries, aggregations, text search
6. **Indexing**: Supports various index types (single, compound, text, geospatial)
7. **Aggregation Framework**: Powerful data processing pipeline
8. **GridFS**: Store files larger than 16MB
9. **ACID Transactions**: Multi-document transactions (since v4.0)
10. **Ad Hoc Queries**: Support for field, range, and regular expression queries

**Use Cases:**
- Content management systems
- Real-time analytics
- Mobile applications
- Internet of Things (IoT)
- Gaming applications
- E-commerce platforms

---

#### Q2: How does MongoDB differ from relational databases?

**Answer:**

| MongoDB (NoSQL) | Relational Databases (SQL) |
|-----------------|----------------------------|
| Document-oriented | Table-oriented |
| Schema-less/flexible | Fixed schema |
| Stores JSON-like documents | Stores rows and columns |
| No joins (uses $lookup instead) | Uses SQL JOINs |
| Horizontal scaling (sharding) | Primarily vertical scaling |
| Denormalized data | Normalized data |
| Embedded documents | Foreign keys and relationships |
| Dynamic queries | Structured Query Language (SQL) |
| Better for unstructured data | Better for structured data |

**Key Differences:**

**1. Data Model:**
```javascript
// MongoDB - Document
{
  _id: ObjectId("..."),
  name: "Eleven",
  abilities: ["telekinesis", "remote viewing"],
  stats: { power_level: 10, health: 100 }
}

// SQL - Tables
// characters table: id, name
// abilities table: character_id, ability
// stats table: character_id, power_level, health
```

**2. Relationships:**
- **MongoDB**: Embedding or referencing (manual)
- **SQL**: Foreign keys and JOINs (automatic)

**3. Scalability:**
- **MongoDB**: Built for horizontal scaling
- **SQL**: Primarily vertical scaling

**4. Transactions:**
- **MongoDB**: Multi-document transactions (since v4.0)
- **SQL**: ACID transactions from the start

---

#### Q3: Can you describe the structure of data in MongoDB?

**Answer:**
MongoDB uses a hierarchical structure:

```
Database
  └── Collection (like a table)
      └── Document (like a row)
          └── Field (like a column)
```

**1. Database:**
- Container for collections
- Can have multiple databases
- Example: `hawkins_db`, `analytics_db`

**2. Collection:**
- Group of documents
- Similar to a table in SQL
- No fixed schema
- Example: `characters`, `sightings`, `locations`

**3. Document:**
- Basic unit of data
- JSON-like structure (BSON)
- Can contain nested documents and arrays
- Example:
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Eleven",
  age: 14,
  abilities: ["telekinesis", "remote viewing"],
  location: {
    name: "Hawkins Lab",
    coordinates: [-87.6298, 41.8781]
  }
}
```

**4. Field:**
- Key-value pair in a document
- Can be any BSON data type
- Example: `name: "Eleven"`, `age: 14`

**BSON Data Types:**
- String, Integer, Double, Boolean
- Date, ObjectId, Null
- Array, Embedded Document
- Binary Data, Code, Regular Expression

---

#### Q4: What is a Document in MongoDB?

**Answer:**
A document is the basic unit of data in MongoDB, stored in BSON (Binary JSON) format.

**Characteristics:**
1. **Key-Value Pairs**: Field names and values
2. **Ordered**: Fields maintain insertion order
3. **Dynamic Schema**: Documents in same collection can have different fields
4. **Nested**: Can contain arrays and embedded documents
5. **Unique _id**: Every document has a unique `_id` field

**Example:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Eleven",
  age: 14,
  status: "active",
  abilities: ["telekinesis", "remote viewing", "dimensional travel"],
  stats: {
    power_level: 10,
    health: 100,
    stamina: 85
  },
  relationships: [
    { name: "Mike", type: "friend" },
    { name: "Hopper", type: "guardian" }
  ],
  last_seen: ISODate("2024-01-15T10:30:00Z")
}
```

**Document Size Limit:**
- Maximum document size: 16MB
- For larger files, use GridFS

**Benefits:**
- Natural mapping to objects in programming languages
- No need for joins (can embed related data)
- Flexible schema allows evolution over time

---

#### Q5: How is data stored in collections in MongoDB?

**Answer:**
Collections are groups of MongoDB documents, similar to tables in relational databases.

**Characteristics:**
1. **No Schema**: Documents in a collection can have different structures
2. **Dynamic Creation**: Created automatically when first document is inserted
3. **Namespace**: `database.collection` (e.g., `hawkins_db.characters`)
4. **No Fixed Structure**: Unlike SQL tables, no predefined columns

**Collection Creation:**
```javascript
// Explicit creation
db.createCollection("characters", {
  capped: false,
  size: 100000,
  max: 5000
})

// Implicit creation (automatic)
db.characters.insertOne({ name: "Eleven" })
// Collection "characters" is created automatically
```

**Collection Types:**
1. **Regular Collections**: Standard collections (default)
2. **Capped Collections**: Fixed-size collections (FIFO)
3. **Views**: Read-only collections based on aggregation pipeline
4. **Time-Series Collections**: Optimized for time-series data (MongoDB 5.0+)

**Capped Collection Example:**
```javascript
db.createCollection("logs", {
  capped: true,
  size: 10000000,  // 10MB
  max: 10000       // Max 10,000 documents
})
// When full, oldest documents are automatically deleted
```

**Best Practices:**
- Use descriptive collection names
- Group related documents together
- Consider collection size and access patterns
- Use indexes for frequently queried fields

---

#### Q6: Describe what a MongoDB database is.

**Answer:**
A MongoDB database is a container for collections, similar to a schema in SQL databases.

**Structure:**
```
MongoDB Instance
  └── Database 1
      └── Collection 1
      └── Collection 2
  └── Database 2
      └── Collection 1
```

**Characteristics:**
1. **Namespace**: Database name + collection name
2. **Isolation**: Data in different databases is isolated
3. **Multiple Databases**: Single MongoDB instance can have multiple databases
4. **Default Database**: `test` (if no database specified)

**Database Operations:**
```javascript
// Switch to database (creates if doesn't exist)
use hawkins_db

// Show current database
db.getName()

// List all databases
show dbs

// Drop database
db.dropDatabase()

// Get database stats
db.stats()
```

**Database Naming:**
- Cannot contain: `/`, `\`, `.`, `"`, `*`, `<`, `>`, `:`, `|`, `?`, `$`, ` ` (space), `\0`
- Case-sensitive
- Max length: 64 bytes

**System Databases:**
- `admin`: Administrative operations
- `local`: Replica set metadata
- `config`: Sharding configuration

**Best Practices:**
- Use descriptive database names
- Separate databases for different applications
- Consider resource limits per database

---

#### Q7: What is the default port on which MongoDB listens?

**Answer:**
MongoDB's default port is **27017**.

**Port Configuration:**
```javascript
// Default connection
mongodb://localhost:27017

// Custom port
mongodb://localhost:30000

// Connection string with port
mongodb://username:password@host:27017/database
```

**Common MongoDB Ports:**
- **27017**: Default MongoDB port
- **27018**: Common alternative for second instance
- **27019**: Common for third instance
- **28017**: HTTP interface (if enabled)

**Changing Default Port:**
```bash
# Command line
mongod --port 30000

# Configuration file (mongod.conf)
net:
  port: 30000
```

**Security Note:**
- Default port is well-known
- Consider changing in production
- Use firewall rules to restrict access
- Enable authentication

---

#### Q8: How does MongoDB provide high availability and disaster recovery?

**Answer:**
MongoDB provides high availability through **Replica Sets** and disaster recovery through **backups** and **replication**.

**1. Replica Sets:**
```javascript
// Replica set with 3 members
{
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb1:27017" },  // Primary
    { _id: 1, host: "mongodb2:27017" },  // Secondary
    { _id: 2, host: "mongodb3:27017" }   // Secondary
  ]
}
```

**Features:**
- **Automatic Failover**: If primary fails, secondary becomes primary (< 12 seconds)
- **Data Redundancy**: Multiple copies of data
- **Read Scaling**: Distribute reads across secondaries
- **Rolling Updates**: Update without downtime

**2. Oplog (Operations Log):**
- Records all write operations
- Used for replication
- Secondaries read from primary's oplog
- Enables point-in-time recovery

**3. Backups:**
```bash
# mongodump - backup
mongodump --host localhost:27017 --db hawkins_db --out /backup

# mongorestore - restore
mongorestore --host localhost:27017 --db hawkins_db /backup/hawkins_db
```

**4. Journaling:**
- Write-ahead logging
- Ensures data durability
- Enables crash recovery

**5. Write Concern:**
```javascript
// Wait for majority of nodes
db.collection.insertOne({ name: "Eleven" }, {
  writeConcern: { w: "majority", j: true }
})
```

**Disaster Recovery Strategy:**
1. Regular backups (daily/hourly)
2. Replica sets in different data centers
3. Test restore procedures
4. Monitor replication lag
5. Document recovery procedures

---

#### Q9: What are indexes in MongoDB, and why are they used?

**Answer:**
Indexes are data structures that improve query performance by allowing MongoDB to find documents without scanning the entire collection.

**Why Use Indexes:**
1. **Performance**: Faster queries (logarithmic vs linear time)
2. **Efficiency**: Reduces disk I/O
3. **Sorting**: Enables efficient sorting operations
4. **Unique Constraints**: Enforce uniqueness
5. **Text Search**: Enable full-text search

**Index Types:**
```javascript
// Single field index
db.characters.createIndex({ name: 1 })

// Compound index
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Text index
db.creatures.createIndex({ name: "text", description: "text" })

// Geospatial index
db.locations.createIndex({ coordinates: "2dsphere" })

// TTL index
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

**Index Impact:**
```javascript
// Without index - COLLSCAN (slow)
db.characters.find({ name: "Eleven" }).explain()
// executionTimeMillis: 5000
// stage: "COLLSCAN"

// With index - IXSCAN (fast)
db.characters.createIndex({ name: 1 })
db.characters.find({ name: "Eleven" }).explain()
// executionTimeMillis: 5
// stage: "IXSCAN"
```

**Trade-offs:**
- **Pros**: Faster queries, efficient sorting
- **Cons**: Slower writes, additional storage space

**Best Practices:**
- Index frequently queried fields
- Index fields used in sorting
- Monitor index usage
- Remove unused indexes
- Consider compound indexes for multi-field queries

---

#### Q10: What is the role of the `_id` field in MongoDB documents?

**Answer:**
The `_id` field is a unique identifier for each document in a MongoDB collection.

**Characteristics:**
1. **Required**: Every document must have an `_id` field
2. **Unique**: Cannot have duplicate `_id` values in a collection
3. **Immutable**: Cannot be changed after document creation
4. **Indexed**: Automatically indexed (primary key)
5. **Default Type**: ObjectId (if not specified)

**ObjectId Structure:**
```
ObjectId: 507f1f77bcf86cd799439011
          └─┬─┘└─┬─┘└─┬─┘└───┬────┘
            │    │    │      └─ Random
            │    │    └─ Process ID
            │    └─ Machine ID
            └─ Timestamp (4 bytes)
```

**Custom _id:**
```javascript
// Use custom _id
db.characters.insertOne({
  _id: "eleven_001",
  name: "Eleven",
  age: 14
})

// Use ObjectId (default)
db.characters.insertOne({
  name: "Mike",
  age: 15
  // _id: ObjectId("...") automatically generated
})
```

**Benefits:**
- Fast lookups (indexed)
- Guaranteed uniqueness
- Can be used for sharding
- Contains timestamp information

**Use Cases:**
- Primary key for documents
- Shard key (in sharded clusters)
- Reference in other documents
- Sorting by insertion time

---

### 7.2 CRUD Operations (Questions 11-20)

#### Q11: How do you create a new MongoDB collection?

**Answer:**
Collections are created automatically when you insert the first document, or you can create them explicitly.

**Method 1: Implicit Creation (Automatic)**
```javascript
// Collection created automatically on first insert
db.characters.insertOne({ name: "Eleven" })
// Collection "characters" is now created
```

**Method 2: Explicit Creation**
```javascript
// Create regular collection
db.createCollection("characters")

// Create with options
db.createCollection("logs", {
  capped: true,           // Fixed-size collection
  size: 10000000,         // 10MB max size
  max: 10000,             // Max 10,000 documents
  autoIndexId: true       // Auto-index _id field
})

// Create time-series collection (MongoDB 5.0+)
db.createCollection("sensor_data", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensor_id",
    granularity: "hours"
  }
})
```

**Collection Options:**
- `capped`: Fixed-size collection (FIFO)
- `size`: Max size in bytes (for capped)
- `max`: Max number of documents (for capped)
- `validator`: Document validation rules
- `timeseries`: Time-series collection options

**Check if Collection Exists:**
```javascript
// List all collections
show collections

// Check specific collection
db.getCollectionNames().includes("characters")
```

---

#### Q12: What is the syntax to insert a document into a MongoDB collection?

**Answer:**
MongoDB provides several methods to insert documents.

**1. insertOne() - Single Document**
```javascript
db.characters.insertOne({
  name: "Eleven",
  age: 14,
  status: "active",
  abilities: ["telekinesis", "remote viewing"]
})
// Returns: { acknowledged: true, insertedId: ObjectId("...") }
```

**2. insertMany() - Multiple Documents**
```javascript
db.characters.insertMany([
  { name: "Eleven", age: 14 },
  { name: "Mike", age: 15 },
  { name: "Dustin", age: 15 }
])
// Returns: { acknowledged: true, insertedIds: [...] }
```

**3. insertMany() with ordered option**
```javascript
// ordered: true (default) - stops on first error
db.characters.insertMany([...], { ordered: true })

// ordered: false - continues after errors
db.characters.insertMany([...], { ordered: false })
```

**4. insert() - Legacy Method**
```javascript
// Single document
db.characters.insert({ name: "Eleven" })

// Multiple documents
db.characters.insert([
  { name: "Mike" },
  { name: "Dustin" }
])
```

**5. Save() - Insert or Update**
```javascript
// If _id exists, updates; otherwise inserts
db.characters.save({
  _id: ObjectId("..."),
  name: "Eleven",
  age: 15  // Updated age
})
```

**Write Concern:**
```javascript
db.characters.insertOne(
  { name: "Eleven" },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 5000
    }
  }
)
```

**Best Practices:**
- Use `insertOne()` for single documents
- Use `insertMany()` for multiple documents
- Use `ordered: false` for bulk inserts when errors are acceptable
- Specify write concern for critical operations

---

#### Q13: Describe how to read data from a MongoDB collection.

**Answer:**
MongoDB provides several methods to read/query documents.

**1. find() - Multiple Documents**
```javascript
// Get all documents
db.characters.find()

// With filter
db.characters.find({ status: "active" })

// With projection (select fields)
db.characters.find(
  { status: "active" },
  { name: 1, age: 1, _id: 0 }  // Include name, age; exclude _id
)

// Pretty print
db.characters.find().pretty()
```

**2. findOne() - Single Document**
```javascript
// Get first matching document
db.characters.findOne({ name: "Eleven" })

// With projection
db.characters.findOne(
  { status: "active" },
  { name: 1, abilities: 1 }
)
```

**3. Query Operators**
```javascript
// Comparison
db.characters.find({ age: { $gt: 15 } })        // Greater than
db.characters.find({ age: { $gte: 14 } })        // Greater than or equal
db.characters.find({ age: { $lt: 18 } })        // Less than
db.characters.find({ age: { $lte: 16 } })        // Less than or equal
db.characters.find({ age: { $ne: 14 } })        // Not equal
db.characters.find({ age: { $in: [14, 15, 16] } })  // In array
db.characters.find({ age: { $nin: [14, 15] } })     // Not in array

// Logical
db.characters.find({
  $or: [
    { status: "active" },
    { status: "missing" }
  ]
})

db.characters.find({
  $and: [
    { age: { $gte: 14 } },
    { status: "active" }
  ]
})

// Element
db.characters.find({ abilities: { $exists: true } })  // Field exists
db.characters.find({ name: { $type: "string" } })     // Type check

// Array
db.characters.find({ abilities: "telekinesis" })       // Array contains
db.characters.find({ abilities: { $size: 3 } })       // Array size
db.characters.find({ abilities: { $all: ["telekinesis", "remote viewing"] } })
```

**4. Cursor Methods**
```javascript
// Limit results
db.characters.find().limit(10)

// Skip documents
db.characters.find().skip(20)

// Sort
db.characters.find().sort({ age: 1 })   // Ascending
db.characters.find().sort({ age: -1 })  // Descending

// Count
db.characters.find({ status: "active" }).count()

// Iterate
const cursor = db.characters.find()
cursor.forEach(doc => print(doc.name))
```

**5. Aggregation for Complex Queries**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $project: { name: 1, age: 1 } },
  { $sort: { age: -1 } },
  { $limit: 10 }
])
```

---

#### Q14: Explain how to update documents in MongoDB.

**Answer:**
MongoDB provides several methods to update documents.

**1. updateOne() - Update Single Document**
```javascript
// Update first matching document
db.characters.updateOne(
  { name: "Eleven" },
  { $set: { age: 15 } }
)

// With upsert (insert if not exists)
db.characters.updateOne(
  { name: "New Character" },
  { $set: { age: 16 } },
  { upsert: true }
)
```

**2. updateMany() - Update Multiple Documents**
```javascript
// Update all matching documents
db.characters.updateMany(
  { status: "active" },
  { $set: { last_updated: new Date() } }
)
```

**3. replaceOne() - Replace Entire Document**
```javascript
// Replace document (keeps _id)
db.characters.replaceOne(
  { name: "Eleven" },
  {
    name: "Eleven",
    age: 15,
    status: "active",
    abilities: ["telekinesis"]
  }
)
```

**4. Update Operators**
```javascript
// $set - Set field value
{ $set: { age: 15, status: "active" } }

// $unset - Remove field
{ $unset: { old_field: "" } }

// $inc - Increment numeric value
{ $inc: { power_level: 1 } }

// $mul - Multiply numeric value
{ $mul: { score: 1.5 } }

// $rename - Rename field
{ $rename: { old_name: "new_name" } }

// $min / $max - Update if new value is min/max
{ $min: { best_score: 100 } }
{ $max: { best_score: 100 } }

// $currentDate - Set to current date
{ $currentDate: { last_modified: true } }

// Array operators
{ $push: { abilities: "new_ability" } }           // Add to array
{ $pull: { abilities: "old_ability" } }           // Remove from array
{ $addToSet: { tags: "new_tag" } }                 // Add if not exists
{ $pop: { abilities: 1 } }                          // Remove first/last
{ $pullAll: { abilities: ["ability1", "ability2"] } } // Remove multiple
```

**5. Update with Conditions**
```javascript
// Update only if condition met
db.characters.updateOne(
  { name: "Eleven", age: { $lt: 15 } },
  { $set: { age: 15 } }
)
```

**6. Array Element Updates**
```javascript
// Update specific array element
db.characters.updateOne(
  { name: "Eleven", "abilities.0": "telekinesis" },
  { $set: { "abilities.0": "enhanced_telekinesis" } }
)

// Update all array elements matching condition
db.characters.updateMany(
  {},
  { $set: { "abilities.$[elem]": "updated" } },
  { arrayFilters: [{ "elem": { $regex: "telekinesis" } }] }
)
```

**Best Practices:**
- Use `$set` to update specific fields
- Use `updateOne()` when updating single document
- Use `updateMany()` when updating multiple documents
- Always specify filter to avoid accidental updates
- Use write concern for critical updates

---

#### Q15: What are the MongoDB commands for deleting documents?

**Answer:**
MongoDB provides methods to delete documents and collections.

**1. deleteOne() - Delete Single Document**
```javascript
// Delete first matching document
db.characters.deleteOne({ name: "Eleven" })

// Returns: { acknowledged: true, deletedCount: 1 }
```

**2. deleteMany() - Delete Multiple Documents**
```javascript
// Delete all matching documents
db.characters.deleteMany({ status: "inactive" })

// Delete all documents in collection
db.characters.deleteMany({})
```

**3. remove() - Legacy Method**
```javascript
// Remove documents (deprecated, use deleteOne/deleteMany)
db.characters.remove({ status: "inactive" })

// Remove single document
db.characters.remove({ name: "Eleven" }, { justOne: true })
```

**4. findOneAndDelete() - Delete and Return**
```javascript
// Delete and return deleted document
db.characters.findOneAndDelete({ name: "Eleven" })
```

**5. Drop Collection - Delete All Documents**
```javascript
// Delete entire collection
db.characters.drop()

// Returns: true if dropped, false if doesn't exist
```

**6. Drop Database - Delete Everything**
```javascript
// Switch to database
use hawkins_db

// Drop database
db.dropDatabase()
```

**Delete with Conditions:**
```javascript
// Delete with query operators
db.characters.deleteMany({
  age: { $lt: 14 },
  status: "inactive"
})

// Delete with logical operators
db.characters.deleteMany({
  $or: [
    { status: "destroyed" },
    { status: "missing", last_seen: { $lt: new Date("2020-01-01") } }
  ]
})
```

**Safety Considerations:**
- Always test delete queries with `find()` first
- Use `deleteOne()` when you only want to delete one document
- Be careful with `deleteMany({})` - deletes all documents
- Consider soft deletes (mark as deleted) instead of hard deletes
- Backup before bulk deletes

**Example Workflow:**
```javascript
// 1. Check what will be deleted
db.characters.find({ status: "inactive" })

// 2. Count documents to be deleted
db.characters.countDocuments({ status: "inactive" })

// 3. Delete
db.characters.deleteMany({ status: "inactive" })
```

---

#### Q16: Can you join two collections in MongoDB? If so, how?

**Answer:**
Yes, MongoDB supports joining collections using the `$lookup` aggregation stage (similar to SQL LEFT OUTER JOIN).

**1. Basic $lookup**
```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",        // Collection to join
      localField: "creature_id", // Field in current collection
      foreignField: "_id",       // Field in joined collection
      as: "creature"             // Output array name
    }
  }
])

// Result: Each sighting document gets a "creature" array
{
  _id: ObjectId("..."),
  creature_id: ObjectId("..."),
  location: "Hawkins",
  creature: [{  // Array of matched documents
    _id: ObjectId("..."),
    name: "Demogorgon",
    threat_level: 9
  }]
}
```

**2. $lookup with $unwind**
```javascript
// Flatten the array result
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",
      localField: "creature_id",
      foreignField: "_id",
      as: "creature"
    }
  },
  {
    $unwind: "$creature"  // Convert array to object
  }
])

// Result: creature is now an object, not array
{
  _id: ObjectId("..."),
  creature_id: ObjectId("..."),
  creature: {
    _id: ObjectId("..."),
    name: "Demogorgon",
    threat_level: 9
  }
}
```

**3. $lookup with Pipeline (Advanced)**
```javascript
db.characters.aggregate([
  {
    $lookup: {
      from: "status_reports",
      let: { charId: "$_id" },  // Variables
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$character_id", "$$charId"] }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 1 }  // Get only latest report
      ],
      as: "latestReport"
    }
  }
])
```

**4. Multiple $lookups (Multiple Joins)**
```javascript
db.sightings.aggregate([
  {
    $lookup: {
      from: "creatures",
      localField: "creature_id",
      foreignField: "_id",
      as: "creature"
    }
  },
  { $unwind: "$creature" },
  {
    $lookup: {
      from: "locations",
      localField: "location_id",
      foreignField: "_id",
      as: "location"
    }
  },
  { $unwind: "$location" }
])
```

**5. $lookup with preserveNullAndEmptyArrays**
```javascript
db.characters.aggregate([
  {
    $lookup: {
      from: "status_reports",
      localField: "_id",
      foreignField: "character_id",
      as: "reports"
    }
  },
  {
    $unwind: {
      path: "$reports",
      preserveNullAndEmptyArrays: true  // Keep characters without reports
    }
  }
])
```

**Differences from SQL JOINs:**
- MongoDB only supports LEFT OUTER JOIN (via $lookup)
- Result is an array (need $unwind to flatten)
- More flexible with pipeline syntax
- Can perform complex filtering in join

**Performance Considerations:**
- $lookup can be expensive
- Place $match before $lookup when possible
- Consider embedding data instead of joining
- Index foreign fields for better performance

---

#### Q17: How do you limit the number of documents returned by a MongoDB query?

**Answer:**
Use the `limit()` method or `$limit` stage in aggregation.

**1. limit() Method**
```javascript
// Limit to 10 documents
db.characters.find({ status: "active" }).limit(10)

// With sort
db.characters.find()
  .sort({ age: -1 })
  .limit(5)  // Top 5 oldest
```

**2. $limit in Aggregation**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $sort: { power_level: -1 } },
  { $limit: 10 }  // Top 10
])
```

**3. Combined with skip() for Pagination**
```javascript
// Page 1 (first 10)
db.characters.find().limit(10).skip(0)

// Page 2 (next 10)
db.characters.find().limit(10).skip(10)

// Page 3 (next 10)
db.characters.find().limit(10).skip(20)

// General pagination function
function getPage(pageNumber, pageSize) {
  return db.characters.find()
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
}
```

**4. Limit in Aggregation with $facet**
```javascript
db.characters.aggregate([
  {
    $facet: {
      top10: [
        { $sort: { power_level: -1 } },
        { $limit: 10 }
      ],
      bottom10: [
        { $sort: { power_level: 1 } },
        { $limit: 10 }
      ]
    }
  }
])
```

**Best Practices:**
- Always use limit() to prevent returning too many documents
- Combine with sort() for top N queries
- Use skip() + limit() for pagination (but be aware of performance)
- For large skips, consider cursor-based pagination instead
- Limit early in aggregation pipeline when possible

**Performance Note:**
- `skip()` can be slow for large offsets
- Consider using range queries instead:
```javascript
// Instead of skip(10000), use:
db.characters.find({ _id: { $gt: lastSeenId } }).limit(10)
```

---

#### Q18: What is the difference between `find()` and `findOne()` in MongoDB?

**Answer:**

| `find()` | `findOne()` |
|----------|-------------|
| Returns cursor (multiple documents) | Returns single document or null |
| Returns all matching documents | Returns first matching document |
| Returns empty array if no match | Returns null if no match |
| Can chain methods (limit, sort, etc.) | Cannot chain (already executed) |
| Lazy evaluation | Immediate execution |
| Use for multiple results | Use when you need one document |

**Examples:**

**find() - Returns Cursor**
```javascript
// Returns cursor (not executed yet)
const cursor = db.characters.find({ status: "active" })

// Execute and get all results
cursor.toArray()

// Iterate
cursor.forEach(doc => print(doc.name))

// Chain methods
db.characters.find({ status: "active" })
  .sort({ age: -1 })
  .limit(10)
  .forEach(doc => print(doc.name))
```

**findOne() - Returns Document**
```javascript
// Returns single document or null
const character = db.characters.findOne({ name: "Eleven" })

// Check if found
if (character) {
  print(character.name)
} else {
  print("Not found")
}

// With projection
const name = db.characters.findOne(
  { name: "Eleven" },
  { name: 1, age: 1, _id: 0 }
)
```

**When to Use Each:**

**Use find() when:**
- You need multiple documents
- You want to chain operations (sort, limit, etc.)
- You're iterating over results
- You need cursor functionality

**Use findOne() when:**
- You only need one document
- You're checking if document exists
- You need immediate result (not cursor)
- You're looking up by unique field (like _id)

**Performance:**
- `findOne()` stops after finding first match (can be faster)
- `find()` continues searching (unless limited)
- Both can use indexes efficiently

---

#### Q19: How can you achieve pagination in MongoDB?

**Answer:**
There are several methods for pagination in MongoDB.

**1. skip() + limit() - Offset Pagination**
```javascript
// Page 1
db.characters.find()
  .skip(0)
  .limit(10)

// Page 2
db.characters.find()
  .skip(10)
  .limit(10)

// Page N
function getPage(page, pageSize = 10) {
  return db.characters.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()
}
```

**Pros:** Simple, works with any query
**Cons:** Slow for large offsets (skip(10000) is expensive)

**2. Cursor-Based Pagination (Recommended)**
```javascript
// First page
const firstPage = db.characters.find()
  .sort({ _id: 1 })
  .limit(10)
  .toArray()

// Next page (using last _id from previous page)
const lastId = firstPage[firstPage.length - 1]._id
const nextPage = db.characters.find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(10)
  .toArray()
```

**Pros:** Fast, consistent (handles new inserts)
**Cons:** Requires sortable unique field

**3. Range-Based Pagination**
```javascript
// Paginate by date range
const pageSize = 10
const startDate = new Date("2024-01-01")

db.events.find({
  timestamp: { $gte: startDate }
})
.sort({ timestamp: 1 })
.limit(pageSize)
```

**4. Aggregation Pagination**
```javascript
db.characters.aggregate([
  { $match: { status: "active" } },
  { $sort: { age: -1 } },
  { $skip: 20 },
  { $limit: 10 },
  { $project: { name: 1, age: 1 } }
])
```

**5. Total Count for UI**
```javascript
// Get total count
const total = db.characters.countDocuments({ status: "active" })

// Get page
const page = db.characters.find({ status: "active" })
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize)
  .toArray()

// Return with metadata
{
  data: page,
  pagination: {
    page: pageNum,
    pageSize: pageSize,
    total: total,
    totalPages: Math.ceil(total / pageSize)
  }
}
```

**Best Practices:**
- Use cursor-based pagination for large datasets
- Always use limit() to prevent large result sets
- Index fields used for sorting
- Consider using _id for cursor (always indexed)
- Cache total counts if they're expensive

**Performance Comparison:**
```javascript
// Slow for large offsets
db.collection.find().skip(100000).limit(10)  // Scans 100,000 docs

// Fast (uses index)
db.collection.find({ _id: { $gt: lastId } })
  .sort({ _id: 1 })
  .limit(10)  // Only reads 10 docs
```

---

#### Q20: What are the differences between MongoDB's `insertOne` and `insertMany` methods?

**Answer:**

| `insertOne()` | `insertMany()` |
|---------------|----------------|
| Inserts single document | Inserts multiple documents |
| Takes object | Takes array of objects |
| Returns: `{ insertedId: ... }` | Returns: `{ insertedIds: [...] }` |
| Simpler syntax | More options (ordered) |
| Use for one document | Use for bulk inserts |

**insertOne() Example:**
```javascript
const result = db.characters.insertOne({
  name: "Eleven",
  age: 14,
  status: "active"
})

// Result:
{
  acknowledged: true,
  insertedId: ObjectId("507f1f77bcf86cd799439011")
}
```

**insertMany() Example:**
```javascript
const result = db.characters.insertMany([
  { name: "Eleven", age: 14 },
  { name: "Mike", age: 15 },
  { name: "Dustin", age: 15 }
])

// Result:
{
  acknowledged: true,
  insertedIds: [
    ObjectId("507f1f77bcf86cd799439011"),
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013")
  ]
}
```

**insertMany() with ordered option:**
```javascript
// ordered: true (default) - stops on first error
db.characters.insertMany([
  { name: "Eleven" },
  { _id: ObjectId("..."), name: "Mike" },  // Duplicate _id
  { name: "Dustin" }
], { ordered: true })
// Only first document inserted, stops at error

// ordered: false - continues after errors
db.characters.insertMany([
  { name: "Eleven" },
  { _id: ObjectId("..."), name: "Mike" },  // Duplicate _id
  { name: "Dustin" }
], { ordered: false })
// First and third documents inserted, second skipped
// Returns error details in writeErrors array
```

**Performance:**
- `insertMany()` is more efficient for bulk inserts
- Single network round trip vs multiple
- Better for batch operations

**Error Handling:**
```javascript
try {
  const result = db.characters.insertMany([...], { ordered: false })
  
  if (result.writeErrors && result.writeErrors.length > 0) {
    console.log("Some documents failed to insert:")
    result.writeErrors.forEach(err => {
      console.log(`Index ${err.index}: ${err.errmsg}`)
    })
  }
  
  console.log(`Inserted ${result.insertedIds.length} documents`)
} catch (error) {
  console.error("Insert failed:", error)
}
```

**When to Use:**
- **insertOne()**: Single document, simple operations
- **insertMany()**: Bulk inserts, batch operations, data migration

---

### 7.3 Indexing and Aggregation (Questions 21-25)

#### Q21: Describe a compound index in MongoDB.

**Answer:**
A compound index is an index on multiple fields, allowing efficient queries on combinations of those fields.

**Creating Compound Index:**
```javascript
// Index on two fields
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// Index on three fields
db.characters.createIndex({ team: 1, status: 1, power_level: -1 })
```

**Index Field Order Matters:**
```javascript
// This index can support:
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// ✅ Query 1: Uses full index
db.sightings.find({ creature_id: "creature_001", timestamp: { $gte: date } })

// ✅ Query 2: Uses prefix (creature_id only)
db.sightings.find({ creature_id: "creature_001" })

// ❌ Query 3: Cannot use index (timestamp alone)
db.sightings.find({ timestamp: { $gte: date } })
```

**Left-to-Right Rule:**
- Index can support queries on: field1, (field1, field2), (field1, field2, field3)
- Cannot support: field2 alone, field3 alone, (field2, field3)

**Sort Order in Index:**
```javascript
// Ascending (1) vs Descending (-1)
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })

// For query:
db.sightings.find({ creature_id: "creature_001" })
  .sort({ timestamp: -1 })  // ✅ Can use index for sort

db.sightings.find({ creature_id: "creature_001" })
  .sort({ timestamp: 1 })   // ❌ Cannot use index for sort (reverse order)
```

**Best Practices:**
1. **ESR Rule**: Equality, Sort, Range
   - Put equality fields first
   - Then sort fields
   - Then range fields

```javascript
// Good compound index order
db.collection.createIndex({
  status: 1,        // Equality
  created_at: -1,  // Sort
  age: 1           // Range
})

// Query that uses it efficiently:
db.collection.find({
  status: "active",           // Equality
  age: { $gte: 18, $lte: 65 } // Range
}).sort({ created_at: -1 })  // Sort
```

2. **Limit Number of Fields**: Too many fields in compound index reduces efficiency
3. **Consider Query Patterns**: Create indexes based on actual queries
4. **Monitor Index Usage**: Remove unused indexes

**Index Intersection:**
```javascript
// Two separate indexes
db.collection.createIndex({ status: 1 })
db.collection.createIndex({ age: 1 })

// MongoDB can intersect these for query:
db.collection.find({ status: "active", age: { $gte: 18 } })
// But compound index is more efficient
```

---

#### Q22: What is the aggregation pipeline in MongoDB?

**Answer:**
The aggregation pipeline is a framework for data processing that transforms documents through a series of stages.

**Pipeline Concept:**
```
Documents → [Stage 1] → [Stage 2] → [Stage 3] → Results
```

**Basic Syntax:**
```javascript
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
])
```

**Common Stages:**

**1. $match - Filter**
```javascript
{ $match: { status: "active", age: { $gte: 18 } } }
```

**2. $project - Reshape**
```javascript
{ $project: { name: 1, age: 1, _id: 0 } }
```

**3. $group - Aggregate**
```javascript
{
  $group: {
    _id: "$team",
    count: { $sum: 1 },
    avgAge: { $avg: "$age" }
  }
}
```

**4. $sort - Order**
```javascript
{ $sort: { age: -1 } }
```

**5. $limit / $skip - Pagination**
```javascript
{ $skip: 10 },
{ $limit: 5 }
```

**6. $lookup - Join**
```javascript
{
  $lookup: {
    from: "locations",
    localField: "location_id",
    foreignField: "_id",
    as: "location"
  }
}
```

**Complete Example:**
```javascript
db.characters.aggregate([
  // Stage 1: Filter
  { $match: { status: "active", team: "hawkins_heroes" } },
  
  // Stage 2: Group by team
  {
    $group: {
      _id: "$team",
      totalMembers: { $sum: 1 },
      avgPower: { $avg: "$power_level" },
      members: { $push: "$name" }
    }
  },
  
  // Stage 3: Sort
  { $sort: { totalMembers: -1 } },
  
  // Stage 4: Limit
  { $limit: 10 }
])
```

**Pipeline Benefits:**
- **Flexible**: Combine stages for complex operations
- **Efficient**: Each stage processes and passes results
- **Powerful**: Can do complex transformations
- **Readable**: Clear data flow

**Performance Tips:**
1. Place `$match` early to reduce documents
2. Use `$project` early to reduce document size
3. Use indexes for `$match` stages
4. Use `$limit` early when possible

---

#### Q23: How can you create an index in MongoDB and when should you do it?

**Answer:**

**Creating Indexes:**

**1. Single Field Index**
```javascript
// Ascending
db.characters.createIndex({ name: 1 })

// Descending
db.characters.createIndex({ age: -1 })
```

**2. Compound Index**
```javascript
db.sightings.createIndex({ creature_id: 1, timestamp: -1 })
```

**3. Text Index**
```javascript
db.creatures.createIndex({
  name: "text",
  description: "text"
})
```

**4. Geospatial Index**
```javascript
db.locations.createIndex({ coordinates: "2dsphere" })
```

**5. Unique Index**
```javascript
db.characters.createIndex({ email: 1 }, { unique: true })
```

**6. Partial Index**
```javascript
db.characters.createIndex(
  { name: 1 },
  { partialFilterExpression: { status: "active" } }
)
```

**7. TTL Index**
```javascript
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

**8. Sparse Index**
```javascript
db.characters.createIndex(
  { email: 1 },
  { sparse: true }  // Only indexes documents with email field
)
```

**Index Options:**
```javascript
db.collection.createIndex(
  { field: 1 },
  {
    unique: true,                    // Enforce uniqueness
    sparse: true,                    // Skip null/missing values
    background: true,                // Build in background
    name: "custom_index_name",       // Custom name
    partialFilterExpression: { ... }, // Partial index filter
    expireAfterSeconds: 3600         // TTL index
  }
)
```

**When to Create Indexes:**

**✅ Create Indexes For:**
1. **Frequently queried fields**
   ```javascript
   // If you often query by status
   db.characters.createIndex({ status: 1 })
   ```

2. **Fields used in sorting**
   ```javascript
   // If you often sort by age
   db.characters.createIndex({ age: -1 })
   ```

3. **Fields used in $lookup**
   ```javascript
   // Foreign key fields
   db.sightings.createIndex({ creature_id: 1 })
   ```

4. **Compound queries**
   ```javascript
   // If you query by status AND sort by age
   db.characters.createIndex({ status: 1, age: -1 })
   ```

5. **Text search fields**
   ```javascript
   db.creatures.createIndex({ name: "text", description: "text" })
   ```

**❌ Don't Create Indexes For:**
1. Fields rarely queried
2. Fields with very low cardinality (few unique values)
3. Fields that change frequently (slows writes)
4. Too many indexes (slows writes, uses memory)

**Monitoring Indexes:**
```javascript
// List all indexes
db.collection.getIndexes()

// Check index usage
db.collection.aggregate([{ $indexStats: {} }])

// Drop index
db.collection.dropIndex("index_name")

// Rebuild index
db.collection.reIndex()
```

**Best Practices:**
- Create indexes based on actual query patterns
- Use compound indexes for multi-field queries
- Monitor index usage and remove unused ones
- Consider partial indexes for filtered queries
- Balance read performance vs write performance

---

#### Q24: Explain how MongoDB's `$match`, `$group` and `$sort` operators work in an aggregation pipeline.

**Answer:**

**1. $match - Filter Documents**
- Similar to SQL WHERE clause
- Should be placed early in pipeline
- Can use indexes if placed first
- Reduces number of documents flowing through pipeline

```javascript
{
  $match: {
    status: "active",
    age: { $gte: 18 },
    team: { $in: ["hawkins_heroes", "government"] }
  }
}
```

**Benefits:**
- Reduces memory usage
- Speeds up subsequent stages
- Can use indexes for fast filtering

**2. $group - Aggregate Data**
- Similar to SQL GROUP BY
- Groups documents by specified field(s)
- Uses accumulators to compute values
- Changes document structure

```javascript
{
  $group: {
    _id: "$team",              // Group by team
    totalMembers: { $sum: 1 },  // Count documents
    avgPower: { $avg: "$power_level" },
    maxPower: { $max: "$power_level" },
    minPower: { $min: "$power_level" },
    members: { $push: "$name" },  // Collect into array
    uniqueLocations: { $addToSet: "$location_id" }
  }
}
```

**Common Accumulators:**
- `$sum`: Sum values or count
- `$avg`: Average
- `$min` / `$max`: Extremes
- `$first` / `$last`: First/last value
- `$push`: Collect into array
- `$addToSet`: Collect unique values

**3. $sort - Order Results**
- Similar to SQL ORDER BY
- Can sort by one or multiple fields
- Uses index if available
- Should come after $match, before $limit

```javascript
// Single field
{ $sort: { age: -1 } }  // Descending

// Multiple fields
{
  $sort: {
    team: 1,      // First by team (ascending)
    age: -1       // Then by age (descending)
  }
}
```

**Combined Example:**
```javascript
db.characters.aggregate([
  // 1. Filter (use index)
  {
    $match: {
      status: "active",
      age: { $gte: 14 }
    }
  },
  
  // 2. Group
  {
    $group: {
      _id: "$team",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
      members: { $push: "$name" }
    }
  },
  
  // 3. Sort
  {
    $sort: { count: -1 }  // Teams with most members first
  },
  
  // 4. Limit
  { $limit: 5 }
])
```

**Pipeline Order Best Practices:**
1. `$match` first (filter early)
2. `$project` early (reduce size)
3. `$group` before `$lookup` (reduce documents)
4. `$sort` before `$limit` (for top N queries)
5. `$limit` early when possible

**Performance Impact:**
- `$match` early: Reduces documents (fast)
- `$group`: Can be expensive (processes all documents)
- `$sort`: Can use index if early, otherwise in-memory sort

---

#### Q25: What is the purpose of the `explain()` method?

**Answer:**
The `explain()` method provides information about how MongoDB executes a query, helping with performance optimization.

**Basic Usage:**
```javascript
// Explain find query
db.characters.find({ status: "active" }).explain()

// Explain aggregation
db.characters.aggregate([...]).explain()
```

**Explain Modes:**
```javascript
// queryPlanner (default) - Shows plan without executing
db.collection.find({...}).explain("queryPlanner")

// executionStats - Executes query and shows stats
db.collection.find({...}).explain("executionStats")

// allPlansExecution - Shows all considered plans
db.collection.find({...}).explain("allPlansExecution")
```

**Key Information in explain() Output:**

**1. Execution Stage:**
```javascript
{
  "stage": "IXSCAN",  // Index scan (good)
  // vs
  "stage": "COLLSCAN" // Collection scan (bad)
}
```

**2. Index Used:**
```javascript
{
  "stage": "IXSCAN",
  "indexName": "status_1",  // Which index was used
  "indexBounds": {
    "status": ["[\"active\", \"active\"]"]
  }
}
```

**3. Performance Metrics:**
```javascript
{
  "executionStats": {
    "executionTimeMillis": 5,        // Query time
    "totalDocsExamined": 100,        // Docs examined
    "nReturned": 50,                 // Docs returned
    "totalKeysExamined": 100,        // Index keys examined
    "stage": "IXSCAN"
  }
}
```

**4. Winning Plan:**
```javascript
{
  "queryPlanner": {
    "winningPlan": {
      "stage": "IXSCAN",
      "indexName": "status_1"
    },
    "rejectedPlans": [...]  // Other plans considered
  }
}
```

**Interpreting Results:**

**Good Query (Uses Index):**
```javascript
db.characters.find({ status: "active" }).explain("executionStats")
// {
//   stage: "IXSCAN",
//   executionTimeMillis: 5,
//   totalDocsExamined: 100,
//   nReturned: 100
// }
```

**Bad Query (Collection Scan):**
```javascript
db.characters.find({ name: /Eleven/ }).explain("executionStats")
// {
//   stage: "COLLSCAN",
//   executionTimeMillis: 5000,
//   totalDocsExamined: 1000000,
//   nReturned: 1
// }
```

**Performance Indicators:**
- **IXSCAN**: Good (uses index)
- **COLLSCAN**: Bad (scans entire collection)
- **Low executionTimeMillis**: Fast
- **totalDocsExamined ≈ nReturned**: Efficient
- **totalDocsExamined >> nReturned**: Inefficient

**Using explain() for Optimization:**
```javascript
// 1. Check current performance
db.collection.find({ status: "active" }).explain("executionStats")

// 2. If COLLSCAN, create index
db.collection.createIndex({ status: 1 })

// 3. Verify index is used
db.collection.find({ status: "active" }).explain("executionStats")
// Should show IXSCAN now
```

**Best Practices:**
- Use `executionStats` for actual performance metrics
- Look for COLLSCAN (needs index)
- Check totalDocsExamined vs nReturned ratio
- Monitor executionTimeMillis
- Use explain() before and after optimization

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
