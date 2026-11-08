import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  { id: 'ripple', name: 'Ripple / 01', client: 'Morrow Water', stage: 'Direction', color: 'sea', prompt: 'Launch a sparkling water that makes a Tuesday feel less ordinary.', tags: ['Cultural cue', 'Spring launch'] },
  { id: 'afterglow', name: 'Afterglow / 02', client: 'Fable Nights', stage: 'Framing', color: 'berry', prompt: 'Invite a new generation to reclaim weeknights as tiny celebrations.', tags: ['Night culture', 'Hospitality'] },
  { id: 'fieldnotes', name: 'Field notes / 03', client: 'Arbor Tools', stage: 'Shaping', color: 'moss', prompt: 'Make maintenance feel like a small act of care for the places we share.', tags: ['Public space', 'B2B'] }
]

const starterBoards = {
  ripple: {
    title: 'Small water. Big shift.',
    thought: 'The most magnetic rituals do not ask for a life overhaul — they improve the next ten minutes.',
    directions: [
      { title: 'A tiny weather system', desc: 'Turn the can into a pocket climate: mist, tide lines, a personal forecast.', tone: 'Playful / precise', visual: 'surface', pull: 'Make a little weather.' },
      { title: 'The pause has flavour', desc: 'Frame refreshment as a sensory interruption in the velocity of a weekday.', tone: 'Tactile / editorial', visual: 'citrus', pull: 'Pause, with feeling.' },
      { title: 'Tuesday, upgraded', desc: 'Celebrate unremarkable time as the most ownable place for a real reset.', tone: 'Bright / candid', visual: 'sun', pull: 'A better ordinary.' }
    ]
  },
  afterglow: {
    title: 'The night starts before it starts.',
    thought: 'People are not looking for more plans. They want a softer on-ramp into feeling alive together.',
    directions: [
      { title: 'Dress for the detour', desc: 'The best parts of the evening are the unplanned side quests.', tone: 'Warm / kinetic', visual: 'berry', pull: 'Take the long way in.' },
      { title: 'Borrowed light', desc: 'Make the glow of a room feel like a signal to the people you brought with you.', tone: 'Luminous / intimate', visual: 'lilac', pull: 'Stay in the glow.' },
      { title: 'Weeknight mythology', desc: 'Make the small outing feel worthy of an origin story.', tone: 'Cinematic / wry', visual: 'noir', pull: 'Legends have Tuesdays too.' }
    ]
  },
  fieldnotes: {
    title: 'Care has a shape.',
    thought: 'Visible upkeep is more than a task — it quietly tells people that their shared world matters.',
    directions: [
      { title: 'The cared-for city', desc: 'Use close-up traces of maintenance to make care legible and contagious.', tone: 'Grounded / observant', visual: 'moss', pull: 'Care, made visible.' },
      { title: 'Good work, growing', desc: 'Show how a small repair changes the atmosphere of an entire corner.', tone: 'Optimistic / human', visual: 'leaf', pull: 'Leave it better.' },
      { title: 'Tools for belonging', desc: 'Position practical equipment as a way communities invite people in.', tone: 'Clear / civic', visual: 'terra', pull: 'Make room for us.' }
    ]
  }
}

const creativeInputs = [
  { id: 'energy', label: 'Energy', values: ['Calm', 'Buoyant', 'Electric'] },
  { id: 'lens', label: 'Lens', values: ['Sensory', 'Cultural', 'Human'] },
  { id: 'form', label: 'Form', values: ['Campaign', 'Film world', 'Editorial system'] }
]

export function generateBoard(project, controls, brief = '') {
  const base = starterBoards[project.id] || starterBoards.ripple
  const energy = controls.energy.toLowerCase()
  const lens = controls.lens.toLowerCase()
  const form = controls.form.toLowerCase()
  const briefExcerpt = brief.trim().replace(/\s+/g, ' ').slice(0, 108)
  return {
    ...base,
    title: `${base.title}`,
    thought: `${base.thought} ${briefExcerpt ? `The route stays anchored to “${briefExcerpt}${brief.trim().length > 108 ? '…' : ''}”` : ''} A ${energy}, ${lens} ${form} gives that insight somewhere to land.`,
    directions: base.directions.map((direction, index) => ({
      ...direction,
      tone: index === 0 ? `${controls.energy} / ${controls.lens}` : direction.tone,
      desc: `${direction.desc} Built as a ${form.toLowerCase()} with a ${energy.toLowerCase()} pulse.`
    }))
  }
}

