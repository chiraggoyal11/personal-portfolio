// Automatic GitHub project sync.
//
// Fetches the user's public repositories at runtime and turns each one into a
// project card (description, technologies, GitHub link, and a Live Demo link
// when the repo has a website configured). New public repos therefore appear on
// the portfolio automatically, without a rebuild.
//
// Descriptions are derived from the repo's GitHub description or, when that is
// empty, from the repo's README (its intro paragraph explains what the project
// does). Results are cached in localStorage so repeat visits do not re-hit the
// GitHub API (which is rate limited to 60 requests/hour for anonymous users).

import { personal } from './data.js'

export const GITHUB_USERNAME =
  (personal.github || '')
    .replace(/\/+$/, '')
    .split('/')
    .pop() || 'chiraggoyal11'

// Repos you never want auto-listed (in addition to the profile repo, forks and
// archived repos which are hidden by default). Use the exact repo name.
export const HIDDEN_REPOS = []

const CACHE_KEY = `gh_projects_${GITHUB_USERNAME}_v1`
const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

// Canonical labels used to detect technologies from repo text.
const TECH_KEYWORDS = [
  'React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express', 'Spring Boot',
  'Hibernate', 'Flyway', 'Thymeleaf', 'Java', 'Kotlin', 'Python',
  'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'Dart', 'Flutter',
  'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn', 'Pandas', 'NumPy',
  'Streamlit', 'Flask', 'Django', 'FastAPI', 'Gradio', 'OpenCV',
  'Machine Learning', 'Deep Learning', 'CNN', 'SVM', 'LSTM', 'NLP',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Firebase', 'Supabase',
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Kafka', 'GraphQL',
  'REST API', 'JWT', 'OAuth', 'Razorpay', 'Stripe', 'Tailwind', 'Vite',
  'HTML', 'CSS', 'Jupyter Notebook',
]

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Word-boundary keyword match so "Go" does not match inside "goods" and
// "React" does not match inside "reactor". Boundaries treat letters, digits and
// the tech-specific chars + # . as "inside a word".
const keywordMatches = (keyword, haystack) => {
  const re = new RegExp(
    `(^|[^a-z0-9+#.])${escapeRegExp(keyword.toLowerCase())}([^a-z0-9+#.]|$)`,
    'i'
  )
  return re.test(haystack)
}

