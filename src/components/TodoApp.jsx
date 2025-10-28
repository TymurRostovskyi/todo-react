import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './TodoItem'

export default function TodoApp({ theme }) {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTodos(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input.trim(),
        completed: false
      }])
      setInput('')
    }
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="todo-app"
      style={{
        width: '100%',
        maxWidth: '480px',
        background: theme === 'dark' ? '#2b2b2b' : '#fff',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem' }}>
        Todo List
      </h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTodo}
        placeholder="What needs to be done?"
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: '1.1rem',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          marginBottom: '1rem',
          outline: 'none'
        }}
      />

      <div className="filters" style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: '8px',
              background: filter === f ? '#0078ff' : '#f0f0f0',
              color: filter === f ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: filter === f ? '600' : '500'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <AnimatePresence>
          {filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </AnimatePresence>
      </ul>

      {todos.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
          {todos.filter(t => !t.completed).length} active, {todos.filter(t => t.completed).length} completed
        </div>
      )}
    </motion.div>
  )
}