function Icon({ name, size = 18, stroke = 1.8 }) {
  const paths = {
    mark: <><path d="M4 14.8C6.4 7.7 10.2 4.2 18.9 3.7c-1.2 8-5 13.5-12.1 16.6"/><path d="M4 20.2c4.6-2.9 8.5-4.7 14.5-5.8"/></>,
    spark: <><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    folder: <><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2h7A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    wand: <><path d="m4 20 12-12"/><path d="m14 4 1.5 3.5L19 9l-3.5 1.5L14 14l-1.5-3.5L9 9l3.5-1.5L14 4Z"/><path d="m5 4 .6 2.4L8 7l-2.4.6L5 10l-.6-2.4L2 7l2.4-.6L5 4Z"/></>,
    library: <><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4 4V4Z"/><path d="M5 20h10a4 4 0 0 1 4 4"/><path d="M9 9h6M9 13h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    check: <path d="m5 12 4.2 4.2L19 6.5"/>,
    dots: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.4"/><path d="m16 16 4 4"/></>,
    compass: <><circle cx="12" cy="12" r="8.5"/><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z"/></>
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function App() {
  const [activeProject, setActiveProject] = useState(projects[0])
  const [view, setView] = useState('studio')
  const [prompt, setPrompt] = useState(projects[0].prompt)
  const [controls, setControls] = useState({ energy: 'Buoyant', lens: 'Sensory', form: 'Campaign' })
  const [board, setBoard] = useState(() => generateBoard(projects[0], { energy: 'Buoyant', lens: 'Sensory', form: 'Campaign' }))
  const [status, setStatus] = useState('ready')
  const [selectedDirection, setSelectedDirection] = useState(0)
  const [showProjects, setShowProjects] = useState(false)
  const [showBrief, setShowBrief] = useState(false)
  const [copied, setCopied] = useState(false)
  const promptRef = useRef(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('studio-1108-controls')
    if (stored) setControls(JSON.parse(stored))
  }, [])
  useEffect(() => window.localStorage.setItem('studio-1108-controls', JSON.stringify(controls)), [controls])
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); promptRef.current?.focus() }
      if (event.key === 'Escape') { setShowProjects(false); setShowBrief(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const runStudio = () => {
    if (!prompt.trim()) {
      setStatus('error')
      promptRef.current?.focus()
      return
    }
    setStatus('thinking')
    window.setTimeout(() => {
      setBoard(generateBoard(activeProject, controls, prompt))
      setSelectedDirection(0)
      setStatus('done')
    }, 800)
  }
  const chooseProject = (project) => {
    setActiveProject(project)
    setPrompt(project.prompt)
    setBoard(generateBoard(project, controls))
    setSelectedDirection(0)
    setShowProjects(false)
  }
  const copyDirection = async () => {
    const d = board.directions[selectedDirection]
    const content = `${board.title}\n\n${d.title}\n${d.pull}\n\n${d.desc}\n\nTone: ${d.tone}`
    try { await navigator.clipboard.writeText(content) } catch { /* clipboard is unavailable in some previews */ }
    setCopied(true); window.setTimeout(() => setCopied(false), 1600)
  }
  const setControl = (id, value) => setControls((old) => ({ ...old, [id]: value }))

  return <div className="app-shell">
    <a className="skip-link" href="#workbench">Skip to workbench</a>
    <header className="topbar">
      <button className="brand" onClick={() => setView('studio')} aria-label="AI-assisted Studio 1108 home"><span className="brand-mark"><Icon name="mark" size={25}/></span><span>AI-assisted<br/>Studio <em>1108</em></span></button>
      <nav aria-label="Main navigation" className="main-nav">
        <button className={view === 'studio' ? 'active' : ''} onClick={() => setView('studio')}><Icon name="wand"/> Studio</button>
        <button className={view === 'library' ? 'active' : ''} onClick={() => setView('library')}><Icon name="library"/> Field library</button>
      </nav>
      <div className="top-actions"><span className="mode-dot"><i></i>Demo mode</span><button className="help-button" aria-label="Open keyboard shortcut help" onClick={() => setShowBrief(true)}>?</button></div>
    </header>

    {view === 'library' ? <FieldLibrary onBack={() => setView('studio')} /> : <main id="workbench" className="workspace">
      <aside className="project-rail" aria-label="Project navigation">
        <div className="rail-label">Your rooms <button className="icon-button" aria-label="Add a project"><Icon name="plus" size={16}/></button></div>
        <button className="new-room" onClick={() => setShowProjects(true)}><Icon name="folder"/><span>Switch room</span><Icon name="chevron" size={16}/></button>
        <div className="project-list">{projects.map(project => <button key={project.id} onClick={() => chooseProject(project)} className={`project-item ${activeProject.id === project.id ? 'selected' : ''}`}><span className={`project-orb ${project.color}`}></span><span><b>{project.name}</b><small>{project.client}</small></span>{activeProject.id === project.id && <span className="current-dot"/>}</button>)}</div>
        <div className="rail-bottom"><div className="profile">SA</div><div><b>Studio account</b><small>Creative practice</small></div><Icon name="dots" size={18}/></div>
      </aside>

      <section className="studio">
        <div className="project-header"><div><div className="eyebrow"><span className="live-dot"></span>{activeProject.stage}</div><h1>{activeProject.name}</h1><p>{activeProject.client} <span>/</span> Q2 Direction</p></div><button className="outline-button" onClick={() => setShowBrief(true)}>Project brief <Icon name="arrow" size={15}/></button></div>

        <section className="prompt-panel" aria-labelledby="prompt-heading">
          <div className="prompt-label"><Icon name="spark" size={16}/> <span id="prompt-heading">Creative starting point</span><span className="keyboard-hint">⌘ K</span></div>
          <textarea ref={promptRef} aria-label="Creative starting point" value={prompt} onChange={(event) => { setPrompt(event.target.value); setStatus('ready') }} aria-invalid={status === 'error'} />
          <div className="prompt-footer"><div className="tag-row">{activeProject.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}<button className="add-tag" aria-label="Add context tag">+</button></div><span className="local-note">Local creative engine</span></div>
        </section>

        <section className="control-panel" aria-label="Creative controls">
          <div className="control-head"><div><span className="eyebrow">Shape the lens</span><h2>Set an intentional constraint.</h2></div><p>Good directions have edges. Choose a few and let the studio create against them.</p></div>
          <div className="control-grid">{creativeInputs.map(input => <div className="segmented-control" key={input.id}><span>{input.label}</span><div role="group" aria-label={input.label}>{input.values.map(value => <button key={value} onClick={() => {setControl(input.id, value); setStatus('ready')}} className={controls[input.id] === value ? 'chosen' : ''}>{value}</button>)}</div></div>)}</div>
          <div className="generate-row"><span className={status === 'error' ? 'error-message' : ''}>{status === 'ready' ? 'Ready when you are.' : status === 'thinking' ? 'Reading the room…' : status === 'error' ? 'Add a creative starting point to generate a route.' : 'Three fresh routes, ready to challenge.'}</span><button className="generate-button" disabled={status === 'thinking'} onClick={runStudio}>{status === 'thinking' ? <span className="spinner"/> : <Icon name="spark" size={18}/>} {status === 'thinking' ? 'Finding a signal' : 'Generate directions'}</button></div>
        </section>

        <section className="output-section" aria-live="polite"><div className="output-intro"><div><span className="eyebrow">The studio suggests</span><h2>{board.title}</h2><p>{board.thought}</p></div><button className="text-button" onClick={runStudio}><Icon name="spark" size={15}/> Reframe</button></div>
          <div className="direction-grid">{board.directions.map((direction, index) => <article key={direction.title} className={`direction-card ${selectedDirection === index ? 'focused' : ''}`} tabIndex="0" onClick={() => setSelectedDirection(index)} onKeyDown={e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); setSelectedDirection(index)}}}>
            <div className={`visual ${direction.visual}`}><span className="card-index">0{index + 1}</span><div className="visual-shape"></div><div className="visual-type">{direction.pull}</div><button aria-label={`Save ${direction.title}`} className="save-card">+</button></div>
            <div className="direction-copy"><div className="direction-top"><span>{direction.tone}</span><span className="select-indicator">{selectedDirection === index ? <Icon name="check" size={13}/> : ''}</span></div><h3>{direction.title}</h3><p>{direction.desc}</p><button className="explore-button" onClick={(e) => {e.stopPropagation(); setSelectedDirection(index)}}>Explore route <Icon name="arrow" size={15}/></button></div>
          </article>)}</div>
          <div className="board-footer"><div className="selected-summary"><span className="tiny-label">Selected route</span><b>{board.directions[selectedDirection].title}</b><span>{board.directions[selectedDirection].pull}</span></div><button className="copy-button" onClick={copyDirection}>{copied ? <Icon name="check" size={16}/> : <Icon name="copy" size={16}/>} {copied ? 'Copied to clipboard' : 'Copy direction'}</button></div>
        </section>
      </section>
    </main>}
    <footer><span>AI-assisted Studio 1108</span><span>Make the first thought a better one.</span><span>⌘ K to focus</span></footer>
    {showProjects && <ProjectDialog active={activeProject} onClose={() => setShowProjects(false)} onChoose={chooseProject}/>} 
    {showBrief && <BriefDialog project={activeProject} onClose={() => setShowBrief(false)}/>} 
  </div>
}