const prettifyName = (name) =>
  (name || '')
    .replace(/[-_.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

// A loose slug used to match repos to curated projects even when naming differs
// (e.g. "Kidney-Stone-Detector" vs "Kidney_Stone_Detector").
export const repoSlug = (value) => {
  const last = (value || '')
    .toLowerCase()
    .replace(/\.git$/, '')
    .replace(/\/+$/, '')
    .split('/')
    .pop()
  return (last || '').replace(/[^a-z0-9]/g, '')
}

const isValidDemo = (url) => {
  if (!url) return false
  try {
    const u = new URL(url)
    return (
      (u.protocol === 'http:' || u.protocol === 'https:') &&
      !u.hostname.includes('github.com')
    )
  } catch {
    return false
  }
}

// Turn a chunk of Markdown into readable plain text.
const stripMarkdown = (md) =>
  (md || '')
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ') // inline/other code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/<[^>]+>/g, ' ') // html tags
    .replace(/[*_~>#]+/g, ' ') // md emphasis / headings / quotes
    .replace(/\s+/g, ' ')
    .trim()

// Extract a description (intro paragraph) and highlights (first bullets) from a
// README's raw Markdown.
const parseReadme = (raw) => {
  if (!raw) return { description: '', highlights: [] }

  const lines = raw.split(/\r?\n/)
  let inCode = false
  const description = []
  const highlights = []
  let seenParagraph = false

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    if (!line) {
      if (description.length) seenParagraph = true
      continue
    }
    if (/^#{1,6}\s/.test(line)) continue // skip headings
    if (/^!\[/.test(line) || /^\[!\[/.test(line)) continue // badges / images
    if (/^<[^>]+>$/.test(line)) continue // lone html tag

    const bullet = line.match(/^[-*+]\s+(.*)$/)
    if (bullet) {
      const text = stripMarkdown(bullet[1])
      if (text && text.length > 3 && highlights.length < 3) highlights.push(text)
      // A bullet also ends the intro paragraph.
      if (description.length) seenParagraph = true
      continue
    }

    if (!seenParagraph) {
      const text = stripMarkdown(line)
      if (text) description.push(text)
    }
  }

  let desc = description.join(' ').trim()
  if (desc.length > 320) desc = desc.slice(0, 317).replace(/\s+\S*$/, '') + '…'
  return { description: desc, highlights }
}

const detectTechnologies = (repo, text) => {
  const haystack = ` ${repo.name} ${text} `.toLowerCase()
  const found = []
  if (repo.language) found.push(repo.language)
  for (const kw of TECH_KEYWORDS) {
    if (found.some((f) => f.toLowerCase() === kw.toLowerCase())) continue
    if (keywordMatches(kw, haystack)) found.push(kw)
  }
  if (repo.topics) {
    for (const t of repo.topics) {
      const label = prettifyName(t)
      if (!found.some((f) => f.toLowerCase() === label.toLowerCase())) found.push(label)
    }
  }
  return (found.length ? found : ['Code']).slice(0, 8)
}

const buildFallbackDescription = (repo) => {
  const lang = repo.language ? `${repo.language} ` : ''
  return `${prettifyName(repo.name)} is a ${lang}project by ${GITHUB_USERNAME}. Open the repository to explore the source code and documentation.`
}

const buildMetadataHighlights = (repo) => {
  const h = []
  if (repo.language) h.push(`Built primarily with ${repo.language}.`)
  if (repo.topics && repo.topics.length) {
    h.push(`Topics: ${repo.topics.slice(0, 6).join(', ')}.`)
  }
  if (repo.stargazers_count > 0) {
    h.push(`${repo.stargazers_count} star${repo.stargazers_count === 1 ? '' : 's'} on GitHub.`)
  }
  const year = new Date(repo.pushed_at || repo.updated_at || repo.created_at).getFullYear()
  if (year) h.push(`Last updated in ${year}.`)
  return h
}

const yearOf = (d) => (d ? new Date(d).getFullYear() : '')

const fetchReadmeRaw = async (repo) => {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
      { headers: { Accept: 'application/vnd.github.raw' } }
    )
    if (!res.ok) return ''
    return await res.text()
  } catch {
    return ''
  }
}

const mapRepoToProject = async (repo) => {
  const readme = await fetchReadmeRaw(repo)
  const parsed = parseReadme(readme)

  const description =
    (repo.description && repo.description.trim()) ||
    parsed.description ||
    buildFallbackDescription(repo)

  const highlights =
    parsed.highlights.length ? parsed.highlights : buildMetadataHighlights(repo)

  const created = yearOf(repo.created_at)
  const updated = yearOf(repo.pushed_at || repo.updated_at)
  const duration =
    created && updated && created !== updated
      ? `${created} - ${updated}`
      : `${updated || created || new Date().getFullYear()}`

  return {
    title: prettifyName(repo.name),
    description,
    technologies: detectTechnologies(repo, `${repo.description || ''} ${readme}`),
    github: repo.html_url,
    demo: isValidDemo(repo.homepage) ? repo.homepage : '#',
    duration,
    image: null,
    highlights,
    autoSynced: true,
    stars: repo.stargazers_count || 0,
    updatedAt: repo.pushed_at || repo.updated_at || repo.created_at,
  }
}

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw)
    if (!Array.isArray(data) || Date.now() - at > CACHE_TTL_MS) return null
    return data
  } catch {
    return null
  }
}

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* storage unavailable / quota — ignore */
  }
}

export const fetchGitHubProjects = async ({
  includeForks = false,
  includeArchived = false,
} = {}) => {
  const cached = readCache()
  if (cached) return cached

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
    { headers: { Accept: 'application/vnd.github+json' } }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const repos = await res.json()
  if (!Array.isArray(repos)) throw new Error('Unexpected GitHub API response')

  const filtered = repos.filter(
    (r) =>
      r &&
      !r.private &&
      r.name &&
      r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase() &&
      !HIDDEN_REPOS.includes(r.name) &&
      (includeForks ? true : !r.fork) &&
      (includeArchived ? true : !r.archived)
  )

  const projects = await Promise.all(filtered.map((r) => mapRepoToProject(r)))
  projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  writeCache(projects)
  return projects
}

// Merge curated projects with auto-synced ones, removing GitHub repos that are
// already represented by a curated project (matched loosely by repo slug).
export const mergeProjects = (curated, auto) => {
  const curatedSlugs = new Set((curated || []).map((p) => repoSlug(p.github)))
  const extras = (auto || []).filter((p) => !curatedSlugs.has(repoSlug(p.github)))
  return [...(curated || []), ...extras]
}
