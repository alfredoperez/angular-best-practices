'use client'

import { useState } from 'react'
import { useRuleGeneration } from '@/hooks/use-rule-generation'
import { ruleToMarkdown, type GeneratedRule } from '@/lib/schemas'
import { RulePreview } from './rule-preview'
import { ImpactBadge } from './impact-badge'

type Step = 'describe' | 'generating' | 'review' | 'creating' | 'done'

const CATEGORY_HINTS = [
  '',
  'Performance / Optimization',
  'TypeScript',
  'Signals & Reactivity',
  'Component Patterns',
  'RxJS',
  'Change Detection',
  'SSR / Hydration',
  'Forms',
  'Architecture',
  'Testing',
  'UI / Accessibility',
  'Data Handling / HTTP',
]

export function SubmitForm() {
  const [step, setStep] = useState<Step>('describe')
  const [description, setDescription] = useState('')
  const [categoryHint, setCategoryHint] = useState('')
  const [prUrl, setPrUrl] = useState<string | null>(null)
  const [prError, setPrError] = useState<string | null>(null)
  const { rule, generate, isLoading, error } = useRuleGeneration()

  const handleGenerate = () => {
    if (!description.trim()) return
    setStep('generating')
    generate(description, categoryHint || undefined)
  }

  // Transition from generating to review when done
  if (step === 'generating' && !isLoading && rule && rule.filename) {
    setStep('review')
  }

  const handleCreatePR = async () => {
    if (!rule) return
    setStep('creating')
    setPrError(null)

    try {
      const res = await fetch('/api/create-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rule }),
      })
      const data = await res.json()
      if (data.error) {
        setPrError(data.error)
        setStep('review')
      } else {
        setPrUrl(data.url)
        setStep('done')
      }
    } catch {
      setPrError('Failed to create PR. Please try again.')
      setStep('review')
    }
  }

  const handleReset = () => {
    setStep('describe')
    setDescription('')
    setCategoryHint('')
    setPrUrl(null)
    setPrError(null)
  }

  const ruleMarkdown = rule ? ruleToMarkdown(rule as GeneratedRule) : ''

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs text-text-dim">
        <span className={step === 'describe' ? 'text-text' : ''}>
          1. Describe
        </span>
        <span>→</span>
        <span
          className={
            step === 'generating' || step === 'review' ? 'text-text' : ''
          }
        >
          2. Generate
        </span>
        <span>→</span>
        <span
          className={
            step === 'creating' || step === 'done' ? 'text-text' : ''
          }
        >
          3. Submit PR
        </span>
      </div>

      {/* Step 1: Describe */}
      {step === 'describe' && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-text-muted mb-2"
            >
              Describe your best practice
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Always use trackBy with ngFor to prevent unnecessary DOM re-renders when the list changes..."
              rows={5}
              className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-border-bright focus:outline-none resize-y"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm text-text-muted mb-2"
            >
              Category hint (optional)
            </label>
            <select
              id="category"
              value={categoryHint}
              onChange={(e) => setCategoryHint(e.target.value)}
              className="w-full rounded border border-border bg-bg-card px-4 py-2.5 text-sm text-text focus:border-border-bright focus:outline-none"
            >
              <option value="">Auto-detect</option>
              {CATEGORY_HINTS.filter(Boolean).map((hint) => (
                <option key={hint} value={hint}>
                  {hint}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!description.trim()}
            className="rounded border border-accent bg-accent/10 px-6 py-2.5 text-sm text-accent hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Rule
          </button>
        </div>
      )}

      {/* Step 2: Generating */}
      {(step === 'generating' || step === 'review') && (
        <div className="space-y-4">
          {isLoading && (
            <p className="text-sm text-text-muted animate-pulse">
              Generating rule...
            </p>
          )}

          {error && (
            <div className="rounded border border-impact-critical/30 bg-impact-critical/5 p-4 text-sm text-impact-critical">
              {error.message}
            </div>
          )}

          {rule && (
            <div className="space-y-4">
              {/* Rule metadata */}
              <div className="flex items-center gap-3 flex-wrap">
                {rule.frontmatter?.title && (
                  <span className="text-sm text-text">
                    {rule.frontmatter.title}
                  </span>
                )}
                {rule.frontmatter?.impact && (
                  <ImpactBadge impact={rule.frontmatter.impact} />
                )}
                {rule.filename && (
                  <span className="text-xs text-text-dim">
                    {rule.category}/{rule.filename}
                  </span>
                )}
              </div>

              {/* Preview */}
              {ruleMarkdown && <RulePreview content={ruleMarkdown} />}

              {/* AI reasoning */}
              {rule.reasoning && (
                <div className="rounded border border-border bg-bg-card p-4">
                  <p className="text-xs text-text-dim mb-1">AI Reasoning</p>
                  <p className="text-sm text-text-muted">{rule.reasoning}</p>
                </div>
              )}
            </div>
          )}

          {step === 'review' && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreatePR}
                className="rounded border border-accent bg-accent/10 px-6 py-2.5 text-sm text-accent hover:bg-accent/20 transition-colors"
              >
                Create Pull Request
              </button>
              <button
                onClick={() => setStep('describe')}
                className="rounded border border-border px-6 py-2.5 text-sm text-text-muted hover:border-border-bright transition-colors"
              >
                Start Over
              </button>
            </div>
          )}

          {prError && (
            <div className="rounded border border-impact-critical/30 bg-impact-critical/5 p-4 text-sm text-impact-critical">
              {prError}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Creating PR */}
      {step === 'creating' && (
        <p className="text-sm text-text-muted animate-pulse">
          Creating pull request...
        </p>
      )}

      {/* Done */}
      {step === 'done' && prUrl && (
        <div className="space-y-4">
          <div className="rounded border border-impact-low/30 bg-impact-low/5 p-4 space-y-2">
            <p className="text-sm text-impact-low">
              Pull request created successfully!
            </p>
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-accent hover:text-accent-hover transition-colors"
            >
              {prUrl}
            </a>
          </div>
          <button
            onClick={handleReset}
            className="rounded border border-border px-6 py-2.5 text-sm text-text-muted hover:border-border-bright transition-colors"
          >
            Submit Another Rule
          </button>
        </div>
      )}
    </div>
  )
}
