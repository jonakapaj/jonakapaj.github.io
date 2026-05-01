import './Skills.css';

const skills = [
  {
    category: 'Backend & Python',
    color: '#2d6fe8',
    icon: '🐍',
    items: [
      { name: 'Python', level: 92 },
      { name: 'Django', level: 84 },
      { name: 'REST API Integration', level: 88 },
      { name: 'Relational Databases (SQL)', level: 80 },
    ],
  },
  {
    category: 'Frontend',
    color: '#0cbb8a',
    icon: '⚛️',
    items: [
      { name: 'React.js', level: 88 },
      { name: 'JavaScript (ES6+)', level: 87 },
      { name: 'Responsive Design', level: 85 },
      { name: 'Data Visualisation', level: 78 },
    ],
  },
  {
    category: 'Engineering Practices',
    color: '#ff6b2b',
    icon: '🛠️',
    items: [
      { name: 'Version Control (Git)', level: 90 },
      { name: 'CI/CD', level: 75 },
      { name: 'Unit Testing & Debugging', level: 82 },
      { name: 'Code Optimisation', level: 80 },
    ],
  },
];

function SkillBar({ name, level, color }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ '--fill': `${level}%`, '--color': color }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, color, icon, items }) {
  return (
    <div className="skill-card glass" id={`skill-card-${category.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="skill-card__header">
        <div className="skill-card__icon-wrap" style={{ '--color': color }}>
          <span>{icon}</span>
        </div>
        <h3 className="skill-card__title">{category}</h3>
      </div>
      <div className="skill-card__bars">
        {items.map((s) => (
          <SkillBar key={s.name} name={s.name} level={s.level} color={color} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="skills__header">
          <p className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Skills
          </p>
          <h2 className="section-title">My Tech Stack</h2>
          <p className="section-subtitle">
            Technologies and practices I use to build robust, scalable, and beautiful products.
          </p>
        </div>

        <div className="skills__grid">
          {skills.map((s) => (
            <SkillCard key={s.category} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
