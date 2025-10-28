export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="theme-btn"
      style={{
        padding: '10px 20px',
        background: theme === 'dark' ? '#0078ff' : '#0078ff',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: '0.3s'
      }}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}