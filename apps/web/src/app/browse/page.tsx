import { getRulesBySection } from '@/lib/rules'
import { sections } from '@/lib/sections-data'
import { BrowseSections } from './browse-sections'

export default function BrowsePage() {
  const rulesBySection = getRulesBySection()

  const sectionsWithRules = sections.map((section) => ({
    ...section,
    rules: (rulesBySection.get(section.number) ?? []).map((r) => ({
      filename: r.filename,
      title: r.title,
      impact: r.impact,
    })),
  }))

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-8">
      <div>
        <h1 className="text-lg font-medium text-text">Browse Rules</h1>
        <p className="text-sm text-text-muted mt-1">
          All {sections.length} categories ranked by impact level.
        </p>
      </div>

      <BrowseSections sections={sectionsWithRules} />
    </div>
  )
}
