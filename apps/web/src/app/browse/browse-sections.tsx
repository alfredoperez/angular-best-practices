'use client'

import { useState, useMemo } from 'react'
import { ImpactBadge } from '@/components/impact-badge'

interface CodeBlock {
  lang: string
  content: string
}

interface RuleBody {
  description: string
  incorrectCode?: CodeBlock
  correctCode?: CodeBlock
}

interface RuleItem {
  filename: string
  title: string
  impact: string
  body?: RuleBody
}

interface SectionWithRules {
  number: number
  title: string
  impact: string
  impactDescription: string
  ruleCount: number
  rules: RuleItem[]
}

interface SkillGroup {
  id: string
  name: string
  sections: number[]
  optional: boolean
}

const SKILL_GROUPS: SkillGroup[] = [
  { id: 'core', name: 'Core', sections: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19], optional: false },
  { id: 'ngrx', name: 'NgRx', sections: [12], optional: true },
  { id: 'signalstore', name: 'SignalStore', sections: [13], optional: true },
  { id: 'tanstack', name: 'TanStack Query', sections: [14], optional: true },
  { id: 'material', name: 'Angular Material', sections: [20], optional: true },
  { id: 'primeng', name: 'PrimeNG', sections: [21], optional: true },
  { id: 'spartan', name: 'Spartan UI', sections: [22], optional: true },
  { id: 'transloco', name: 'Transloco', sections: [23], optional: true },
]

