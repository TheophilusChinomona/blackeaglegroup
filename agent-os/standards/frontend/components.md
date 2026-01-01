# React Components

This document defines component standards for theo.dev React projects.

## Component Structure

### Top-Down Organization

**Components should follow this order:**

```typescript
import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'

// 1. Types/Interfaces
interface IUserProfileProps {
  userId: string
  onUpdate?: () => void
}

// 2. Component Definition
export function UserProfile({ userId, onUpdate }: IUserProfileProps) {
  // 3. State
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<IUser | null>(null)

  // 4. Hooks
  const { user } = useAuth()

  // 5. Derived values
  const canEdit = user?.id === userId
  const displayName = userData?.name || 'Anonymous'

  // 6. Event handlers
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    await saveUserData(userData)
    setIsEditing(false)
    onUpdate?.()
  }

  // 7. Effects
  useEffect(() => {
    loadUserData(userId).then(setUserData)
  }, [userId])

  // 8. Early returns
  if (!userData) return <Spinner />

  // 9. Main JSX
  return (
    <div className="userProfile">
      {isEditing ? (
        <UserEditForm data={userData} onSave={handleSave} />
      ) : (
        <UserDisplay data={userData} onEdit={canEdit ? handleEdit : undefined} />
      )}
    </div>
  )
}

// 10. Helper functions (if small and component-specific)
function formatUserRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}
```

**Why this order?**
- Predictable structure (easy to find things)
- Read top to bottom like a story
- See data flow before usage
- Easier code review
- Consistent across all components

---

## Component Size

### The Scroll Test

**Rule of thumb:**
- ✅ **Good:** Can see entire component without scrolling
- ⚠️ **Consider splitting:** Need to scroll to see return statement
- 🚨 **Definitely split:** > 300 lines

### When to Extract

**Extract when:**
1. Repeated JSX (DRY principle)
2. Complex section makes parent hard to read
3. Different responsibility
4. Natural boundaries exist

**Example:**

```typescript
// ❌ Too large, hard to maintain
function Dashboard() {
  // 50 lines of state and logic
  return (
    <div>
      {/* 100 lines of profile section */}
      {/* 100 lines of stats section */}
      {/* 100 lines of activity section */}
    </div>
  )
}

// ✅ Clean, easy to understand
function Dashboard() {
  const { user, stats, activities } = useDashboardData()

  return (
    <div className="dashboard">
      <UserProfile user={user} />
      <StatsCards stats={stats} />
      <RecentActivity activities={activities} />
    </div>
  )
}
```

---

## Props

### Always Destructure

```typescript
// ✅ Good - See all props at a glance
function Button({ label, onClick, disabled = false, variant = 'primary' }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button button--${variant}`}
    >
      {label}
    </button>
  )
}

// ❌ Bad - Have to read entire component to know props
function Button(props: IButtonProps) {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.label}
    </button>
  )
}
```

### Default Values

```typescript
// ✅ Good - Defaults in destructuring
function Card({ title, children, elevated = false }: ICardProps) {
  return (
    <div className={`card ${elevated ? 'card--elevated' : ''}`}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

// ❌ Bad - Defaults scattered in code
function Card({ title, children, elevated }: ICardProps) {
  const isElevated = elevated !== undefined ? elevated : false
  return <div className={`card ${isElevated ? 'card--elevated' : ''}`}>{children}</div>
}
```

### Props Interface

```typescript
// ✅ Good - Clear interface with types
interface IButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

// Optional: Document complex props with JSDoc
interface IDataTableProps {
  /** Array of data to display in table */
  data: unknown[]
  /** Column configuration for table */
  columns: IColumn[]
  /** Callback when row is clicked */
  onRowClick?: (row: unknown) => void
  /** Enable pagination (default: true) */
  paginated?: boolean
}
```

---

## Component Patterns

### Composition Over Props

```typescript
// ✅ Good - Composition pattern
function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>
}

function CardHeader({ children }: { children: ReactNode }) {
  return <div className="card__header">{children}</div>
}

function CardBody({ children }: { children: ReactNode }) {
  return <div className="card__body">{children}</div>
}

// Usage
<Card>
  <CardHeader>
    <h3>User Profile</h3>
  </CardHeader>
  <CardBody>
    <p>User details here</p>
  </CardBody>
</Card>

// ❌ Bad - Too many props
function Card({
  title,
  subtitle,
  body,
  footer,
  showHeader,
  showFooter,
  headerStyle,
}: IComplexCardProps) {
  return (
    <div className="card">
      {showHeader && (
        <div className="card__header" style={headerStyle}>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      <div className="card__body">{body}</div>
      {showFooter && <div className="card__footer">{footer}</div>}
    </div>
  )
}
```

### Render Props Pattern

```typescript
// Useful for sharing logic with custom rendering
interface IDataFetcherProps<T> {
  url: string
  render: (data: T | null, loading: boolean, error: Error | null) => ReactNode
}

function DataFetcher<T>({ url, render }: IDataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return <>{render(data, loading, error)}</>
}

// Usage
<DataFetcher<IUser>
  url="/api/users/123"
  render={(user, loading, error) => {
    if (loading) return <Spinner />
    if (error) return <ErrorMessage error={error} />
    if (!user) return <NotFound />
    return <UserProfile user={user} />
  }}
/>
```

### Compound Components Pattern

```typescript
// For components with tightly coupled sub-components
interface ITabsContext {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<ITabsContext | null>(null)

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tabs__list">{children}</div>
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  const isActive = context.activeTab === id

  return (
    <button
      className={`tab ${isActive ? 'tab--active' : ''}`}
      onClick={() => context.setActiveTab(id)}
    >
      {children}
    </button>
  )
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')

  if (context.activeTab !== id) return null

  return <div className="tabs__panel">{children}</div>
}

// Export as compound component
export const TabsComponent = Object.assign(Tabs, {
  List: TabList,
  Tab: Tab,
  Panel: TabPanel,
})

// Usage
<TabsComponent defaultTab="profile">
  <TabsComponent.List>
    <TabsComponent.Tab id="profile">Profile</TabsComponent.Tab>
    <TabsComponent.Tab id="settings">Settings</TabsComponent.Tab>
  </TabsComponent.List>
  <TabsComponent.Panel id="profile">
    <UserProfile />
  </TabsComponent.Panel>
  <TabsComponent.Panel id="settings">
    <UserSettings />
  </TabsComponent.Panel>
</TabsComponent>
```

---

## State Management

### Local State

```typescript
// ✅ Good - State stays local when only used in component
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

### Lifted State

```typescript
// ✅ Good - Lift state when shared by multiple components
function TodoApp() {
  const [todos, setTodos] = useState<ITodo[]>([])

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  )
}
```

### Derived State

```typescript
// ✅ Good - Calculate during render, don't store in state
function ShoppingCart({ items }: { items: ICartItem[] }) {
  // Derived values - no useState needed
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <p>Items: {itemCount}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  )
}

// ❌ Bad - Storing derived state
function ShoppingCart({ items }: { items: ICartItem[] }) {
  const [total, setTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
    setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
  }, [items])

  // State updates could be out of sync, more complexity
}
```

---

## Conditional Rendering

### Early Returns

```typescript
// ✅ Good - Early returns for simple cases
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useUserData(userId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <NotFound />

  return <div>{data.name}</div>
}

// ❌ Bad - Nested ternaries
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useUserData(userId)

  return loading ? (
    <Spinner />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : !data ? (
    <NotFound />
  ) : (
    <div>{data.name}</div>
  )
}
```

### Conditional JSX

```typescript
// ✅ Good - && for conditional rendering
function Notification({ message, dismissible }: INotificationProps) {
  return (
    <div className="notification">
      <p>{message}</p>
      {dismissible && <button onClick={handleDismiss}>×</button>}
    </div>
  )
}

// ✅ Good - Ternary for either/or
function Status({ isOnline }: { isOnline: boolean }) {
  return <span className={`status ${isOnline ? 'status--online' : 'status--offline'}`}>{isOnline ? 'Online' : 'Offline'}</span>
}
```

---

## Performance Optimization

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive calculations
function DataTable({ data }: { data: IRow[] }) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.name.localeCompare(b.name))
  }, [data])

  return <table>{/* render sortedData */}</table>
}

