import { useState, useEffect } from 'react'
import TodoApp from './components/TodoApp'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={theme}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <TodoApp theme={theme} />
    </div>
  )
}