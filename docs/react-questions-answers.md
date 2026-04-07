# React Questions & Answers

This content was moved from `README.md` for readability.

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
