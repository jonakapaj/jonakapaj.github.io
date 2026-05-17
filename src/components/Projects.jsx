import { useRef, useEffect } from 'react';
import './Projects.css';

const projects = [
  {
    id: 'proj-chrome-extension',
    title: 'Chrome Extension',
    description:
      'A browser extension built with JavaScript that enhances the browsing experience — one of the most starred projects on the profile.',
    tags: ['JavaScript', 'Chrome API', 'Extension'],
    color: '#f59e0b',
    emoji: '🧩',
    links: { github: 'https://github.com/jonakapaj/chromeExtension', live: 'https://github.com/jonakapaj/chromeExtension' },
    featured: true,
  },
  {
    id: 'proj-covid-tracker',
    title: 'Covid-19 Tracker',
    description:
      'A Covid-19 tracking website with a server integration task — built during a Ritech challenge. Displays live global statistics.',
    tags: ['JavaScript', 'REST API', 'Data Viz'],
    color: '#6366f1',
    emoji: '🌍',
    links: { github: 'https://github.com/jonakapaj/covid-19-tracker', live: 'https://github.com/jonakapaj/covid-19-tracker' },
    featured: true,
  },
  {
    id: 'proj-sociopedia',
    title: 'Sociopedia',
    description:
      'A social media-inspired JavaScript application — a full CRUD social feed with interactive UI elements.',
    tags: ['JavaScript', 'React', 'CSS'],
    color: '#22d3ee',
    emoji: '💬',
    links: { github: 'https://github.com/jonakapaj/sociopediaa', live: 'https://github.com/jonakapaj/sociopediaa' },
    featured: false,
  },
  {
    id: 'proj-music-sorter',
    title: 'Music Sorter',
    description:
      'A Python utility that automatically sorts and organises music files — showcasing Python scripting, file I/O, and automation skills.',
    tags: ['Python', 'Automation', 'File I/O'],
    color: '#a855f7',
    emoji: '🎵',
    links: { github: 'https://github.com/jonakapaj/Music-Sorter', live: 'https://github.com/jonakapaj/Music-Sorter' },
    featured: false,
  },
  {
    id: 'proj-opticsandlasers',
    title: 'Optics & Lasers',
    description:
      'A JavaScript-based interactive simulation for optics and lasers — built as part of an academic mobility exchange project.',
    tags: ['JavaScript', 'Physics Sim', 'Canvas'],
    color: '#10b981',
    emoji: '🔬',
    links: { github: 'https://github.com/jonakapaj/Opticsandlasers', live: 'https://github.com/jonakapaj/Opticsandlasers' },
    featured: false,
  },
  {
    id: 'proj-book-management',
    title: 'Book Management System',
    description:
      'A Java-based book management system — demonstrating OOP, CRUD operations, and backend data management principles.',
    tags: ['Java', 'OOP', 'CRUD'],
    color: '#ef4444',
    emoji: '📚',
    links: { github: 'https://github.com/jonakapaj/Book-management', live: 'https://github.com/jonakapaj/Book-management' },
    featured: false,
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(8px)`;
    };
    const handleLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      className={`project-card glass ${project.featured ? 'project-card--featured' : ''}`}
      ref={cardRef}
      id={project.id}
      style={{ '--accent': project.color }}
    >
      <div className="project-card__glow" />

      <div className="project-card__top">
        <div className="project-card__emoji-wrap">
          <span className="project-card__emoji">{project.emoji}</span>
        </div>
        {project.featured && (
          <span className="project-card__badge">Featured</span>
        )}
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tags">
        {project.tags.map((t) => (
          <span key={t} className="project-card__tag">{t}</span>
        ))}
      </div>

      <div className="project-card__links">
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-card__link" id={`${project.id}-github`} aria-label="View source code">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Code
        </a>
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--primary" id={`${project.id}-live`} aria-label="View on GitHub">
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__header">
          <p className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            Projects
          </p>
          <h2 className="section-title">
            Things I've <span className="text-gradient">Built</span>
          </h2>
          <p className="section-subtitle">
            A selection of real projects from my GitHub — spanning Python automation, React UIs, browser extensions, and more.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="projects__footer">
          <a
            href="https://github.com/jonakapaj?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="projects-view-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View All 19 Repos on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
