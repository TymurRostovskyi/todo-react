import { motion } from 'framer-motion'

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="todo-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        background: todo.completed ? '#e0e0e0' : '#fff',
        borderRadius: '12px',
        marginBottom: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? '#888' : 'inherit',
          fontSize: '1.1rem'
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}
      >
        ×
      </button>
    </motion.li>
  )
}