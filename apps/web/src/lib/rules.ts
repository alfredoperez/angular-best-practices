import fs from 'fs'
import path from 'path'

const RULES_DIR = path.join(process.cwd(), '../../rules')

export interface RuleInfo {
  filename: string
  title: string
  impact: string
  impactDescription: string
  tags: string[]
  section: number
  category: string
}

const SECTION_MAP: Record<string, number> = {
  'async': 1, 'opt-async': 1,
  'bundle': 2,
  'opt': 3, 'performance': 3,
  'ts': 4,
  'signal': 5,
  'component': 6,
  'rxjs': 7,
  'cd': 8,
  'template': 9,
  'ssr': 10,
  'form': 11,
  'ngrx': 12,
  'signalstore': 13,
  'tanstack': 14,
  'arch': 15,
  'test': 16,
  'core': 17, 'error-handling': 17, 'observability': 17, 'pattern': 17, 'routing': 17, 'security': 17,
  'ui': 18, 'a11y': 18, 'loading': 18, 'dialogs': 18, 'theming': 18,
  'http': 19, 'mapper': 19,
  'material': 20,
  'primeng': 21,
  'spartan': 22,
  'transloco': 23,
}

function getSection(filename: string): number {
  const name = filename.replace('.md', '')
  // Try longest prefix first (e.g., "opt-async" before "opt")
  const prefixes = Object.keys(SECTION_MAP).sort((a, b) => b.length - a.length)
  for (const prefix of prefixes) {
    if (name.startsWith(prefix + '-') || name === prefix) {
      return SECTION_MAP[prefix]
    }
  }
  return 0
}

function parseFrontmatter(content: string): Record<string, string> {
  const fm: Record<string, string> = {}
  if (!content.startsWith('---')) return fm
  const end = content.indexOf('---', 3)
  if (end === -1) return fm
  const text = content.slice(3, end).trim()
  for (const line of text.split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    fm[key] = val
  }
  return fm
}

export function getAllRules(): RuleInfo[] {
  const rules: RuleInfo[] = []
  const subdirs = fs.readdirSync(RULES_DIR)

  for (const subdir of subdirs) {
    const dirPath = path.join(RULES_DIR, subdir)
    if (!fs.statSync(dirPath).isDirectory()) continue

    const files = fs.readdirSync(dirPath).filter(
      (f) => f.endsWith('.md') && !f.startsWith('_')
    )

    for (const file of files) {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf-8')
      const fm = parseFrontmatter(content)
      const section = getSection(file)

      rules.push({
        filename: file,
        title: fm.title ?? file.replace('.md', ''),
        impact: fm.impact ?? 'MEDIUM',
        impactDescription: fm.impactDescription ?? '',
        tags: fm.tags ? fm.tags.split(',').map((t) => t.trim()) : [],
        section,
        category: subdir,
      })
    }
  }

  return rules.sort((a, b) => a.section - b.section || a.filename.localeCompare(b.filename))
}

export function getRulesBySection(): Map<number, RuleInfo[]> {
  const rules = getAllRules()
  const map = new Map<number, RuleInfo[]>()
  for (const rule of rules) {
    if (!map.has(rule.section)) map.set(rule.section, [])
    map.get(rule.section)!.push(rule)
  }
  return map
}