function ProjectDialog({ active, onClose, onChoose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal project-modal" role="dialog" aria-modal="true" aria-labelledby="rooms-title" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close"/></button><span className="eyebrow">Your rooms</span><h2 id="rooms-title">Where should we work?</h2><p>Each room keeps a distinct creative starting point.</p><div className="room-options">{projects.map(project => <button key={project.id} className={active.id === project.id ? 'room-current' : ''} onClick={() => onChoose(project)}><span className={`project-orb ${project.color}`}/><span><b>{project.name}</b><small>{project.client} · {project.stage}</small></span>{active.id === project.id && <Icon name="check" size={18}/>}</button>)}</div></section></div>
}

function BriefDialog({ project, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close"/></button><span className="eyebrow">{project.client} / internal brief</span><h2 id="brief-title">A more inviting kind of ordinary.</h2><div className="brief-grid"><div><span>Objective</span><p>Create a platform that makes the brand’s everyday value feel instantly social, sensory and shareable.</p></div><div><span>Audience tension</span><p>People want a pause, but an empty promise of “self-care” feels too polished to believe.</p></div><div><span>What success feels like</span><p>Someone sees it mid-scroll and thinks: that is exactly the energy I needed today.</p></div><div><span>Watch-outs</span><p>No wellness clichés. Keep it specific, unforced and a little surprising.</p></div></div><button className="generate-button modal-action" onClick={onClose}>Bring it to the board <Icon name="arrow" size={17}/></button></section></div>
}

function FieldLibrary({ onBack }) {
  const notes = [
    ['47%', 'of people say small rituals are how they protect their energy.', 'Rituals feel more believable when they have texture, not instruction.'],
    ['01:17', 'the average scroll pause on a vivid, human moment.', 'A single precise detail can do more work than a packed moodboard.'],
    ['Soft proof', 'is replacing grand claims in the strongest brand worlds.', 'Show the change. Do not narrate the promise.']
  ]
  return <main className="library-page"><button className="back-button" onClick={onBack}>← Back to studio</button><div className="library-hero"><span className="eyebrow">Field library / live notes</span><h1>Signals worth<br/><i>making with.</i></h1><p>A living index of tensions, observations and patterns to turn into work — not decoration.</p></div><div className="note-grid">{notes.map(([big, title, body], i) => <article className={`field-note note-${i}`} key={big}><span className="note-num">0{i + 1}</span><strong>{big}</strong><h2>{title}</h2><p>{body}</p><button>Pull into a room <Icon name="arrow" size={15}/></button></article>)}</div><section className="library-cta"><Icon name="compass" size={30}/><div><h2>Start with a signal, not a solution.</h2><p>Studio 1108 is intentionally designed for generative exploration before the first slide is made.</p></div><button className="generate-button" onClick={onBack}>Open studio <Icon name="arrow" size={16}/></button></section></main>
}

const rootElement = document.getElementById('root')
if (rootElement) createRoot(rootElement).render(<App />)
