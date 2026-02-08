'use client'

import { useState, useCallback } from 'react'
import { type GeneratedRule } from '@/lib/schemas'

export function useRuleGeneration() {
  const [rule, setRule] = useState<GeneratedRule | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const generate = useCallback(async (description: string, categoryHint?: string) => {
    setIsLoading(true)
    setError(null)
    setRule(null)

    try {
      const res = await fetch('/api/generate-rule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, categoryHint }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Generation failed (${res.status})`)
      }

      setRule(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    rule,
    generate,
    isLoading,
    error,
  }
}