export function BrowseSections({
  sections,
}: {
  sections: SectionWithRules[]
}) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  const toggle = (n: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  const toggleRule = (filename: string) => {
    setExpandedRules((prev) => {
      const next = new Set(prev)
      if (next.has(filename)) next.delete(filename)
      else next.add(filename)
      return next
    })
  }

  const sectionsByNumber = useMemo(() => {
    const map = new Map<number, SectionWithRules>()
    for (const s of sections) map.set(s.number, s)
    return map
  }, [sections])

  const isSearching = search.trim().length > 0
  const query = search.trim().toLowerCase()

  const filteredGroups = useMemo(() => {
    return SKILL_GROUPS.map((group) => {
      const groupSections = group.sections
        .map((n) => sectionsByNumber.get(n))
        .filter((s): s is SectionWithRules => s !== undefined)
        .map((section) => {
          if (!isSearching) return { section, filteredRules: section.rules }

          const sectionTitleMatch = section.title.toLowerCase().includes(query)
          const matchingRules = section.rules.filter((r) =>
            r.title.toLowerCase().includes(query) ||
            r.body?.description.toLowerCase().includes(query) ||
            r.body?.incorrectCode?.content.toLowerCase().includes(query) ||
            r.body?.correctCode?.content.toLowerCase().includes(query)
          )

          if (sectionTitleMatch) {
            return { section, filteredRules: section.rules }
          }
          if (matchingRules.length > 0) {
            return { section, filteredRules: matchingRules }
          }
          return null
        })
        .filter((s): s is { section: SectionWithRules; filteredRules: RuleItem[] } => s !== null)

      const totalRules = groupSections.reduce(
        (sum, s) => sum + s.filteredRules.length,
        0
      )

      return { ...group, groupSections, totalRules }
    }).filter((g) => g.groupSections.length > 0)
  }, [sectionsByNumber, isSearching, query])

  const totalFilteredRules = filteredGroups.reduce((sum, g) => sum + g.totalRules, 0)
  const totalFilteredSections = filteredGroups.reduce(
    (sum, g) => sum + g.groupSections.length,
    0
  )

  // Auto-expand matching sections when searching
  const expandedSet = useMemo(() => {
    if (!isSearching) return expanded
    const auto = new Set<number>()
    for (const group of filteredGroups) {
      for (const { section } of group.groupSections) {
        auto.add(section.number)
      }
    }
    return auto
  }, [isSearching, filteredGroups, expanded])

  return (
    <div className="space-y-6">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rules..."
          className="w-full bg-bg-card border border-border rounded px-4 py-2.5 pl-10 text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-border-bright transition-colors"
        />
        {isSearching && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Result count when searching */}
      {isSearching && (
        <p className="text-xs text-text-dim">
          Showing {totalFilteredRules} rules in {totalFilteredSections} sections
        </p>
      )}

      {/* Grouped sections */}
      {filteredGroups.map((group) => (
        <div key={group.id} className="space-y-1">
          {/* Group header */}
          <div className="flex items-center gap-3 pb-2">
            <span className="text-xs font-medium text-text-dim uppercase tracking-wide">
              {group.name}
            </span>
            <span className="text-xs text-text-dim">
              {group.totalRules} rules
            </span>
            {group.optional && (
              <span className="text-xs text-accent">Optional Skill</span>
            )}
          </div>

          {/* Sections within group */}
          {group.groupSections.map(({ section, filteredRules }) => (
            <div key={section.number}>
              <button
                onClick={() => toggle(section.number)}
                className={`flex w-full items-center gap-4 rounded border px-4 py-3 text-sm text-left transition-colors ${
                  expandedSet.has(section.number)
                    ? 'bg-bg-hover border-border-bright'
                    : 'bg-bg-card border-border hover:border-border-bright'
                }`}
              >
                <svg
                  className={`w-4 h-4 text-text-dim shrink-0 transition-transform duration-200 ${
                    expandedSet.has(section.number) ? 'rotate-90' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M6 3l5 5-5 5V3z" />
                </svg>
                <span className="w-6 text-text-dim text-right">
                  {section.number}
                </span>
                <span className="flex-1 text-text">{section.title}</span>
                <span className="text-xs text-text-dim">
                  {filteredRules.length} rules
                </span>
                <ImpactBadge impact={section.impact} />
              </button>

              {expandedSet.has(section.number) && (
                <div className="ml-10 border-l border-border pl-4 py-2 space-y-1">
                  {filteredRules.map((rule) => (
                    <div key={rule.filename}>
                      <button
                        onClick={() => toggleRule(rule.filename)}
                        className="flex w-full items-center gap-3 py-1.5 text-sm text-left hover:bg-bg-hover rounded px-2 -mx-2 transition-colors"
                      >
                        {rule.body && (
                          <svg
                            className={`w-3 h-3 text-text-dim shrink-0 transition-transform duration-200 ${
                              expandedRules.has(rule.filename) ? 'rotate-90' : ''
                            }`}
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M6 3l5 5-5 5V3z" />
                          </svg>
                        )}
                        {!rule.body && <span className="w-3 shrink-0" />}
                        <span className="flex-1 text-text-muted">{rule.title}</span>
                        <ImpactBadge impact={rule.impact} />
                      </button>
                      {expandedRules.has(rule.filename) && rule.body && (
                        <RuleContent body={rule.body} />
                      )}
                    </div>
                  ))}
                  {filteredRules.length === 0 && (
                    <p className="text-xs text-text-dim py-1">
                      No rules in this section yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* No results */}
      {filteredGroups.length === 0 && isSearching && (
        <p className="text-sm text-text-dim text-center py-8">
          No rules matching &ldquo;{search.trim()}&rdquo;
        </p>
      )}
    </div>
  )
}

function RuleCodeBlock({ code, label, color }: { code: CodeBlock; label: string; color: 'red' | 'green' }) {
  const borderColor = color === 'red' ? 'border-red-500/30' : 'border-green-500/30'
  const labelColor = color === 'red' ? 'text-red-400' : 'text-green-400'

  return (
    <div>
      <span className={`text-xs font-medium ${labelColor}`}>{label}</span>
      <pre className={`mt-1 rounded border ${borderColor} bg-[#050505] px-3 py-2 text-xs leading-relaxed overflow-x-auto`}>
        <code className="text-text-muted">{code.content}</code>
      </pre>
    </div>
  )
}

function RuleContent({ body }: { body: RuleBody }) {
  return (
    <div className="ml-5 mt-1 mb-3 space-y-3">
      <p className="text-sm text-text-muted leading-relaxed">{body.description}</p>
      {body.incorrectCode && (
        <RuleCodeBlock code={body.incorrectCode} label="Incorrect" color="red" />
      )}
      {body.correctCode && (
        <RuleCodeBlock
          code={body.correctCode}
          label={body.incorrectCode ? 'Correct' : ''}
          color="green"
        />
      )}
    </div>
  )
}
