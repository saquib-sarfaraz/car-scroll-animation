const Stats = ({ items = [], className = '' }) => {
  return (
    <div className={`stats-row ${className}`.trim()}>
      {items.map((stat) => (
        <div
          key={stat.label}
          className={`stat-card hero-stat ${stat.tone ?? ''}`.trim()}
        >
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Stats
