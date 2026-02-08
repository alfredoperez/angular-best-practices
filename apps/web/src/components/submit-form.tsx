'use client'

import { useState, useEffect } from 'react'
import { useRuleGeneration } from '@/hooks/use-rule-generation'
import { ruleToMarkdown, type GeneratedRule } from '@/lib/schemas'
import { signIn } from 'next-auth/react'
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

const REPO_URL = 'https://github.com/alfredoperez/angular-best-practices'

function buildIssueUrl(description: string, category: string) {
  const params = new URLSearchParams({
    template: 'rule-suggestion.yml',
    title: `[Rule]: ${description.slice(0, 80)}`,
    description,
    ...(category && { category }),
  })
  return `${REPO_URL}/issues/new?${params}`
}

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
  useEffect(() => {
    if (step !== 'generating' || isLoading) return

    if (rule && rule.filename) {
      setStep('review')
    }
  }, [step, isLoading, rule])

  // Handle auth errors from generate endpoint
  useEffect(() => {
    if (step === 'generating' && error?.message?.includes('Unauthorized')) {
      signIn('github', { callbackUrl: '/submit' })
    }
  }, [step, error])

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
      if (res.status === 401) {
        signIn('github', { callbackUrl: '/submit' })
        return
      }
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

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={!description.trim()}
              className="rounded border border-accent bg-accent/10 px-6 py-2.5 text-sm text-accent hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Rule
            </button>
            <span className="text-xs text-text-dim">or</span>
            <a
              href={buildIssueUrl(description, categoryHint)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Submit as GitHub Issue
            </a>
          </div>
        </div>
      )}

      {/* Step 2: Generating */}
      {(step === 'generating' || step === 'review') && (
        <div className="space-y-4">
          {(isLoading || (step === 'generating' && !rule && !error)) && (
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="text-sm text-text-muted">
                Generating rule with AI...
              </p>
            </div>
          )}

          {error && (
            <div className="space-y-3">
              <div className="rounded border border-impact-critical/30 bg-impact-critical/5 p-4 text-sm text-impact-critical">
                <p>{error.message}</p>
                <a
                  href={buildIssueUrl(description, categoryHint)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-accent hover:text-accent-hover transition-colors"
                >
                  Submit as GitHub Issue instead
                </a>
              </div>
              <button
                onClick={() => setStep('describe')}
                className="rounded border border-border px-6 py-2.5 text-sm text-text-muted hover:border-border-bright transition-colors"
              >
                Start Over
              </button>
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
