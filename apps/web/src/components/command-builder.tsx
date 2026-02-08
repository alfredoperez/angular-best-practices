'use client'

import { useState } from 'react'
import { skills } from '@/lib/sections-data'
import { SkillCard } from './skill-card'

export function CommandBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)

  const optionalSkills = skills.filter((s) => !s.always)

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const commands = [
    '$ npx skills add alfredoperez/angular-best-practices',
    ...optionalSkills
      .filter((s) => selected.has(s.id))
      .map(
        (s) =>
          `$ npx skills add alfredoperez/angular-best-practices --skill ${s.flag}`
      ),
  ]

  const copyCommands = async () => {
    const text = commands.map((c) => c.slice(2)).join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-sm font-medium text-text-muted mb-1">
          Install
        </h2>
        <p className="text-xs text-text-dim">
          Select the skills you need. Core rules are always included.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.filter((s) => s.always).map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            selected={true}
            onToggle={() => {}}
          />
        ))}
        {optionalSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            selected={selected.has(skill.id)}
            onToggle={() => toggle(skill.id)}
          />
        ))}
      </div>

      <div className="terminal-box relative">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs text-text-dim">Terminal</span>
          <button
            onClick={copyCommands}
            className="text-xs text-text-muted hover:text-text transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="p-4 space-y-1">
          {commands.map((cmd, i) => (
            <div key={i} className="text-sm text-text-muted">
              <span className="text-text-dim">{'$ '}</span>
              <span className="text-text">{cmd.slice(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