// Memoize callbacks passed to children
function TodoList({ todos }: { todos: ITodo[] }) {
  const handleToggle = useCallback(
    (id: number) => {
      // Toggle logic
    },
    [] // Dependencies
  )

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  )
}

// Memoize components that render often
export const ExpensiveComponent = memo(function ExpensiveComponent({ data }: { data: IData }) {
  // Expensive rendering logic
  return <div>{/* UI */}</div>
})
```

**When to use:**
- `useMemo`: Expensive calculations
- `useCallback`: Callbacks passed to memoized children
- `memo`: Components that render often with same props

**When NOT to use:**
- Don't optimize prematurely
- Simple calculations (< 1ms) don't need memoization
- If component rarely re-renders

---

## Component Testing

### Test Behavior, Not Implementation

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

test('increments count when button clicked', () => {
  render(<Counter />)

  const button = screen.getByRole('button', { name: /increment/i })
  const count = screen.getByText(/count: 0/i)

  expect(count).toBeInTheDocument()

  fireEvent.click(button)

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
})
```

---

## Typography and Visual Hierarchy

**Establishing Hierarchy in Components**

When building components, establish clear visual hierarchy using:

- **Size:** Use base size (14px or 16px) with minimal variations (±2px when necessary)
- **Color:** Emphasize important elements, de-emphasize secondary (reduce lightness to ~60% for secondary text)
- **Spacing:** Use spacing to group or separate elements. Line height can act as natural margins

```tsx
// ✅ Good - Clear hierarchy with size, color, spacing
function Card({ title, subtitle, description }: ICardProps) {
  return (
    <div className="p-6">
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-base text-gray-600 font-medium mb-4">{subtitle}</p>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  )
}

// ❌ Bad - No clear hierarchy, too many sizes
function Card({ title, subtitle, description }: ICardProps) {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-lg">{subtitle}</p>
      <p className="text-sm">{description}</p>
    </div>
  )
}
```

## Component Checklist

**Before committing:**

- [ ] Component follows top-down structure
- [ ] Props are destructured
- [ ] Component size is manageable (< 300 lines)
- [ ] No unnecessary state
- [ ] Early returns for loading/error states
- [ ] TypeScript interfaces defined
- [ ] Meaningful component and prop names
- [ ] No console.logs or debug code
- [ ] Accessibility attributes (aria labels, roles)
- [ ] Performance optimization (if needed)
- [ ] Typography hierarchy established (base size + weight/color)
- [ ] Visual depth applied (shadows, layering) where appropriate

---

## Summary

**Key Principles:**
1. Top-down structure for consistency
2. Keep components small and focused
3. Composition over complex props
4. Destructure props always
5. Local state by default, lift when needed
6. Derive values, don't store them
7. Early returns for clarity
8. Optimize when data shows need
9. Establish hierarchy with size, color, and spacing
10. Use base typography size (14/16px) with minimal variations