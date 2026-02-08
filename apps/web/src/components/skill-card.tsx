'use client'

import type { SkillDefinition } from '@/lib/sections-data'

interface SkillCardProps {
  skill: SkillDefinition
  selected: boolean
  onToggle: () => void
}

export function SkillCard({ skill, selected, onToggle }: SkillCardProps) {
  const isCore = skill.always

  return (
    <button
      onClick={isCore ? undefined : onToggle}
      disabled={isCore}
      className={`group relative flex flex-col gap-2 rounded-lg border p-4 text-left transition-all ${
        isCore
          ? 'border-border-bright bg-bg-card cursor-default'
          : selected
            ? 'border-accent bg-bg-card hover:border-accent-hover'
            : 'border-border bg-bg-card hover:border-border-bright cursor-pointer'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text">{skill.name}</span>
        {isCore ? (
          <span className="text-xs text-text-dim">always included</span>
        ) : (
          <span
            className={`flex h-4 w-4 items-center justify-center rounded border text-xs transition-colors ${
              selected
                ? 'border-accent bg-accent text-white'
                : 'border-border-bright'
            }`}
          >
            {selected && '✓'}
          </span>
        )}
      </div>
      <p className="text-xs text-text-muted">{skill.description}</p>
      <span className="text-xs text-text-dim">{skill.rules} rules</span>
    </button>
  )
}
